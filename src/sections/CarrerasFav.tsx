import CardCarrera from "../components/CardCarrera";
import Cargando from "./Cargando";
import { TypographyH2, TypographyP } from "@/components/ui/Typography";
import { useCarrerasFav } from "../hooks/useCarrerasFav";

export default function CarrerasFav() {
	const { carrerasFav, loading: isLoading } = useCarrerasFav();

	return (
		<section className="relative flex w-full shrink-0 flex-col flex-wrap content-center items-center justify-center gap-6 self-stretch">
			<TypographyH2>Tus carreras favoritas</TypographyH2>
			{isLoading ? (
				<Cargando className="h-16" />
			) : carrerasFav.length === 0 ? (
				<TypographyP>
					No tienes carreras favoritas. Prueba agregando una entrando
					a una carrera y si tiene planes de estudio, seleccionando el
					plan de estudio que quieras.
				</TypographyP>
			) : (
				<ul className="relative grid w-full shrink-0 grid-cols-1 flex-wrap content-start items-start justify-start gap-6 self-stretch md:grid-cols-2 lg:grid-cols-3">
					{carrerasFav.map((carreraFav) => {
						const { plan } = carreraFav;
						const { carrera } = plan;

						return (
							<CardCarrera
								key={carreraFav.id}
								icon={carrera.icon}
								slug={carrera.slug}
								carrera={carrera.nombre}
								planes={[
									{ anio: plan.anio_inicio, isLiked: true },
								]}
							/>
						);
					})}
				</ul>
			)}
		</section>
	);
}
