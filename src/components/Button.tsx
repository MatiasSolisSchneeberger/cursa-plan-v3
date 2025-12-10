import {Link} from "react-router-dom"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "solid" | "flat" | "outlined" | "text"
	color?: "primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info"
	href?: string
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
}

/**
 * Este es un boton, el cual se puede elegir el color y la variante
 * @param variant - Variante del boton
 * @param color - Color del boton
 * @param href - Enlace del boton
 * @param disabled - Deshabilita el boton
 * @param id - Id del boton
 * @param className - Clases adicionales
 * @param iconLeft - Icono izquierdo
 * @param iconRight - Icono derecho
 */
export default function Button({
	variant = "solid",
	color = "primary",
	href,
	disabled = false,
	id,
	className = "",
	children,
	iconLeft,
	iconRight,
	...props
}: ButtonProps) {
	// 2. Lógica para generar las clases CSS
	const baseClasses =
		"texto-label relative flex min-h-10 flex-row items-center justify-center gap-0 rounded-xl px-3 text-nowrap transition-all duration-150 ease-in-out select-none not-disabled:hover:rounded-2xl not-disabled:hover:shadow-md not-disabled:focus:ring-2 not-disabled:focus:ring-offset-2 not-disabled:focus:ring-background-900 not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-65 dark:not-disabled:focus:ring-background-200 "

	const colorStyles = {
		primary: {
			solid: "bg-primary-600 text-primary-100 dark:bg-primary-400 dark:text-primary-900",
			flat: "bg-primary-300 text-primary-700 dark:bg-primary-700 dark:text-primary-300",
			outlined:
				"text-primary-600 outline-1 outline-primary-600 dark:text-primary-400 dark:outline-primary-400 focus:ring-1 focus:ring-primary-600 hover:bg-primary-100 dark:hover:bg-primary-800",
			text: "text-primary-600 not-disabled:hover:text-primary-700 not-disabled:hover:bg-primary-100 dark:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-primary-900",
		},
		secondary: {
			solid: "bg-secondary-600 text-secondary-100 dark:bg-secondary-400 dark:text-secondary-900",
			flat: "bg-secondary-300 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300",
			outlined:
				"text-secondary-600 outline-1 outline-secondary-600 dark:text-secondary-400 dark:outline-secondary-400 focus:ring-1 focus:ring-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-800",
			text: "text-secondary-600 not-disabled:hover:text-secondary-700 not-disabled:hover:bg-secondary-100 dark:text-secondary-400 dark:hover:text-secondary-300 dark:hover:bg-secondary-900",
		},
		tertiary: {
			solid: "bg-tertiary-600 text-tertiary-100 dark:bg-tertiary-400 dark:text-tertiary-900",
			flat: "bg-tertiary-300 text-tertiary-700 dark:bg-tertiary-700 dark:text-tertiary-300",
			outlined:
				"text-tertiary-600 outline-1 outline-tertiary-600 dark:text-tertiary-400 dark:outline-tertiary-400 focus:ring-1 focus:ring-tertiary-600 hover:bg-tertiary-100 dark:hover:bg-tertiary-800",
			text: "text-tertiary-600 not-disabled:hover:text-tertiary-700 not-disabled:hover:bg-tertiary-100 dark:text-tertiary-400 dark:hover:text-tertiary-300 dark:hover:bg-tertiary-900",
		},
		success: {
			solid: "bg-success-600 text-success-100 dark:bg-success-400 dark:text-success-900",
			flat: "bg-success-300 text-success-700 dark:bg-success-700 dark:text-success-300",
			outlined:
				"text-success-600 outline-1 outline-success-600 dark:text-success-400 dark:outline-success-400 focus:ring-1 focus:ring-success-600 hover:bg-success-100 dark:hover:bg-success-800",
			text: "text-success-600 not-disabled:hover:text-success-700 not-disabled:hover:bg-success-100 dark:text-success-400 dark:hover:text-success-300 dark:hover:bg-success-900",
		},
		danger: {
			solid: "bg-danger-600 text-danger-100 dark:bg-danger-400 dark:text-danger-900",
			flat: "bg-danger-300 text-danger-700 dark:bg-danger-700 dark:text-danger-300",
			outlined:
				"text-danger-600 outline-1 outline-danger-600 dark:text-danger-400 dark:outline-danger-400 focus:ring-1 focus:ring-danger-600 hover:bg-danger-100 dark:hover:bg-danger-800",
			text: "text-danger-600 not-disabled:hover:text-danger-700 not-disabled:hover:bg-danger-100 dark:text-danger-400 dark:hover:text-danger-300 dark:hover:bg-danger-900",
		},
		warning: {
			solid: "bg-warning-600 text-warning-100 dark:bg-warning-400 dark:text-warning-900",
			flat: "bg-warning-300 text-warning-700 dark:bg-warning-700 dark:text-warning-300",
			outlined:
				"text-warning-600 outline-1 outline-warning-600 dark:text-warning-400 dark:outline-warning-400 focus:ring-1 focus:ring-warning-600 hover:bg-warning-100 dark:hover:bg-warning-800",
			text: "text-warning-600 not-disabled:hover:text-warning-700 not-disabled:hover:bg-warning-100 dark:text-warning-400 dark:hover:text-warning-300 dark:hover:bg-warning-900",
		},
		info: {
			solid: "bg-info-600 text-info-100 dark:bg-info-400 dark:text-info-900",
			flat: "bg-info-300 text-info-700 dark:bg-info-700 dark:text-info-300",
			outlined:
				"text-info-600 outline-1 outline-info-600 dark:text-info-400 dark:outline-info-400 focus:ring-1 focus:ring-info-600 hover:bg-info-100 dark:hover:bg-info-800",
			text: "text-info-600 not-disabled:hover:text-info-700 not-disabled:hover:bg-info-100 dark:text-info-400 dark:hover:text-info-300 dark:hover:bg-info-900",
		},
	}

	const styleClasses = () => colorStyles[color]?.[variant] || ""

	const fullClassName = `${styleClasses()} ${baseClasses} ${className}`

	// El componente en sí
	if (href) {
		// Renderiza <a> si tiene href y no está disabled
		return (
			<Link className={fullClassName} to={href} id={id} {...(props as any)}>
				{iconLeft}
				<span className="px-2">{children}</span>
				{iconRight}
			</Link>
		)
	} else {
		// Renderiza <button> en cualquier otro caso
		return (
			<button className={fullClassName} disabled={disabled} id={id} {...props}>
				{iconLeft}
				<span className="px-2">{children}</span>
				{iconRight}
			</button>
		)
	}
}
