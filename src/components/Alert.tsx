import {IconX} from "@tabler/icons-react"
import ButtonIcon from "./ButtonIcon"
import {useState} from "react"

// Definimos los estilos fijos para que Tailwind los detecte
const colorStyles = {
	primary: {
		bg: "bg-primary-100 dark:bg-primary-900/30",
		border: "bg-primary-600",
		title: "text-primary-700 dark:text-primary-300",
		text: "text-primary-600 dark:text-primary-400",
	},
	secondary: {
		bg: "bg-secondary-100 dark:bg-secondary-900/30",
		border: "bg-secondary-600",
		title: "text-secondary-700 dark:text-secondary-300",
		text: "text-secondary-600 dark:text-secondary-400",
	},
	tertiary: {
		bg: "bg-tertiary-100 dark:bg-tertiary-900/30",
		border: "bg-tertiary-600",
		title: "text-tertiary-700 dark:text-tertiary-300",
		text: "text-tertiary-600 dark:text-tertiary-400",
	},
	danger: {
		bg: "bg-danger-100 dark:bg-danger-900/30",
		border: "bg-danger-600",
		title: "text-danger-700 dark:text-danger-300",
		text: "text-danger-600 dark:text-danger-400",
	},
	warning: {
		bg: "bg-warning-100 dark:bg-warning-900/30",
		border: "bg-warning-600",
		title: "text-warning-700 dark:text-warning-300",
		text: "text-warning-600 dark:text-warning-400",
	},
	success: {
		bg: "bg-success-100 dark:bg-success-900/30",
		border: "bg-success-600",
		title: "text-success-700 dark:text-success-300",
		text: "text-success-600 dark:text-success-400",
	},
	info: {
		bg: "bg-info-100 dark:bg-info-900/30",
		border: "bg-info-600",
		title: "text-info-700 dark:text-info-300",
		text: "text-info-600 dark:text-info-400",
	},
}

type AlertColor = keyof typeof colorStyles

interface AlertProps {
	color: AlertColor
	icon: React.ReactNode
	title: string // Cambié 'text' por 'title' para ser más semántico
	description?: string // Cambié 'textHelp' por 'description'
	endContent?: React.ReactNode
	canClose?: boolean
	onClose?: () => void // Callback opcional por si el padre necesita saber
}

export default function Alert({
	color = "primary",
	icon,
	title,
	description,
	endContent,
	canClose = true,
	onClose,
}: AlertProps) {
	const [isVisible, setIsVisible] = useState(true)
	const [isClosing, setIsClosing] = useState(false)

	const styles = colorStyles[color] || colorStyles.primary

	const handleClose = () => {
		setIsClosing(true)
		// Esperamos a que termine la animación (300ms) para desmontar
		setTimeout(() => {
			setIsVisible(false)
			if (onClose) onClose()
		}, 300)
	}

	if (!isVisible) return null

	return (
		<aside
			role="alert"
			className={`
                relative flex w-full min-w-2xs max-w-2xl flex-row items-start justify-between gap-3 overflow-hidden rounded-md p-4 shadow-sm transition-all duration-300 ease-in-out
                ${styles.bg}
                ${isClosing ? "opacity-0 -translate-y-2 scale-95" : "opacity-100 translate-y-0 scale-100"}
            `}>
			{/* Barra lateral de color decorativa */}
			<div className={`absolute left-0 top-0 h-full w-1 ${styles.border}`} />

			{/* Icono Principal */}
			<div className="shrink-0 pt-0.5">
				<ButtonIcon className="pointer-events-none" color={color}>
					{icon}
				</ButtonIcon>
			</div>

			{/* Contenido de Texto */}
			<section className="flex flex-1 flex-col gap-1">
				<h3 className={`font-semibold leading-tight ${styles.title}`}>{title}</h3>
				{description && <p className={`text-sm ${styles.text}`}>{description}</p>}

				{/* Contenido extra (botones de acción, links, etc) */}
				{endContent && <div className="mt-2 flex flex-row items-center justify-end">{endContent}</div>}
			</section>

			{/* Botón Cerrar */}
			{canClose && (
				<div className="-mr-2 -mt-2 shrink-0">
					<ButtonIcon variant="outlined" color={color} onClick={handleClose} aria-label="Cerrar alerta">
						<IconX size={18} />
					</ButtonIcon>
				</div>
			)}
		</aside>
	)
}
