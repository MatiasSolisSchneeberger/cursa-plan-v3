import {useEffect, useState} from "react"
import LogoPage from "../components/LogoPage"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"
import supabase from "../utils/supabase"
import IconCarrera from "../components/IconCarrera"
import {INTERNAL_LINKS, SOCIAL_LINKS} from "../utils/links"

interface Carrera {
	id: number
	nombre: string
	slug: string
	icon: string
}

export default function Footer() {
	const [carreras, SetCarreras] = useState<Carrera[]>([])

	const urlActual = window.location.pathname

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
		<footer className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-center items-start bg-background-100 dark:bg-background-900 outline outline-background-300 dark:outline-background-700 rounded-3xl">
			<aside>
				<LogoPage />
				{/* TODO: Mejorar descripción o slogan del sitio */}
				<span>Esta es una pagina para los alumnos </span>
				<span>© {new Date().getFullYear()} Cursa Plan. Todos los derechos reservados.</span>
			</aside>
			<section className="grid grid-cols-subgrid">
				<MenuGroup title="Principales" className="col-span-1">
					{INTERNAL_LINKS.filter((link) => link.category === "main").map((link) => {
						if (link.href !== urlActual) {
							return (
								<MenuItem key={link.label} href={link.href} iconLeft={link.icon}>
									{link.label}
								</MenuItem>
							)
						}
					})}
				</MenuGroup>
			</section>
			<section>
				<MenuGroup title="Información" className="col-span-1">
					{INTERNAL_LINKS.filter((link) => link.category === "secondary").map((link) => {
						if (link.href !== urlActual) {
							return (
								<MenuItem key={link.label} href={link.href} iconLeft={link.icon}>
									{link.label}
								</MenuItem>
							)
						}
					})}
				</MenuGroup>
			</section>
			<section className="grid grid-cols-subgrid">
				<MenuGroup title="Legal" className="col-span-1">
					{INTERNAL_LINKS.filter((link) => link.category === "legal").map((link) => {
						if (link.href !== urlActual) {
							return (
								<MenuItem key={link.label} href={link.href} iconLeft={link.icon}>
									{link.label}
								</MenuItem>
							)
						}
					})}
				</MenuGroup>
			</section>
			<section>
				<MenuGroup title="Contactos">
					{SOCIAL_LINKS.map((link) => {
						return (
							<MenuItem key={link.label} href={link.href} iconLeft={link.icon}>
								{link.label}
							</MenuItem>
						)
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
