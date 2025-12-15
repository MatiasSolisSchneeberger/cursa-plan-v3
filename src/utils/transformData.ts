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
        requisito?: string
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

export function transformarCarrera(dataGraphQL: any): SalidaCarrera | null {
    const carreraNode = dataGraphQL?.carrerasCollection?.edges[0]?.node
    if (!carreraNode) return null

    return {
        carrera: carreraNode.nombre,
        id: carreraNode.id,
        emoji: carreraNode.emojie,
        planes: carreraNode.planes.edges.map((p: any) => {
            const planNode = p.node

            // 1. Agrupar materias por ID de Orientación
            const materiasPorOrientacion: Record<string, any> = {}

            planNode.materias_plan.edges.forEach((m: any) => {
                const mat = m.node

                // Lógica robusta para Tronco Común vs Orientación
                const orId = mat.orientacion?.id || "sin-orientaciones"
                const orNombre = mat.orientacion?.nombre || "Tronco Común"
                const orSlug = mat.orientacion?.slug || "sin-orientaciones" // Slug seguro

                if (!materiasPorOrientacion[orId]) {
                    materiasPorOrientacion[orId] = {
                        id: orId,
                        nombre: orNombre,
                        slug: orSlug,
                        materias: [],
                    }
                }
                materiasPorOrientacion[orId].materias.push(mat)
            })

            // 2. Procesar cada Orientación
            const orientaciones = Object.values(materiasPorOrientacion).map((orData: any) => {
                // Agrupar por Año
                const materiasPorAnio: Record<number, any[]> = {}
                orData.materias.forEach((m: any) => {
                    const anio = m.anio || 0
                    if (!materiasPorAnio[anio]) materiasPorAnio[anio] = []
                    materiasPorAnio[anio].push(m)
                })

                const anios = Object.keys(materiasPorAnio).map((anioKey) => {
                    const anioNum = Number(anioKey)
                    const materiasDelAnio = materiasPorAnio[anioNum]

                    // Agrupar por Periodo
                    const materiasPorPeriodo: Record<string, any> = {}

                    materiasDelAnio.forEach((m: any) => {
                        const periodoId = m.periodo?.id
                        const periodoNombre = m.periodo?.nombre || "Anual"
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
                            correlativas: m.correlativas?.edges.map((c: any) => ({
                                tipo: c.node.tipo,
                                condicion: c.node.condicion,
                                requisito: c.node.requisito?.nombre,
                            })) || [],
                        })
                    })

                    // Ordenar Periodos
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
                    id: orData.id,
                    nombre: orData.nombre,
                    slug: orData.slug, // Incluimos el slug
                    anios: anios.sort((a, b) => a.anio - b.anio),
                }
            })

            // Ordenamos: Tronco Común primero, luego alfabéticamente
            const orientacionesOrdenadas = orientaciones.sort((a, b) => {
                if (a.id === "sin-orientaciones") return -1
                if (b.id === "sin-orientaciones") return 1
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