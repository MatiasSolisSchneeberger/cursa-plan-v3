import { TypographyH2 } from "@/components/ui/Typography";
import CardCarrera from "../components/CardCarrera";
import { useCarreras, type CarreraType } from "../hooks/useCarreras";
import Cargando from "./Cargando";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function listadoCarreras({
	carreras,
	filtro,
}: {
	carreras: CarreraType[];
	filtro: string;
}) {
	if (filtro === "todos") {
		return carreras.map(({ id, nombre, slug, icon, planes }) => {
			const formattedPlanes =
				planes
					?.map((p) => ({
						anio: p.anio_inicio,
						hasMaterias:
							p.materia_plan && p.materia_plan.length > 0,
					}))
					.sort((a, b) => b.anio - a.anio) || [];

			return (
				<CardCarrera
					key={id}
					icon={icon}
					slug={slug}
					carrera={nombre}
					planes={formattedPlanes}
				/>
			);
		});
	} else {
		return carreras
			.filter((c) => c.slug.includes(filtro))
			.map(({ id, nombre, slug, icon, planes }) => {
				const formattedPlanes =
					planes
						?.map((p) => ({
							anio: p.anio_inicio,
							hasMaterias:
								p.materia_plan && p.materia_plan.length > 0,
						}))
						.sort((a, b) => b.anio - a.anio) || [];

				return (
					<CardCarrera
						key={id}
						icon={icon}
						slug={slug}
						carrera={nombre}
						planes={formattedPlanes}
					/>
				);
			});
	}
}

export default function ListadoCarreras() {
	const { carreras, loading } = useCarreras();

	const filtros = [
		{
			filtro: "todos",
			label: "Ver todos",
		},
		{
			filtro: "ingenieria",
			label: "Ingenierías",
		},
		{
			filtro: "licenciatura",
			label: "Licenciaturas",
		},
		{
			filtro: "profesorado",
			label: "Profesorados",
		},
	];

	return (
		<section className="relative flex w-full shrink-0 flex-col flex-wrap content-start items-center justify-center gap-6 self-stretch">
			<TypographyH2>Carreras</TypographyH2>

			<Tabs defaultValue="todos" className="w-full">
				<TabsList>
					{filtros.map(({ filtro, label }) => {
						return (
							<TabsTrigger value={filtro}>{label}</TabsTrigger>
						);
					})}
				</TabsList>
				{filtros.map(({ filtro }) => {
					return (
						<TabsContent
							key={filtro}
							value={filtro}
							className="relative grid w-full shrink-0 grid-cols-1 flex-wrap content-start items-start justify-start gap-6 self-stretch md:grid-cols-2 lg:grid-cols-3"
						>
							{loading ? (
								<Cargando className="col-span-full" />
							) : (
								listadoCarreras({ carreras, filtro })
							)}
						</TabsContent>
					);
				})}
			</Tabs>
		</section>
	);
}
