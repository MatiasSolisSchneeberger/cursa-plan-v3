// src/hooks/usePlanData.ts
import { useState, useEffect } from "react"
import supabase from "../utils/supabase"
import type { MateriaPlanRow } from "../types/db"

export function usePlanData(planId: string) {
    const [materias, setMaterias] = useState<MateriaPlanRow[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!planId) return

        const fetchData = async () => {
            setLoading(true)

            const { data, error } = await supabase
                .from("materia_plan")
                .select(`
          id, 
          anio, 
          nro_periodo, 
          orientacion_id, 
          nro_optativa,
          
          materias ( id, nombre, slug ),       
          periodo ( id, periodo ),
          orientaciones ( id, nombre, slug ),
          
          correlativas:correlativas!correlativas_materia_fkey (
            id, 
            tipo_requisito, 
            condicion,
            porcentaje,
            notas,
            
            requisito_materia:materias!correlativas_requisito_fkey ( nombre, slug )
          )
        `)
                .eq("plan_id", planId)
                .order("anio", { ascending: true })
                .order("periodo_id", { ascending: true })
                .order("nro_periodo", { ascending: true })

            if (error) {
                console.error("Error cargando materias:", error)
            } else {
                setMaterias(data as unknown as MateriaPlanRow[])
            }

            setLoading(false)
        }

        fetchData()
    }, [planId])

    return { materias, loading }
}