import {useEffect, useState} from "react"
import LogoPage from "../components/LogoPage"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"
import supabase from "../utils/supabase"
import IconCarrera from "../components/IconCarrera"

export default function Footer() {
	const [carreras, SetCarreras] = useState<any[]>([])

	const links = [
		{
			title: "Home",
			url: "/",
		},
		{
			title: "Contacto",
			url: "/contacto",
		},
		{
			title: "Acerca de",
			url: "/acerca-de",
		},
	]

	useEffect(() => {
		const fetchCarreras = async () => {
			const {data, error} = await supabase
				.from("carreras")
				.select("id, nombre, slug, emojie")
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
				<span>Esta es una pagina para los alumnos </span>
				<span>© {new Date().getFullYear()} Cursa Plan. Todos los derechos reservados.</span>
			</aside>
			<section className="">
				<MenuGroup title="Enlaces">
					{links.map((link) => (
						<MenuItem key={link.title} href={link.url}>
							{link.title}
						</MenuItem>
					))}
				</MenuGroup>
			</section>
			<section>
				<MenuGroup title="Carreras">
					{carreras?.map((carrera) => (
						<MenuItem
							key={carrera.id}
							href={`/carreras/${carrera.slug}`}
							iconLeft={
								<IconCarrera
									className={`theme-${carrera.slug} text-primary-600 dark:text-primary-400`}
									icon={carrera.emojie}
								/>
							}>
							{carrera.nombre}
						</MenuItem>
					))}
				</MenuGroup>
			</section>
		</footer>
	)
}
