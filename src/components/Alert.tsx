import {IconX} from "@tabler/icons-react"
import ButtonIcon from "./ButtonIcon"
import {useState, useEffect} from "react"
import {cn} from "../utils/cn"

/**
 * Tipos de colores disponibles para la alerta.
 * Corresponden a las claves del objeto `colorStyles`.
 */
type AlertColor = "primary" | "secondary" | "tertiary" | "danger" | "warning" | "success" | "info"

/**
 * Propiedades del componente Alert.
 */
interface AlertProps {
	/** Color temático de la alerta. Define el fondo, borde y color de texto. */
	color: AlertColor
	/** Icono principal que se muestra a la izquierda. */
	icon: React.ReactNode
	/** Título principal de la alerta. */
	title: string
	/** Descripción detallada o texto de ayuda (opcional). */
	description?: string
	/** Contenido adicional renderizado al final del texto (ej. botones de acción). */
	endContent?: React.ReactNode
	/** Determina si la alerta puede ser cerrada por el usuario. Por defecto es `true`. */
	canClose?: boolean
	/** Callback que se ejecuta cuando la alerta se cierra completamente (después de la animación). */
	onClose?: () => void
	/** Clases CSS adicionales para el contenedor principal. */
	className?: string
}

/**
 * Estilos predefinidos para cada variante de color.
 * Se definen fuera del componente para evitar recrearlos en cada render.
 */
const colorStyles: Record<AlertColor, {bg: string; border: string; title: string; text: string}> = {
	primary: {
		bg: "bg-primary-200 dark:bg-primary-800",
		border: "bg-primary-600",
		title: "text-primary-700 dark:text-primary-300",
		text: "text-primary-600 dark:text-primary-400",
	},
	secondary: {
		bg: "bg-secondary-200 dark:bg-secondary-800",
		border: "bg-secondary-600",
		title: "text-secondary-700 dark:text-secondary-300",
		text: "text-secondary-600 dark:text-secondary-400",
	},
	tertiary: {
		bg: "bg-tertiary-200 dark:bg-tertiary-800",
		border: "bg-tertiary-600",
		title: "text-tertiary-700 dark:text-tertiary-300",
		text: "text-tertiary-600 dark:text-tertiary-400",
	},
	danger: {
		bg: "bg-danger-200 dark:bg-danger-800",
		border: "bg-danger-600",
		title: "text-danger-700 dark:text-danger-300",
		text: "text-danger-600 dark:text-danger-400",
	},
	warning: {
		bg: "bg-warning-200 dark:bg-warning-800",
		border: "bg-warning-600",
		title: "text-warning-700 dark:text-warning-300",
		text: "text-warning-600 dark:text-warning-400",
	},
	success: {
		bg: "bg-success-200 dark:bg-success-800",
		border: "bg-success-600",
		title: "text-success-700 dark:text-success-300",
		text: "text-success-600 dark:text-success-400",
	},
	info: {
		bg: "bg-info-200 dark:bg-info-800",
		border: "bg-info-600",
		title: "text-info-700 dark:text-info-300",
		text: "text-info-600 dark:text-info-400",
	},
}

/**
 * Componente Alert para mostrar mensajes de estado, advertencias o información.
 * Soporta variantes de color, cierre animado y contenido personalizado.
 */
export default function Alert({
	color = "primary",
	icon,
	title,
	description,
	endContent,
	canClose = true,
	onClose,
	className = "",
}: AlertProps) {
	const [isVisible, setIsVisible] = useState(true)
	const [isClosing, setIsClosing] = useState(false)

	// Manejo seguro del unmount si el componente se desmonta antes de terminar la animación
	useEffect(() => {
		return () => {
			// Cleanup si es necesario (generalmente React maneja esto bien, pero es buena práctica no setState en unmount)
		}
	}, [])

	const styles = colorStyles[color] || colorStyles.primary

	const handleClose = () => {
		setIsClosing(true)
		// Esperamos a que termine la animación (300ms) para notificar y ocultar
		setTimeout(() => {
			setIsVisible(false)
			if (onClose) onClose()
		}, 300)
	}

	if (!isVisible) return null

	return (
		<aside
			role="alert"
			className={cn(
				`relative flex w-full min-w-0 max-w-full flex-row gap-3 overflow-hidden rounded-md p-4 shadow-sm transition-all duration-300 ease-in-out`,
				styles.bg,
				isClosing ? "opacity-0 -translate-y-2 scale-95" : "opacity-100 translate-y-0 scale-100",
				className,
			)}>
			{/* Barra lateral de color decorativa */}
			<div className={`absolute left-0 top-0 h-full w-1 ${styles.border}`} />

			{/* Icono Principal */}
			<div className="flex shrink-0 items-start pt-0.5">
				<ButtonIcon
					className="pointer-events-none cursor-default bg-transparent p-0"
					color={color}
					variant="text"
					tabIndex={-1}>
					{icon}
				</ButtonIcon>
			</div>

			{/* Contenido de Texto */}
			<section className="flex min-w-0 flex-1 flex-col gap-1">
				<h3 className={`font-semibold leading-tight ${styles.title}`}>{title}</h3>
				{description && <p className={`text-sm leading-relaxed ${styles.text}`}>{description}</p>}

				{/* Contenido extra (botones de acción, links, etc) */}
				{endContent && <div className="mt-3 flex flex-row items-center justify-end gap-2">{endContent}</div>}
			</section>

			{/* Botón Cerrar */}
			{canClose && (
				<div className="shrink-0">
					<ButtonIcon
						variant="text"
						color={color}
						onClick={handleClose}
						aria-label="Cerrar alerta"
						className="hover:bg-black/5 dark:hover:bg-white/10">
						<IconX size={18} />
					</ButtonIcon>
				</div>
			)}
		</aside>
	)
}
