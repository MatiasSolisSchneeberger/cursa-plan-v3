import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente que desplaza la vista hacia arriba cuando cambia la ruta.
 * @returns null
 */
export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
