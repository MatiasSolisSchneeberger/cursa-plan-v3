import {useEffect, useState} from "react"
import LogoPage from "../components/LogoPage"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"
import supabase from "../utils/supabase"
import IconCarrera from "../components/IconCarrera"
import {
	IconCalendar,
	IconFile,
	IconFilePencil,
	IconHome,
	IconInfoCircleFilled,
	IconQuestionMark,
	IconUsers,
} from "@tabler/icons-react"

interface Carrera {
	id: number
	nombre: string
	slug: string
	icon: string
}

export default function Footer() {
	const [carreras, SetCarreras] = useState<Carrera[]>([])

	const urlActual = window.location.pathname

	const links = [
		{
			title: "Home",
			url: "/",
			icon: <IconHome />,
		},
		{
			title: "Calendario",
			url: "/calendario",
			icon: <IconCalendar />,
		},
		{
			title: "Sobre Nosotros",
			url: "/sobre-nosotros",
			icon: <IconInfoCircleFilled />,
		},
		{
			title: "Terminos y Condiciones",
			url: "/terminos-y-condiciones",
			icon: <IconFile />,
		},
		{
			title: "Política de Privacidad",
			url: "/politica-de-privacidad",
			icon: <IconFilePencil />,
		},
		{
			title: "Preguntas Frecuentes",
			url: "/preguntas-frecuentes",
			icon: <IconQuestionMark />,
		},
		{
			title: "Contacto",
			url: "/contacto",
			icon: <IconUsers />,
		},
	]

	useEffect(() => {
		const fetchCarreras = async () => {
			const {data, error} = await supabase
				.from("carreras")
				.select("id, nombre, slug, icon")
				.order("slug", {ascending: true})

			if (error) {
				console.log("Error al buscar carreras:", error)
			} else {
				SetCarreras(data)
			}
		}

		fetchCarreras()
	}, [])

	return (
		<footer className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 justify-center items-start bg-background-100 dark:bg-background-900 outline outline-background-300 dark:outline-background-700 rounded-3xl">
			<aside>
				<LogoPage />
				{/* TODO: Mejorar descripción o slogan del sitio */}
				<span>Esta es una pagina para los alumnos </span>
				<span>© {new Date().getFullYear()} Cursa Plan. Todos los derechos reservados.</span>
			</aside>
			<section className="">
				<MenuGroup title="Enlaces">
					{links.map((link) => {
						if (link.url !== urlActual) {
							return (
								<MenuItem key={link.title} href={link.url} iconLeft={link.icon}>
									{link.title}
								</MenuItem>
							)
						}
					})}
				</MenuGroup>
			</section>
			<section>
				<MenuGroup title="Carreras">
					{carreras?.map((carrera) => (
						<MenuItem
							className={`theme-${carrera.slug} text-primary-800 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-900`}
							key={carrera.id}
							href={`/carreras/${carrera.slug}`}
							iconLeft={<IconCarrera icon={carrera.icon} className="text-primary-600 dark:text-primary-400" />}>
							{carrera.nombre}
						</MenuItem>
					))}
				</MenuGroup>
			</section>
		</footer>
	)
}
