import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "solid" | "flat" | "outlined" | "text";
	color?:
		| "primary"
		| "secondary"
		| "tertiary"
		| "success"
		| "danger"
		| "warning"
		| "info";
	href?: string;
	size?: 32 | 40 | 48;
}

/**
 * Componente ButtonIcon
 * Basado en Button pero diseñado para mostrar solo un icono.
 * Soporta tamaños fijos: 32px, 40px, 48px.
 */
export default function ButtonIcon({
	variant = "solid",
	color = "primary",
	href,
	disabled = false,
	id,
	className = "",
	children,
	size = 40,
	...props
}: ButtonIconProps) {
	// Mapeo de tamaños a clases de Tailwind
	// 32px -> w-8 h-8
	// 40px -> w-10 h-10
	// 48px -> w-12 h-12
	const sizeClasses = {
		32: "w-8 h-8 text-lg", // text-lg suele ser buen tamaño para iconos en botones de 32px
		40: "w-10 h-10 text-xl",
		48: "w-12 h-12 text-2xl",
	};

	const baseClasses =
		"relative flex flex-row items-center justify-center gap-0 rounded-xl p-2 text-nowrap transition-all duration-150 ease-in-out select-none not-disabled:hover:rounded-2xl not-disabled:hover:shadow-md not-disabled:focus:outline-2 not-disabled:focus:outline-offset-2 not-disabled:focus:outline-background-900 not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-65 dark:not-disabled:focus:outline-background-200 ";

	const colorStyles = {
		primary: {
			solid: "bg-primary-600 text-primary-100 dark:bg-primary-400 dark:text-primary-900",
			flat: "bg-primary-300 text-primary-700 dark:bg-primary-700 dark:text-primary-300",
			outlined:
				"text-primary-600 border-2 border-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800",
			text: "text-primary-600 not-disabled:hover:text-primary-700 not-disabled:hover:bg-primary-100 dark:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-primary-900",
		},
		secondary: {
			solid: "bg-secondary-600 text-secondary-100 dark:bg-secondary-400 dark:text-secondary-900",
			flat: "bg-secondary-300 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300",
			outlined:
				"text-secondary-600 border-2 border-secondary-600 dark:text-secondary-400 dark:border-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800",
			text: "text-secondary-600 not-disabled:hover:text-secondary-700 not-disabled:hover:bg-secondary-100 dark:text-secondary-400 dark:hover:text-secondary-300 dark:hover:bg-secondary-900",
		},
		tertiary: {
			solid: "bg-tertiary-600 text-tertiary-100 dark:bg-tertiary-400 dark:text-tertiary-900",
			flat: "bg-tertiary-300 text-tertiary-700 dark:bg-tertiary-700 dark:text-tertiary-300",
			outlined:
				"text-tertiary-600 border-2 border-tertiary-600 dark:text-tertiary-400 dark:border-tertiary-400 hover:bg-tertiary-100 dark:hover:bg-tertiary-800",
			text: "text-tertiary-600 not-disabled:hover:text-tertiary-700 not-disabled:hover:bg-tertiary-100 dark:text-tertiary-400 dark:hover:text-tertiary-300 dark:hover:bg-tertiary-900",
		},
		success: {
			solid: "bg-success-600 text-success-100 dark:bg-success-400 dark:text-success-900",
			flat: "bg-success-300 text-success-700 dark:bg-success-700 dark:text-success-300",
			outlined:
				"text-success-600 border-2 border-success-600 dark:text-success-400 dark:border-success-400 hover:bg-success-100 dark:hover:bg-success-800",
			text: "text-success-600 not-disabled:hover:text-success-700 not-disabled:hover:bg-success-100 dark:text-success-400 dark:hover:text-success-300 dark:hover:bg-success-900",
		},
		danger: {
			solid: "bg-danger-600 text-danger-100 dark:bg-danger-400 dark:text-danger-900",
			flat: "bg-danger-300 text-danger-700 dark:bg-danger-700 dark:text-danger-300",
			outlined:
				"text-danger-600 border-2 border-danger-600 dark:text-danger-400 dark:border-danger-400 hover:bg-danger-100 dark:hover:bg-danger-800",
			text: "text-danger-600 not-disabled:hover:text-danger-700 not-disabled:hover:bg-danger-100 dark:text-danger-400 dark:hover:text-danger-300 dark:hover:bg-danger-900",
		},
		warning: {
			solid: "bg-warning-600 text-warning-100 dark:bg-warning-400 dark:text-warning-900",
			flat: "bg-warning-300 text-warning-700 dark:bg-warning-700 dark:text-warning-300",
			outlined:
				"text-warning-600 border-2 border-warning-600 dark:text-warning-400 dark:border-warning-400 hover:bg-warning-100 dark:hover:bg-warning-800",
			text: "text-warning-600 not-disabled:hover:text-warning-700 not-disabled:hover:bg-warning-100 dark:text-warning-400 dark:hover:text-warning-300 dark:hover:bg-warning-900",
		},
		info: {
			solid: "bg-info-600 text-info-100 dark:bg-info-400 dark:text-info-900",
			flat: "bg-info-300 text-info-700 dark:bg-info-700 dark:text-info-300",
			outlined:
				"text-info-600 border-2 border-info-600 dark:text-info-400 dark:border-info-400 hover:bg-info-100 dark:hover:bg-info-800",
			text: "text-info-600 not-disabled:hover:text-info-700 not-disabled:hover:bg-info-100 dark:text-info-400 dark:hover:text-info-300 dark:hover:bg-info-900",
		},
	};

	const styleClasses = () => colorStyles[color]?.[variant] || "";

	const currentSizeClass = sizeClasses[size] || sizeClasses[40];

	const fullClassName = cn(
		styleClasses(),
		baseClasses,
		currentSizeClass,
		className,
	);

	if (href) {
		return (
			<Link
				className={fullClassName}
				to={href}
				id={id}
				{...(props as any)}
			>
				{children}
			</Link>
		);
	} else {
		return (
			<button
				className={fullClassName}
				disabled={disabled}
				id={id}
				{...props}
			>
				{children}
			</button>
		);
	}
}
