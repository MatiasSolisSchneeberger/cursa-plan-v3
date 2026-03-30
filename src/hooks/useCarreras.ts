// --- Importaciones ---
import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

// --- Interfaz ---
export interface CarreraType {
    id: number;
    nombre: string;
    slug: string;
    icon: string;
    planes?: { anio_inicio: number; materia_plan?: { id: number }[] }[];
}

// --- Función ---
/**
 * Hook para obtener las carreras
 */
export function useCarreras() {

    const { data: carreras = [], isLoading: loading, error } = useQuery<CarreraType[], Error>({
        queryKey: ["carreras"],

        queryFn: async () => {
            const { data, error } = await supabase
                .from("carreras")
                .select(`
                        id,
                        nombre,
                        slug,
                        icon,
                        planes:plan_estudio(
                            anio_inicio,
                            materia_plan(
                                id
                            )
                        )
                    `)
                .order("slug", { ascending: true })
                .order("nombre", { ascending: true });

            if (error) {
                console.error("Error al buscar carreras:", error);
                throw new Error(error.message);
            }
            return data || [];
        },
    });

    return {
        carreras,
        loading,
        error: error ? error.message : null
    };
}
