import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { useAuth } from "@/context/AuthContextData";
import CardCarrera, { CardCarreraSkeleton } from "@/components/CardCarrera";
import type { CarrerasFav } from "@/types/carrerasFav";

export default function CarrerasFav() {
	const [loading, setLoading] = useState(true);
	const [carrerasFav, setCarrerasFav] = useState<CarrerasFav[]>([]);
	const { session, loading: loadingAuth } = useAuth();

	useEffect(() => {
		if (loadingAuth) return;

		if (session) {
			fetchCarrerasFav();
		} else {
			setLoading(false);
		}
	}, [session, loadingAuth]);

	const fetchCarrerasFav = async () => {
		try {
			if (!session) return;

			const { data: carrerasFav, error } = await supabase
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
                `,
				)
				.eq("user_id", session.user.id);

			if (!error && carrerasFav) {
				// Transformar los datos para que coincidan con la interfaz CarrerasFav
				const formattedData: CarrerasFav[] = carrerasFav.map(
					(item: any) => ({
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
					}),
				);
				setCarrerasFav(formattedData);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const isLoading = loading || loadingAuth;

	return (
		<section className="relative flex w-full shrink-0 flex-col flex-wrap content-center items-center justify-center gap-6 self-stretch">
			<h2 className="texto-headline text-text-800 dark:text-text-200 text-center">
				Tus carreras favoritas
			</h2>
			{isLoading ? (
				<CardCarreraSkeleton />
			) : carrerasFav.length === 0 ? (
				<span className="text-text-700 dark:text-text-300 texto-label">
					No tienes carreras favoritas. Prueba agregando una entrando
					a una carrera y si tiene planes de estudio, seleccionando el
					plan de estudio que quieras.
				</span>
			) : (
				<ul className="relative grid w-full shrink-0 grid-cols-1 flex-wrap content-start items-start justify-start gap-6 self-stretch md:grid-cols-2 lg:grid-cols-3">
					{carrerasFav.map((carreraFav: any) => {
						const { plan } = carreraFav;
						const { carrera } = plan;

						const nombreCompuesto = `${carrera.nombre} | ${plan.anio_inicio}`;
						return (
							<CardCarrera
								key={carreraFav.id}
								icon={carrera.icon}
								slug={carrera.slug}
								// Pasamos el nombre compuesto
								carrera={nombreCompuesto}
								// Opcional: Si CardCarrera acepta prop extra para el link exacto
								link={`/carreras/${carrera.slug}?plan=${plan.anio_inicio}`}
							/>
						);
					})}
				</ul>
			)}
		</section>
	);
}
