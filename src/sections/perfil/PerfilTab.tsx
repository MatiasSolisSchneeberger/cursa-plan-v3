import { useEffect, useState } from "react";
import Card from "../../components/Card";
import CardBody from "../../components/CardBody";
import CardHeader from "../../components/CardHeader";
import MenuItem from "../../components/MenuItem";
import { useAuth } from "../../context/AuthContextData";
import { IconMail, IconCalendar, IconChevronRight } from "@tabler/icons-react";
import supabase from "../../utils/supabase";
import IconCarrera from "../../components/IconCarrera";
import { useCarrerasFav } from "../../hooks/useCarrerasFav";

export const PerfilTab = () => {
	const { session, loading: loadingAuth } = useAuth();

	const { carrerasFav } = useCarrerasFav();
	const [materiasCursando, setMateriasCursando] = useState<any[]>([]);

	useEffect(() => {
		if (loadingAuth) return;

		const fetchData = async () => {
			try {
				if (!session) return;

				// Fetch Materias Cursando
				const { data: cursandoData } = await supabase
					.from("avances")
					.select(
						`
						id,
						updated_at,
						materia_plan:materia_plan_id (
							materia:materias (
								nombre,
								slug
							),
							plan:plan_estudio (
								anio_inicio,
								carrera:carreras (
									nombre,
									slug
								)
							)
						)
					`,
					)
					.eq("user_id", session.user.id)
					.eq("estado", "Cursando");

				if (cursandoData) {
					setMateriasCursando(cursandoData);
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (session) {
			fetchData();
		}
	}, [session, loadingAuth]);

	// Formatear fecha de creación
	const createdAt = session?.user?.created_at
		? new Date(session.user.created_at).toLocaleDateString()
		: "N/A";

	return (
		<section className="grid grid-cols-4 gap-3 lg:grid-cols-12">
			<Card className="col-span-4">
				<CardHeader color="primary">Información</CardHeader>
				<CardBody className="col-span-full grid grid-cols-subgrid gap-4">
					<MenuItem
						iconLeft={<IconMail className="text-primary-600" />}
						textHelp={session?.user?.email || "N/A"}
						canHover={false}
					>
						Email
					</MenuItem>
					<MenuItem
						iconLeft={<IconCalendar className="text-primary-600" />}
						textHelp={createdAt}
						canHover={false}
					>
						Fecha de Registro
					</MenuItem>
				</CardBody>
			</Card>

			<Card className="col-span-4">
				<CardHeader color="primary">Materias Cursando</CardHeader>
				<CardBody className="col-span-full grid grid-cols-subgrid gap-4">
					{materiasCursando.length === 0 ? (
						<MenuItem>No estás cursando ninguna materia</MenuItem>
					) : (
						materiasCursando.map((avance: any) => {
							const { materia, plan } = avance.materia_plan;
							const { carrera } = plan;

							const carreraNombre = carrera.nombre;

							return (
								<MenuItem
									key={avance.id}
									textHelp={carreraNombre}
									href={`/carreras/${carrera.slug}/${plan.anio_inicio}?tab=info`}
								>
									{materia.nombre}
								</MenuItem>
							);
						})
					)}
				</CardBody>
			</Card>
			<Card className="col-span-4">
				<CardHeader color="primary">Carreras Favoritas</CardHeader>
				<CardBody className="col-span-full grid grid-cols-subgrid gap-4">
					{carrerasFav.length === 0 ? (
						<MenuItem>No tienes carreras favoritas</MenuItem>
					) : (
						carrerasFav.map((carreraFav: any) => {
							const { plan } = carreraFav;
							const { carrera } = plan;

							return (
								<MenuItem
									className={`theme-${carrera.slug} text-primary-600 dark:text-primary-400`}
									key={carreraFav.id}
									iconLeft={
										<IconCarrera icon={carrera.icon} />
									}
									iconRight={<IconChevronRight />}
									href={`/carreras/${carrera.slug}/${plan.anio_inicio}`}
									textHelp={plan.anio_inicio}
								>
									{carrera.nombre}
								</MenuItem>
							);
						})
					)}
				</CardBody>
			</Card>
		</section>
	);
};
