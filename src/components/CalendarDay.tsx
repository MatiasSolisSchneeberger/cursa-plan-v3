import {cn} from "../utils/cn"

export type CalendarColor = "primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info" | "default"

interface CalendarDayProps {
	day: number | string
	isToday?: boolean

	isSelected?: boolean
	isRangeStart?: boolean
	isRangeEnd?: boolean
	isRangeMiddle?: boolean

	color?: CalendarColor
	onClick?: () => void
	className?: string
	title?: string
}

export default function CalendarDay({
	day,
	isToday = false,
	isSelected = false,
	isRangeStart = false,
	isRangeEnd = false,
	isRangeMiddle = false,
	color = "default",
	onClick,
	className,
	title,
}: CalendarDayProps) {
	// Diccionario de estilos base por color (puedes moverlo fuera o a un archivo de config)
	const colorVariants: Record<CalendarColor, string> = {
		default: "text-text-900 dark:text-text-100 hover:bg-background-200 dark:hover:bg-background-800",
		primary: "bg-primary-400 text-primary-800 dark:bg-primary-500",
		secondary: "bg-secondary-400 text-secondary-800 dark:bg-secondary-500",
		tertiary: "bg-tertiary-400 text-tertiary-800 dark:bg-tertiary-500",
		success: "bg-success-400 text-success-800",
		danger: "bg-danger-400 text-danger-800",
		warning: "bg-warning-400 text-warning-800", // Warning suele ser claro, ajusta contraste
		info: "bg-info-400 text-info-800",
	}

	// Colores para el "medio" del rango (suelen ser más suaves)
	const rangeMiddleVariants: Record<CalendarColor, string> = {
		default: "",
		primary: "bg-primary-200 text-primary-600 dark:bg-primary-900 dark:text-primary-100",
		secondary: "bg-secondary-200 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-100",
		tertiary: "bg-tertiary-200 text-tertiary-600 dark:bg-tertiary-900 dark:text-tertiary-100",
		success: "bg-success-200 text-success-600",
		danger: "bg-danger-200 text-danger-600",
		warning: "bg-warning-200 text-warning-600",
		info: "bg-info-200 text-info-600",
	}

	const baseStyles =
		"flex items-center justify-center w-full min-w-8 aspect-square text-label font-medium transition-all select-none relative"

	// Forma del botón (Redondo si es único, cuadrado o semi-redondo si es rango)
	let shapeStyles = "rounded-2xl"
	if (isRangeStart) shapeStyles = "rounded-l-2xl rounded-r-none"
	if (isRangeEnd) shapeStyles = "rounded-r-2xl rounded-l-none"
	if (isRangeMiddle) shapeStyles = "rounded-none"

	// Determinar qué paleta usar
	const activeColorClass =
		isSelected || isRangeStart || isRangeEnd
			? colorVariants[color]
			: isRangeMiddle
			? rangeMiddleVariants[color]
			: colorVariants["default"]
	return (
		<span
			onClick={onClick}
			title={title}
			className={cn(
				baseStyles,
				shapeStyles,
				activeColorClass,
				// Estilo para "Hoy" (borde o subrayado)
				isToday && !isSelected && !isRangeMiddle && `${colorVariants["primary"]}`,
				className
			)}>
			{day}
		</span>
	)
}
