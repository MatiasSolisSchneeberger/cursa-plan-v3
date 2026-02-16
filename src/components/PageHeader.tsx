import {IconArrowLeft} from "@tabler/icons-react"
import Button from "./Button"
import type {ReactNode} from "react"

interface PageHeaderProps {
	title: string | ReactNode
	backUrl: string
	children?: ReactNode
}

export default function PageHeader({title, backUrl, children}: PageHeaderProps) {
	return (
		<header className="w-full flex items-center p-3 bg-primary-100 dark:bg-primary-900 outline-primary-300 dark:outline-primary-700 outline-2 rounded-3xl gap-3">
			{/* Bloque Izquierdo: Botón Volver */}
			<div className="shrink-0">
				<Button isIconOnly variant="solid" color="primary" href={backUrl}>
					<IconArrowLeft />
				</Button>
			</div>

			{/* Bloque Derecho: Contenido */}
			<div className="md:border-l-2 border-primary-300 dark:border-primary-700 pl-3 flex flex-wrap gap-3 justify-between texto-headline text-primary-600 dark:text-primary-400 w-full text-center">
				{/* Título */}
				<div className="flex items-center flex-1">{title}</div>
				{/* Controles (Chips, Dropdowns, etc) */}
				{children && (
					<div className="md:border-l-2 md:border-t-0 border-t-2 border-primary-300 dark:border-primary-700 md:pl-3 pt-3 md:pt-0 flex items-center gap-3 w-full flex-wrap md:w-auto">
						{children}
					</div>
				)}
			</div>
		</header>
	)
}
