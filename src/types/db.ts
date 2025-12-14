// src/types/db.ts

export type CarreraData = {
    id: string
    nombre: string
    slug: string
    emojie: string
}

export type PlanEstudioData = {
    id: string
    carrera_id: string
    anio_inicio: number
    anio_fin: number
}

export type CorrelativaRow = {
    id: number
    tipo_requisito: "cursar" | "rendir"
    condicion: "regular" | "aprobado"
    porcentaje: number | null
    notas: string | null
    // Traemos el objeto de la materia requisito para saber su nombre
    requisito_materia: {
        nombre: string
        slug: string
    } | null
}

export type MateriaPlanRow = {
    id: number // ID único de materia_plan (ej: 248)
    anio: number
    nro_periodo: number | null
    orientacion_id: number | null
    nro_optativa: number | null

    // Datos de la materia actual
    materias: {
        id: number
        nombre: string
        slug: string
    }
    periodo: { id: number; periodo: string } | null
    orientaciones: OrientacionData | null

    // Lista de correlativas asociadas a ESTE id de materia_plan
    correlativas: CorrelativaRow[]
}

export type OrientacionData = {
    id: number
    nombre: string
    slug: string
}