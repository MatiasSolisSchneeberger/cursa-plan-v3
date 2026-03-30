import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";
import { useAuth } from "../context/AuthContextData";
import type { CarrerasFav } from "../types/carrerasFav";

export function useCarrerasFav() {
    const { session, loading: loadingAuth } = useAuth();

    const { data: carrerasFav = [], isLoading, refetch } = useQuery<CarrerasFav[]>({
        queryKey: ["carrerasFav", session?.user?.id],
        queryFn: async () => {
            if (!session) return [];

            const { data, error } = await supabase
                .from("carreras_fav")
                .select(
                    `
                    id,
                    plan:plan_estudio(
                        anio_inicio,
                        carrera:carreras(
                            nombre,
                            slug,
                            icon
                        )
                    )
                `
                )
                .eq("user_id", session.user.id);

            if (error) {
                console.error("Error fetching favorite careers:", error);
                throw error;
            }

            if (data) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return data.map((item: any) => ({
                    id: item.id,
                    plan: {
                        anio_inicio: Array.isArray(item.plan)
                            ? item.plan[0].anio_inicio
                            : item.plan.anio_inicio,
                        carrera: Array.isArray(item.plan)
                            ? Array.isArray(item.plan[0].carrera)
                                ? item.plan[0].carrera[0]
                                : item.plan[0].carrera
                            : Array.isArray(item.plan.carrera)
                                ? item.plan.carrera[0]
                                : item.plan.carrera,
                    },
                }));
            }
            return [];
        },
        enabled: !loadingAuth && !!session,
    });

    return {
        carrerasFav,
        loading: loadingAuth || isLoading,
        refetch
    };
}
