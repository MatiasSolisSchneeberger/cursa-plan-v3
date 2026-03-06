import { type CalendarEvent } from "../components/CalendarCard"
import { type CalendarColor } from "../components/CalendarDay"

// --- HELPERS ---

/**
 * Convierte un string "YYYY-MM-DD" a objeto Date asegurando la zona horaria local.
 * Evita el error común donde "2026-01-01" se convierte en "2025-12-31" por culpa de UTC.
 */
const parseDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number)
    return new Date(year, month - 1, day)
}

// --- MAPA DE COLORES PARA FERIADOS ---
const FERIADO_COLORS: Record<string, CalendarColor> = {
    "Feriado Inamovible": "danger",
    "Feriado Trasladable": "warning", // O warning si prefieres distinguir
    "Día No Laborable": "info",
}

// --- TRANSFORMADORES ---

export function transformarFeriados(data: any[]): CalendarEvent[] {
    return data.map((item) => ({
        id: `feriado-${item.id}`,
        title: item.nombre,
        start: parseDate(item.fecha),
        // Los feriados suelen ser de 1 día, start = end implícito, o lo explícitas:
        end: parseDate(item.fecha),
        color: FERIADO_COLORS[item.tipo?.nombre] || "primary",
        note: item.nota,
        eventType: item.tipo?.nombre || "Feriado",
    }))
}

export function transformarClases(data: any[]): CalendarEvent[] {
    return data.map((item) => {
        const periodoNombre = item.periodo?.nombre || "Periodo"
        // Ej: "1° Cuatrimestre"
        const periodoStr = item.nro_periodo ? `${item.nro_periodo}° ${periodoNombre}` : periodoNombre

        const titulo = `Cursado ${periodoStr}`

        return {
            id: `clase-${item.id}`,
            title: titulo,
            period: periodoNombre, // Change: Use general name for filtering
            start: parseDate(item.fecha_inicio),
            end: parseDate(item.fecha_fin),
            color: "info", // Color azul/neutro para clases
            note: item.nota,
            eventType: "Clases",
        }
    })
}

export function transformarExamenes(data: any[]): CalendarEvent[] {
    return data.map((item) => {
        // Ej: "Mesa Comprimida"
        const nombreMesa = item.tipo_mesa_id?.nombre || "Examen"
        const title = `Mesa N° ${item.id} - ${nombreMesa}`

        return {
            id: `examen-${item.id}`,
            title: title,
            start: parseDate(item.fecha_inicio),
            end: parseDate(item.fecha_fin),
            color: "tertiary", // Color violeta/destacado para exámenes
            note: item.is_suspencion && "Suspende clases",
            eventType: "Exámenes",
            isSuspended: item.is_suspencion,
        }
    })
}

export function transformarInscripciones(data: any[]): CalendarEvent[] {
    return data.map((item) => {
        const periodoNombre = item.periodo?.nombre || "Periodo"
        // Ej: "1° Cuatrimestre"
        const periodoStr = item.nro_periodo ? `${item.nro_periodo}° ${periodoNombre}` : periodoNombre

        const titulo = `Inscripción ${periodoStr}`

        return {
            id: `insc-${item.id}`,
            title: titulo,
            period: periodoNombre, // Change: Use general name for filtering
            start: parseDate(item.fecha_inicio),
            end: parseDate(item.fecha_fin),
            color: "success", // Verde para inscripciones (acción positiva)
            note: item.nota,
            eventType: "Inscripciones",
        }
    })
}
