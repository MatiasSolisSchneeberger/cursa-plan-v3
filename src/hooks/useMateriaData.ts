import { useState, useEffect } from "react"
import supabase from "../utils/supabase"
import { formatearCorrelativas } from "../scripts/transformData"
import { fechaProxima } from "../scripts/fechaProxima"
import type { MateriaDetalle, GrupoCorrelativa } from "../types/materiaTypes"

interface NextExamResult {
    proxima: Date | null
    isUrgent: boolean
}

interface UseMateriaDataResult {
    materia: MateriaDetalle | null
    loading: boolean
    error: unknown
    nextExam: NextExamResult | null
    correlativasFormat: GrupoCorrelativa[]
}

export const useMateriaData = (
    materiaSlug?: string,
    planSlug?: string,
    carreraSlug?: string
): UseMateriaDataResult => {
    const [loading, setLoading] = useState(true)
    const [materia, setMateria] = useState<MateriaDetalle | null>(null)
    const [error, setError] = useState<unknown>(null)
    const [nextExam, setNextExam] = useState<NextExamResult | null>(null)
    const [correlativasFormat, setCorrelativasFormat] = useState<GrupoCorrelativa[]>([])

    useEffect(() => {
        const fetchMateria = async () => {
            if (!materiaSlug || !planSlug || !carreraSlug) {
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)

            try {
                const { data, error: dbError } = await supabase
                    .from("materia_plan")
                    .select(
                        `
						id,
						materias!inner(nombre, slug, fechas_examenes(fecha)),
						plan_estudio!inner(
							anio_inicio,
							carreras!inner(slug, nombre)
						),
						correlativas:correlativas!materia_id (
                            tipo_requisito,
                            condicion,
                            porcentaje,
                            notas,
                            requisito_plan:materia_plan!requisito (
                                id,
                                materia:materias ( nombre, slug )
                            )
                        )
					`
                    )
                    .eq("materias.slug", materiaSlug)
                    .eq("plan_estudio.anio_inicio", planSlug)
                    .eq("plan_estudio.carreras.slug", carreraSlug)
                    .maybeSingle()

                const { data: feriados } = await supabase.from("feriados").select("fecha")

                if (dbError) {
                    console.error("Error fetching materia:", dbError)
                    setError(dbError)
                }

                if (data) {
                    // Casteamos data a MateriaDetalle because TypeScript might complain about 'correlativas' or deep inner types
                    // However, the structure matches our Interface roughly.
                    // We might need to map 'correlativas' manually if it's JSON in DB but typed as object in JS
                    setMateria(data as unknown as MateriaDetalle)

                    // Formatear correlativas
                    // data.correlativas is what comes from DB. Type might be any or specific via generated types.
                    // transformData expects CorrelativaRaw[]
                    const correlativasRaw = (data as any).correlativas || []
                    const correlativasFormatted = formatearCorrelativas(correlativasRaw)
                    // Cast result to GrupoCorrelativa[] as transformData returns any[]
                    setCorrelativasFormat(correlativasFormatted as unknown as GrupoCorrelativa[])

                    // Calcular próxima fecha
                    const fechas = (data as any).materias?.fechas_examenes || []
                    const fechasArray = Array.isArray(fechas) ? fechas : [fechas]
                    setNextExam(fechaProxima(fechasArray, feriados || []))
                }
            } catch (err) {
                console.error("Unexpected error:", err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMateria()
    }, [materiaSlug, planSlug, carreraSlug])

    return { materia, loading, error, nextExam, correlativasFormat }
}
