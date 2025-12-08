import {Outlet, useParams} from "react-router-dom"
import {NavHeader} from "../sections/NavHeader"

const Layout = () => {
	// 1. useParams lee la parte dinámica de la URL (ej: :carrera)
	// Asegúrate de que el nombre aquí coincida con el de tu Route en App.jsx
	const {carrera} = useParams()

	// 2. Construimos la clase.
	// Si la URL es /carrera/sistemas, la clase será "theme-sistemas"
	// Si por alguna razón no hay carrera, puedes poner un 'theme-default'
	const themeClass = carrera ? `theme-${carrera}` : ""

	return (
		// 3. Este div "enciende" las variables CSS para todo lo que esté adentro
		<main
			className={`${themeClass} transition-color ease-in-out duration-200 max-h-screen justify-center justify-items-center bg-background-200 dark:bg-background-950 text-text-950 dark:text-text-100 h-full max-w-480 space-y-6 p-4 sm:px-12 sm:py-4 md:px-16 md:py-6 lg:px-20 lg:py-4 `}>
			{/* Nav */}
			<NavHeader />

			{/* 4. <Outlet /> es donde React Router inyectará la página específica (Detalle, Materias, etc.) */}
			<Outlet />
		</main>
	)
}

export default Layout
