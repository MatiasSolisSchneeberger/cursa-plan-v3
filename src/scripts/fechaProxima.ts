// Definimos los tipos para la entrada de datos (según lo que devuelve Supabase)
type FechaObjeto = { fecha: string }

/**
 * Convierte un string "YYYY-MM-DD" a un objeto Date local (00:00hs)
 * para evitar problemas de zonas horarias (UTC vs Local).
 */
const parseLocal = (dateStr: string): Date => {
    const [y, m, d] = dateStr.split("-").map(Number)
    return new Date(y, m - 1, d)
}

/**
 * Verifica si un día es "hábil" (No es finde ni feriado)
 */
const esDiaHabil = (fecha: Date, listaFeriadosStrings: string[]): boolean => {
    const diaSemana = fecha.getDay() // 0 = Domingo, 6 = Sábado

    // 1. Descartar fin de semana
    if (diaSemana === 0 || diaSemana === 6) return false

    // 2. Descartar feriados
    // Convertimos la fecha actual a string YYYY-MM-DD para comparar
    const fechaIso = fecha.toLocaleDateString("en-CA") // Formato YYYY-MM-DD local
    if (listaFeriadosStrings.includes(fechaIso)) return false

    return true
}

export function fechaProxima(
    fechasExamenes: FechaObjeto[] | null,
    feriados: FechaObjeto[] | null,
    fechaReferencia: string | Date = new Date() // Por defecto es HOY
) {
    if (!fechasExamenes || fechasExamenes.length === 0) {
        return { proxima: null, isUrgent: false }
    }

    // 1. Normalizar fecha de referencia (Hoy)
    const hoy = typeof fechaReferencia === "string"
        ? parseLocal(fechaReferencia)
        : new Date(fechaReferencia.getFullYear(), fechaReferencia.getMonth(), fechaReferencia.getDate())

    // 2. Preparar lista de feriados (Set para búsqueda rápida)
    // Asumimos que los feriados vienen en formato YYYY-MM-DD
    const setFeriados = new Set(feriados?.map(f => f.fecha) || [])
    const feriadosArray = Array.from(setFeriados) // Para usar en nuestra helper si hiciera falta

    // 3. Encontrar la próxima fecha válida
    // Convertimos a objetos Date, filtramos las pasadas y ordenamos
    const fechasFuturas = fechasExamenes
        .map(f => parseLocal(f.fecha))
        .filter(date => date >= hoy) // Solo fechas futuras o de hoy
        .sort((a, b) => a.getTime() - b.getTime())

    const proxima = fechasFuturas[0] || null

    if (!proxima) {
        return { proxima: null, isUrgent: false }
    }

    // 4. Calcular urgencia (Días hábiles restantes)
    // Contamos cuántos días hábiles hay desde mañana hasta el día del examen (inclusive)
    let diasHabilesRestantes = 0

    // Clonamos la fecha para iterar sin modificar 'hoy'
    const cursor = new Date(hoy)

    // Avanzamos al día siguiente para empezar a contar "cuánto falta"
    // (Si el examen es hoy, el bucle no corre y faltan 0 días -> Urgente)
    cursor.setDate(cursor.getDate() + 1)

    // Bucle: Mientras el cursor sea menor o igual a la fecha del examen
    while (cursor <= proxima) {
        if (esDiaHabil(cursor, feriadosArray)) {
            diasHabilesRestantes++
        }

        // Si ya pasamos de 3 días, cortamos para optimizar (ya no es urgente)
        if (diasHabilesRestantes > 3) break

        cursor.setDate(cursor.getDate() + 1)
    }

    // Es urgente si faltan 3 o menos días hábiles
    const isUrgent = diasHabilesRestantes <= 3

    return { proxima, isUrgent }
}