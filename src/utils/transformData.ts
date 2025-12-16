// Interfaces para los datos de entrada (GraphQL)
export interface GraphQLCarreraResponse {
    carrerasCollection: {
        edges: {
            node: {
                id: number
                nombre: string
                slug: string
                emojie: string
                planes: {
                    edges: {
                        node: {
                            id: number
                            anio_inicio: number
                            anio_fin: number
                            materias_plan: {
                                edges: {
                                    node: {
                                        id: number
                                        anio: number
                                        nro_periodo: number
                                        nro_optativa: number
                                        orientacion: {
                                            id: number
                                            nombre: string
                                        } | null
                                        periodo: {
                                            id: number
                                            nombre: string
                                        } | null
                                        detalle: {
                                            id: number
                                            nombre: string
                                            slug: string
                                        }
                                        correlativas: {
                                            edges: {
                                                node: {
                                                    tipo: string
                                                    condicion: string
                                                    porcentaje: number | null
                                                    notas: string | null
                                                    requisito: {
                                                        nombre: string
                                                        slug: string
                                                    } | null
                                                }
                                            }[]
                                        }
                                    }
                                }[]
                            }
                        }
                    }[]
                }
            }
        }[]
    }
}

export interface SalidaMateria {
    id: number
    nombre: string
    slug: string
    creditos?: number
    correlativas: {
        tipo: string
        condicion: string
        requisito?: string // Nombre de la materia (opcional)
        porcentaje?: number | null // Nuevo campo
        notas?: string | null // Nuevo campo
    }[]
}

export interface SalidaPeriodo {
    id: number | undefined
    nroPeriodo: number
    tipoPeriodo: string
    materias: SalidaMateria[]
}

export interface SalidaAnio {
    anio: number
    periodos: SalidaPeriodo[]
}

export interface SalidaOrientacion {
    id: number | string
    nombre: string
    slug: string // <--- NUEVO
    anios: SalidaAnio[]
}

export interface SalidaPlan {
    id: number
    anioInicio: number
    anioFin: number
    orientaciones: SalidaOrientacion[]
}

export interface SalidaCarrera {
    carrera: string
    id: number
    emoji: string
    planes: SalidaPlan[]
}

export function transformarCarreraSQL(dataSQL: any): SalidaCarrera | null {
    if (!dataSQL) return null

    // SQL devuelve un objeto directo, no "carrerasCollection.edges..."
    const carrera = dataSQL

    return {
        carrera: carrera.nombre,
        id: carrera.id,
        emoji: carrera.emojie,
        // SQL devuelve arrays directos
        planes: (carrera.planes || []).map((plan: any) => {

            // 1. Obtener materias (ya viene como array plano)
            const todasLasMaterias = plan.materias_plan || []

            // 2. Identificar orientaciones
            const orientacionesMap = new Map()
            todasLasMaterias.forEach((m: any) => {
                if (m.orientacion) {
                    orientacionesMap.set(m.orientacion.id, {
                        id: m.orientacion.id,
                        nombre: m.orientacion.nombre,
                        slug: m.orientacion.slug
                    })
                }
            })

            let gruposDeMaterias = []

            // 3. Estrategia de Agrupación
            if (orientacionesMap.size === 0) {
                // CASO A: Plan único
                gruposDeMaterias.push({
                    id: "unico",
                    nombre: "Plan Completo",
                    slug: "plan-completo",
                    materias: todasLasMaterias
                })
            } else {
                // CASO B: Con Orientaciones
                gruposDeMaterias = Array.from(orientacionesMap.values()).map((ori: any) => {
                    const materiasMix = todasLasMaterias.filter((m: any) =>
                        m.orientacion?.id === ori.id || !m.orientacion // Incluimos tronco común
                    )
                    return { ...ori, materias: materiasMix }
                })

                // Tronco común puro (opcional)
                const soloComunes = todasLasMaterias.filter((m: any) => !m.orientacion)
                if (soloComunes.length > 0) {
                    gruposDeMaterias.push({
                        id: "tronco-comun",
                        nombre: "Tronco Común",
                        slug: "tronco-comun",
                        materias: soloComunes
                    })
                }
            }

            // 4. Procesar grupos (Año -> Periodo)
            const orientacionesProcesadas = gruposDeMaterias.map((grupo: any) => {
                const materiasPorAnio: Record<number, any[]> = {}
                grupo.materias.forEach((m: any) => {
                    const anio = m.anio || 0
                    if (!materiasPorAnio[anio]) materiasPorAnio[anio] = []
                    materiasPorAnio[anio].push(m)
                })

                const anios = Object.keys(materiasPorAnio).map((anioKey) => {
                    const anioNum = Number(anioKey)
                    const materiasDelAnio = materiasPorAnio[anioNum]
                    const materiasPorPeriodo: Record<string, any> = {}

                    materiasDelAnio.forEach((m: any) => {
                        // OJO: En SQL a veces el join devuelve el objeto directo
                        const periodoId = m.periodo?.id
                        const periodoNombre = m.periodo?.periodo || "Anual" // Nota: en tu DB la columna se llama 'periodo'
                        const nroPeriodo = m.nro_periodo || 0

                        const pKey = `${periodoId}-${nroPeriodo}-${periodoNombre}`

                        if (!materiasPorPeriodo[pKey]) {
                            materiasPorPeriodo[pKey] = {
                                id: periodoId,
                                nroPeriodo: nroPeriodo,
                                tipoPeriodo: periodoNombre,
                                materias: [],
                            }
                        }

                        materiasPorPeriodo[pKey].materias.push({
                            id: m.id,
                            nombre: m.detalle?.nombre || "Sin Nombre",
                            slug: m.detalle?.slug || "",
                            creditos: 0,
                            // SQL devuelve array directo en correlativas
                            correlativas: (m.correlativas || []).map((c: any) => ({
                                tipo: c.tipo_requisito,
                                condicion: c.condicion,
                                requisito: c.requisito?.nombre,
                                porcentaje: c.porcentaje,
                                notas: c.notas
                            }))
                        })
                    })

                    const periodosOrdenados = Object.values(materiasPorPeriodo).sort((a: any, b: any) => {
                        const getPeso = (p: any) => {
                            const nombre = p.tipoPeriodo.toLowerCase()
                            if (nombre.includes("extracurricular")) return 100
                            if (nombre.includes("anual")) return 50
                            return p.nroPeriodo || 0
                        }
                        return getPeso(a) - getPeso(b)
                    })

                    return {
                        anio: anioNum,
                        periodos: periodosOrdenados,
                    }
                })

                return {
                    id: grupo.id,
                    nombre: grupo.nombre,
                    slug: grupo.slug,
                    anios: anios.sort((a, b) => a.anio - b.anio),
                }
            })

            const orientacionesOrdenadas = orientacionesProcesadas.sort((a, b) => {
                if (a.id === "tronco-comun") return -1
                if (b.id === "tronco-comun") return 1
                return a.nombre.localeCompare(b.nombre)
            })

            return {
                id: planNode.id,
                anioInicio: planNode.anio_inicio,
                anioFin: planNode.anio_fin,
                orientaciones: orientacionesOrdenadas,
            }
        }),
    }
}