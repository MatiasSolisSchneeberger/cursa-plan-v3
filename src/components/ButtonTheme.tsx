import {useEffect} from "react"
import {IconMoon, IconSun} from "@tabler/icons-react"
import Button from "./Button"
import {useTheme} from "../context/ThemeContextData"

export default function ButtonTheme() {
	const {theme, toggleTheme} = useTheme()

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && (e.key === "d" || e.key === "D")) {
				e.preventDefault()
				toggleTheme()
			}
		}
		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [toggleTheme])

	// Icono dinámico según el estado
	const getIcon = () => {
		if (theme === "light") return <IconSun size={20} />
		return <IconMoon size={20} />
	}

	return (
		<Button
			isIconOnly
			onClick={toggleTheme}
			title={`Tema actual: ${theme === "dark" ? "Oscuro" : "Claro"}`}
			variant="outlined"
			color="tertiary">
			{getIcon()}
		</Button>
	)
}
