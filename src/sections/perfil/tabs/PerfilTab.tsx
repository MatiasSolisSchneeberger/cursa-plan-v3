import {useEffect, useState} from "react"
import Card from "../../../components/Card"
import CardBody from "../../../components/CardBody"
import CardHeader from "../../../components/CardHeader"
import CardInfoList from "../../../components/CardInfoList"
import MenuGroup from "../../../components/MenuGroup"
import MenuItem from "../../../components/MenuItem"
import {useAuth} from "../../../context/AuthContextData"
import {IconMail, IconUser, IconCalendar, IconChevronRight} from "@tabler/icons-react"
import supabase from "../../../utils/supabase"
import IconCarrera from "../../../components/IconCarrera"
import type {CarrerasFav} from "../../../types/carrerasFav"

export const PerfilTab = () => {
	const {session, loading: loadingAuth, role} = useAuth()
	const [loading, setLoading] = useState(true)

	const [carrerasFav, setCarrerasFav] = useState<CarrerasFav[]>([])
	const [materiasCursando, setMateriasCursando] = useState<any[]>([])

	useEffect(() => {
		if (loadingAuth) return

		const fetchData = async () => {
			try {
				if (!session) return

				// 1. Fetch Carreras Favoritas
				const {data: carrerasFavData} = await supabase
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
					.eq("user_id", session.user.id)

				if (carrerasFavData) {
					setCarrerasFav(carrerasFavData)
				}

				// 2. Fetch Materias Cursando
				const {data: cursandoData} = await supabase
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
					.eq("estado", "Cursando")

				if (cursandoData) {
					setMateriasCursando(cursandoData)
				}
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		if (session) {
			fetchData()
		} else {
			setLoading(false)
		}
	}, [session, loadingAuth])

	// Formatear fecha de creación
	const createdAt = session?.user?.created_at ? new Date(session.user.created_at).toLocaleDateString() : "N/A"

	return (
		<Card className="col-span-4 sm:col-span-6 md:col-span-9 grid grid-cols-subgrid">
			<CardHeader color="primary" className="col-span-full">
				Información
			</CardHeader>
			<CardBody className="col-span-full grid grid-cols-subgrid gap-4">
				<CardInfoList title="Tu información" className="col-span-4 sm:col-span-2 md:col-span-3">
					<MenuGroup>
						<MenuItem
							iconLeft={<IconMail className="text-primary-600" />}
							textHelp={session?.user?.email || "N/A"}
							canHover={false}>
							Email
						</MenuItem>
						<MenuItem iconLeft={<IconCalendar className="text-primary-600" />} textHelp={createdAt} canHover={false}>
							Fecha de Registro
						</MenuItem>
					</MenuGroup>
				</CardInfoList>

				<CardInfoList title="Materias Cursando" className="col-span-4 sm:col-span-2 md:col-span-3">
					<MenuGroup>
						{materiasCursando.length === 0 ?
							<MenuItem>No estás cursando ninguna materia</MenuItem>
						:	materiasCursando.map((avance: any) => {
								const {materia, plan} = avance.materia_plan
								const {carrera} = plan

								const carreraNombre = carrera.nombre

								return (
									<MenuItem
										key={avance.id}
										textHelp={carreraNombre}
										href={`/carreras/${carrera.slug}?plan=${plan.anio_inicio}&tab=info`}>
										{materia.nombre}
									</MenuItem>
								)
							})
						}
					</MenuGroup>
				</CardInfoList>

				<CardInfoList title="Carreras Favoritas" className="col-span-4 sm:col-span-2 md:col-span-3">
					<MenuGroup>
						{carrerasFav.length === 0 ?
							<MenuItem>No tienes carreras favoritas</MenuItem>
						:	carrerasFav.map((carreraFav: any) => {
								const {plan} = carreraFav
								const {carrera} = plan

								return (
									<MenuItem
										className={`theme-${carrera.slug} text-primary-600 dark:text-primary-400`}
										key={carreraFav.id}
										iconLeft={<IconCarrera icon={carrera.icon} />}
										iconRight={<IconChevronRight />}
										href={`/carreras/${carrera.slug}?plan=${plan.anio_inicio}`}
										textHelp={plan.anio_inicio}>
										{carrera.nombre}
									</MenuItem>
								)
							})
						}
					</MenuGroup>
				</CardInfoList>
			</CardBody>
		</Card>
	)
}
