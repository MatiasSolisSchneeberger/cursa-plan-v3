import { useEffect, useState } from "react";
import { type Theme, ThemeContext } from "@/context/ThemeContextData";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	// 1. Inicializamos el estado buscando en localStorage o la preferencia del sistema
	const [theme, setTheme] = useState<Theme>(() => {
		// ¿Ya guardó el usuario una preferencia antes?
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		if (savedTheme) {
			return savedTheme;
		}
		// Si no, ¿su sistema operativo está en modo oscuro?
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}
		return "light";
	});

	// 2. Este efecto se ejecuta cada vez que cambia el tema
	useEffect(() => {
		const root = window.document.documentElement;

		// Quitamos ambas clases para evitar conflictos
		root.classList.remove("light", "dark");

		// Agregamos la clase actual al HTML
		root.classList.add(theme);

		// Guardamos la preferencia para el futuro
		localStorage.setItem("theme", theme);
	}, [theme]);

	// 3. Función para alternar entre modos
	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
