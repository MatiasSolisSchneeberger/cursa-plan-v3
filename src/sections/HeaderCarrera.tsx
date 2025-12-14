import {IconArrowLeft} from "@tabler/icons-react"
import ButtonIcon from "../components/ButtonIcon"
import IconCarrera from "../components/IconCarrera"

export default function HeaderCarrera({name, icon}: {name: string; icon: string}) {
	return (
		<header className="w-full flex items-center justify-between p-3 bg-primary-100 dark:bg-primary-900 outline-primary-300 dark:outline-primary-700 outline-1 rounded-3xl">
			{/* boton de volver */}
			<ButtonIcon variant="flat" color="primary" href="/">
				<IconArrowLeft />
			</ButtonIcon>

			{/* titulo */}
			<h1 className="hidden lg:block texto-headline text-primary-600 dark:text-primary-400">{name}</h1>
			<h1 className="lg:hidden texto-headline text-primary-600 dark:text-primary-400">
				{name.replace("Licenciatura", "Lic.").replace("Ingeniería", "Ing.").replace("Profesorado", "Prof.")}
			</h1>

			{/* icono */}
			<ButtonIcon variant="flat" color="secondary" className="pointer-events-none" tabIndex={-1}>
				<IconCarrera icon={icon} />
			</ButtonIcon>
		</header>
	)
}
