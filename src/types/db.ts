export type MateriaData = {
    id: number
    nombre: string
    slug: string
}

export type PeriodoData = {
    id: number
    periodo: string
}

export type OrientacionData = {
    id: number
    nombre: string
    slug: string
}

// Esta es la "Row" principal que viene de la tabla intermedia materia_plan
export type MateriaPlanRow = {
    id: number
    anio: number
    nro_periodo: number
    tipo: string // opcional, si tienes cuatrimestral/anual
    nro_optativa: number | null
    orientacion_id: number | null
    // Los joins:
    materias: MateriaData
    periodo: PeriodoData
    orientaciones: OrientacionData | null
}