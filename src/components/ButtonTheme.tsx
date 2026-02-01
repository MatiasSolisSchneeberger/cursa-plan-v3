import {useEffect, useState} from "react"
import {IconMoon, IconSun, IconDeviceDesktop} from "@tabler/icons-react"
import Button from "./Button"

type Theme = "light" | "dark" | "system"

export default function ButtonTheme() {
	// 1. Inicializamos el estado leyendo localStorage o por defecto 'system'
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== "undefined") {
			return (localStorage.getItem("theme") as Theme) || "system"
		}
		return "system"
	})

	// 2. Este efecto se encarga de aplicar los cambios al DOM y guardar
	useEffect(() => {
		const root = document.documentElement

		// Función para aplicar clases
		const applyTheme = (targetTheme: Theme) => {
			if (targetTheme === "dark") {
				root.classList.add("dark")
			} else if (targetTheme === "light") {
				root.classList.remove("dark")
			} else {
				// Caso 'system': miramos la preferencia del SO
				if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
					root.classList.add("dark")
				} else {
					root.classList.remove("dark")
				}
			}
		}

		applyTheme(theme)

		// 3. Guardar en localStorage
		if (theme === "system") {
			localStorage.removeItem("theme")
		} else {
			localStorage.setItem("theme", theme)
		}
	}, [theme])

	// Lógica para el botón (ciclo: Light -> Dark -> System -> Light)
	const toggleTheme = () => {
		if (theme === "light") setTheme("dark")
		else if (theme === "dark") setTheme("system")
		else setTheme("light")
	}

	// Icono dinámico según el estado
	const getIcon = () => {
		if (theme === "light") return <IconSun size={20} />
		if (theme === "dark") return <IconMoon size={20} />
		return <IconDeviceDesktop size={20} /> // Icono para "System"
	}

	return (
		<Button
			isIconOnly
			onClick={toggleTheme}
			title={`Tema actual: ${
				theme === "system" ? "Automático"
				: theme === "dark" ? "Oscuro"
				: "Claro"
			}`}
			variant="outlined"
			color="tertiary">
			{getIcon()}
		</Button>
	)
}
