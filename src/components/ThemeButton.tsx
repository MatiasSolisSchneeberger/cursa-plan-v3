import {IconMoon, IconSun} from "@tabler/icons-react"
import ButtonIcon from "./ButtonIcon"
import {useEffect} from "react"

export default function ThemeButton() {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key.toLowerCase() === "d") {
				e.preventDefault()
				document.body.classList.toggle("dark")
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [])

	return (
		<ButtonIcon variant="outlined" onClick={() => document.body.classList.toggle("dark")}>
			<IconSun className="block dark:hidden" />
			<IconMoon className="hidden dark:block" />
		</ButtonIcon>
	)
}
