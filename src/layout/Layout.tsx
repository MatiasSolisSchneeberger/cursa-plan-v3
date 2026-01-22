import {Outlet, useParams} from "react-router-dom"
import {NavHeader} from "../sections/NavHeader"
import Footer from "../sections/Footer"
import ButtonUp from "../components/ButtonUp"
import DevModeAlert from "../components/DevModeAlert"

const Layout = () => {
	// 1. useParams lee la parte dinámica de la URL (ej: :carrera)
	// Asegúrate de que el nombre aquí coincida con el de tu Route en App.jsx
	const {carreraSlug} = useParams()

	// 2. Construimos la clase.
	// Si la URL es /carrera/sistemas, la clase será "theme-sistemas"
	// Si por alguna razón no hay carrera, puedes poner un 'theme-default'
	const themeClass = carreraSlug ? `theme-${carreraSlug}` : ""

	return (
		// 3. Este div "enciende" las variables CSS para todo lo que esté adentro
		<main
			className={`${themeClass} relative transition-color ease-in-out duration-200 bg-background-200 dark:bg-background-950 text-text-950 dark:text-text-100 space-y-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-4 min-h-screen`}>
			{/* Nav */}
			<NavHeader />
			<ButtonUp />

			<Outlet />
			<DevModeAlert />
			<Footer />
		</main>
	)
}

export default Layout
