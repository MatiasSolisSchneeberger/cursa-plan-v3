import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { useAuth } from "@/context/AuthContextData";
import { SimuladorContext } from "@/context/SimuladorContextData";

import type { EstadoMateria, Avance } from "@/types/materiaTypes";

export function SimuladorProvider({ children }: { children: React.ReactNode }) {
	const { session } = useAuth();
	const [avances, setAvances] = useState<Avance[]>([]);
	const [loading, setLoading] = useState(true);

	// 1. Cargar todos los avances al inicio (O cuando cambia la sesión)
	useEffect(() => {
		// Definimos la función ADENTRO del efecto para evitar errores de declaración
		const cargarAvances = async () => {
			if (!session) {
				setAvances([]);
				setLoading(false);
				return;
			}

			try {
				const { data, error } = await supabase
					.from("avances")
					.select(
						`
                        materia_plan_id, 
                        estado,
                        plan:materia_plan!inner (
                            materia_id
                        )
                    `,
					)
					.eq("user_id", session.user.id);

				if (error) throw error;

				if (data) {
					// Aplanamos el resultado para guardarlo fácil
					const avancesFormateados = data.map((a: any) => ({
						materia_plan_id: a.materia_plan_id,
						estado: a.estado,
						materia_id: a.plan?.materia_id, // Guardamos el ID genérico
					}));
					setAvances(avancesFormateados);
				}
			} catch (error) {
				console.error("Error cargando avances:", error);
			} finally {
				setLoading(false);
			}
		};

		cargarAvances();
	}, [session]); // Se ejecuta cada vez que cambia 'session'

	// 2. Función para guardar (Upsert)
	const actualizarAvance = async (
		materiaId: number,
		nuevoEstado: EstadoMateria,
	) => {
		if (!session) return;

		// Actualizamos optimísticamente el UI (para que se sienta instantáneo)
		setAvances((prev) => {
			const existe = prev.find((a) => a.materia_plan_id === materiaId);
			if (existe) {
				return prev.map((a) =>
					a.materia_plan_id === materiaId
						? { ...a, estado: nuevoEstado }
						: a,
				);
			}
			// Nota: Al crear uno nuevo optimista, no tenemos el materia_id genérico instantáneo
			// pero al recargar la página se corregirá. Para el uso normal está bien.
			return [
				...prev,
				{
					materia_plan_id: materiaId,
					estado: nuevoEstado,
					materia_id: 0,
				},
			];
		});

		// Guardamos en BD
		const { error } = await supabase.from("avances").upsert(
			{
				user_id: session.user.id,
				materia_plan_id: materiaId,
				estado: nuevoEstado,
				updated_at: new Date().toISOString(),
			},
			{ onConflict: "user_id, materia_plan_id" },
		);

		if (error) console.error("Error guardando avance:", error);
	};

	const getEstado = (materiaId: number) => {
		const avance = avances.find(
			(a) =>
				a.materia_plan_id === materiaId || // Coincidencia exacta (Plan)
				a.materia_id === materiaId, // Coincidencia genérica (Requisito)
		);
		return avance?.estado;
	};

	return (
		<SimuladorContext.Provider
			value={{ avances, loading, actualizarAvance, getEstado }}
		>
			{children}
		</SimuladorContext.Provider>
	);
}
