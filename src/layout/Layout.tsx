import { Outlet, useParams } from "react-router-dom";
import NavHeader from "../sections/NavHeader";
import Footer from "../sections/Footer";
import ButtonUp from "../components/ButtonUp";
import DevModeAlert from "../components/DevModeAlert";

const Layout = () => {
	// 1. useParams lee la parte dinámica de la URL (ej: :carrera)
	// Asegúrate de que el nombre aquí coincida con el de tu Route en App.jsx
	const { carreraSlug } = useParams();

	// 2. Construimos la clase.
	// Si la URL es /carrera/sistemas, la clase será "theme-sistemas"
	// Si por alguna razón no hay carrera, puedes poner un 'theme-default'
	const themeClass = carreraSlug ? `theme-${carreraSlug}` : "";

	return (
		// 3. Este div "enciende" las variables CSS para todo lo que esté adentro
		<main
			className={`${themeClass} transition-color text-text-950 dark:text-text-100 relative min-h-screen space-y-6 px-4 pb-4 duration-200 ease-in-out sm:px-6 md:px-8 lg:px-10 xl:px-12`}
		>
			<NavHeader />

			<ButtonUp />

			{/* Children */}
			<Outlet />

			<DevModeAlert />

			<Footer />
		</main>
	);
};

export default Layout;
