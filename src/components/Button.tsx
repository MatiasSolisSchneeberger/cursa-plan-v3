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
				"text-primary-600 outline-1 outline-primary-600 dark:text-primary-400 dark:outline-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800",
			text: "text-primary-600 underline decoration-primary-600 underline-offset-4 not-disabled:hover:text-primary-700 not-disabled:hover:decoration-primary-700 not-disabled:hover:decoration-2 dark:text-primary-400 dark:decoration-primary-400",
		},
		secondary: {
			solid: "bg-secondary-600 text-secondary-100 dark:bg-secondary-400 dark:text-secondary-900",
			flat: "bg-secondary-300 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300",
			outlined:
				"text-secondary-600 outline-1 outline-secondary-600 dark:text-secondary-400 dark:outline-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800",
			text: "text-secondary-600 underline decoration-secondary-600 underline-offset-4 not-disabled:hover:text-secondary-700 not-disabled:hover:decoration-secondary-700 not-disabled:hover:decoration-2 dark:text-secondary-400 dark:decoration-secondary-400",
		},
		tertiary: {
			solid: "bg-tertiary-600 text-tertiary-100 dark:bg-tertiary-400 dark:text-tertiary-900",
			flat: "bg-tertiary-300 text-tertiary-700 dark:bg-tertiary-700 dark:text-tertiary-300",
			outlined:
				"text-tertiary-600 outline-1 outline-tertiary-600 dark:text-tertiary-400 dark:outline-tertiary-400 hover:bg-tertiary-100 dark:hover:bg-tertiary-800",
			text: "text-tertiary-600 underline decoration-tertiary-600 underline-offset-4 not-disabled:hover:text-tertiary-700 not-disabled:hover:decoration-tertiary-700 not-disabled:hover:decoration-2 dark:text-tertiary-400 dark:decoration-tertiary-400",
		},
		success: {
			solid: "bg-success-600 text-success-100 dark:bg-success-400 dark:text-success-900",
			flat: "bg-success-300 text-success-700 dark:bg-success-700 dark:text-success-300",
			outlined:
				"text-success-600 outline-1 outline-success-600 dark:text-success-400 dark:outline-success-400 hover:bg-success-100 dark:hover:bg-success-800",
			text: "text-success-600 underline decoration-success-600 underline-offset-4 not-disabled:hover:text-success-700 not-disabled:hover:decoration-success-700 not-disabled:hover:decoration-2 dark:text-success-400 dark:decoration-success-400",
		},
		danger: {
			solid: "bg-danger-600 text-danger-100 dark:bg-danger-400 dark:text-danger-900",
			flat: "bg-danger-300 text-danger-700 dark:bg-danger-700 dark:text-danger-300",
			outlined:
				"text-danger-600 outline-1 outline-danger-600 dark:text-danger-400 dark:outline-danger-400 hover:bg-danger-100 dark:hover:bg-danger-800",
			text: "text-danger-600 underline decoration-danger-600 underline-offset-4 not-disabled:hover:text-danger-700 not-disabled:hover:decoration-danger-700 not-disabled:hover:decoration-2 dark:text-danger-400 dark:decoration-danger-400",
		},
		warning: {
			solid: "bg-warning-600 text-warning-100 dark:bg-warning-400 dark:text-warning-900",
			flat: "bg-warning-300 text-warning-700 dark:bg-warning-700 dark:text-warning-300",
			outlined:
				"text-warning-600 outline-1 outline-warning-600 dark:text-warning-400 dark:outline-warning-400 hover:bg-warning-100 dark:hover:bg-warning-800",
			text: "text-warning-600 underline decoration-warning-600 underline-offset-4 not-disabled:hover:text-warning-700 not-disabled:hover:decoration-warning-700 not-disabled:hover:decoration-2 dark:text-warning-400 dark:decoration-warning-400",
		},
		info: {
			solid: "bg-info-600 text-info-100 dark:bg-info-400 dark:text-info-900",
			flat: "bg-info-300 text-info-700 dark:bg-info-700 dark:text-info-300",
			outlined:
				"text-info-600 outline-1 outline-info-600 dark:text-info-400 dark:outline-info-400 hover:bg-info-100 dark:hover:bg-info-800",
			text: "text-info-600 underline decoration-info-600 underline-offset-4 not-disabled:hover:text-info-700 not-disabled:hover:decoration-info-700 not-disabled:hover:decoration-2 dark:text-info-400 dark:decoration-info-400",
		},
	}

	const styleClasses = () => colorStyles[color]?.[variant] || ""

	const fullClassName = `${styleClasses()} ${baseClasses} ${className}`

	// El componente en sí
	if (href) {
		// Renderiza <a> si tiene href y no está disabled
		return (
			<a className={fullClassName} href={href} id={id} {...(props as any)}>
				{iconLeft}
				<span className="px-2">{children}</span>
				{iconRight}
			</a>
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
