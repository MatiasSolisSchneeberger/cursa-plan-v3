import type { Requisito, Condicion, GrupoCorrelativa } from "@/types/db"
import type { CorrelativaRaw } from "@/scripts/transformData"

export type { Requisito, Condicion, GrupoCorrelativa }

export type EstadoMateria = "Sin cursar" | "Cursando" | "Regular" | "Aprobado" | "Libre"

export interface Avance {
    materia_plan_id: number
    materia_id: number
    estado: EstadoMateria
}

export interface FechaExamen {
    fecha: string
}

export interface MateriaData {
    nombre: string
    slug: string
    fechas_examenes: FechaExamen[] | FechaExamen
}

export interface Carrera {
    slug: string
    nombre: string
}

export interface PlanEstudio {
    anio_inicio: number
    carreras: Carrera
}

export interface MateriaDetalle {
    id: number
    materias: MateriaData
    plan_estudio: PlanEstudio
    correlativas?: CorrelativaRaw[]
}
