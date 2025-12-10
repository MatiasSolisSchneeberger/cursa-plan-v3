import {IconMoon, IconSun} from "@tabler/icons-react"
import ButtonIcon from "./ButtonIcon"

export default function ThemeButton() {
	return (
		<ButtonIcon variant="outlined" onClick={() => document.body.classList.toggle("dark")}>
			<IconSun className="block dark:hidden" />
			<IconMoon className="hidden dark:block" />
		</ButtonIcon>
	)
}
