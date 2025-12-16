// 1. Lo que viene de Supabase (Refleja tus tablas SQL)
export interface DBResponse {
    id: number;
    nombre: string;
    slug: string;
    planes: {
        id: number;
        anio_inicio: number;
        anio_fin: number;
        materias_plan: {
            anio: number;
            nro_periodo: number;
            periodo: { periodo: string };
            orientacion: { id: number; nombre: string } | null;
            materia: { id: number; nombre: string; slug: string; creditos: number }; // Asumo creditos en materias
            correlativas: {
                tipo_requisito: string;
                condicion: string;
                porcentaje: number;
                nota: string;
                requisito_materia: { nombre: string; slug: string } | null;
            }[];
        }[];
    }[];
}

// 2. Tu JSON Objetivo (El que subiste en ejemploDB.json)
export interface CarreraJSON {
    carrera: string;
    id: number;
    planes: {
        id: number;
        anioInicio: number;
        anioFin: number;
        // Agregamos esto para facilitar crear los botones de filtro
        listaOrientaciones: { nombre: string; slug: string; id: number }[];
        anios: {
            anio: number;
            periodos: {
                id: number;
                nroPeriodo: number;
                tipoPeriodo: string;
                materias: {
                    id: number;
                    nombre: string;
                    slug: string;
                    creditos: number;
                    // Ahora la materia sabe de quién es. Si es null, es Troncal/Común.
                    orientacion: { nombre: string; slug: string } | null;
                    correlativas: any[];
                }[];
            }[];
        }[];
    }[];
}