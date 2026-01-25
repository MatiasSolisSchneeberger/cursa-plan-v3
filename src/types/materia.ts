export type EstadoMateria = "Sin cursar" | "Cursando" | "Regular" | "Aprobado" | "Libre"

export interface Avance {
    materia_plan_id: number
    estado: EstadoMateria
}
