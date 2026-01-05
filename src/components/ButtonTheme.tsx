import {IconMoon, IconSun} from "@tabler/icons-react"
import {useEffect} from "react"
import Button from "./Button"

export default function ThemeButton() {
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: light)")

		const aplicarTemaSistema = () => {
			if (mediaQuery.matches) {
				document.body.classList.remove("dark")
			} else {
				document.body.classList.add("dark")
			}
		}

		aplicarTemaSistema()

		const handleChange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				document.body.classList.remove("dark")
			} else {
				document.body.classList.add("dark")
			}
		}

		mediaQuery.addEventListener("change", handleChange)

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key.toLowerCase() === "d") {
				e.preventDefault()
				document.body.classList.toggle("dark")
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			mediaQuery.removeEventListener("change", handleChange)
		}
	}, [])

	return (
		<Button variant="outlined" isIconOnly onClick={() => document.body.classList.toggle("dark")}>
			<IconSun className="block dark:hidden" />
			<IconMoon className="hidden dark:block" />
		</Button>
	)
}
