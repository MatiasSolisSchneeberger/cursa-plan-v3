import { IconLoader2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	isLoading?: boolean;
	isIconOnly?: boolean;
	size?: "sm" | "md" | "lg";
	onClick?: () => void;
	target?: string;
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
	isLoading = false,
	isIconOnly = false,
	size = "md",
	onClick,
	target = "_self",
	...props
}: ButtonProps) {
	// 2. Lógica para generar las clases CSS
	const sizeStyles = {
		sm: cn("h-8", isIconOnly && "size-8"),
		md: cn("h-10", isIconOnly && "size-10"),
		lg: cn("h-12", isIconOnly && "size-12"),
	};

	const colorStyles = {
		primary: {
			solid: "bg-primary-600 text-primary-100 dark:bg-primary-400 dark:text-primary-900",
			flat: "bg-primary-300 text-primary-700 dark:bg-primary-700 dark:text-primary-300",
			outlined:
				"text-primary-600 border-2 border-primary-600 dark:text-primary-400 dark:border-primary-400 not-disabled:hover:bg-primary-100 not-disabled:dark:hover:bg-primary-800",
			text: "text-primary-600 not-disabled:hover:text-primary-700 not-disabled:hover:bg-primary-100 dark:text-primary-400 not-disabled:dark:hover:text-primary-300 not-disabled:dark:hover:bg-primary-900",
		},
		secondary: {
			solid: "bg-secondary-600 text-secondary-100 dark:bg-secondary-400 dark:text-secondary-900",
			flat: "bg-secondary-300 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300",
			outlined:
				"text-secondary-600 border-2 border-secondary-600 dark:text-secondary-400 dark:border-secondary-400 not-disabled:hover:bg-secondary-100 not-disabled:dark:hover:bg-secondary-800",
			text: "text-secondary-600 not-disabled:hover:text-secondary-700 not-disabled:hover:bg-secondary-100 dark:text-secondary-400 not-disabled:dark:hover:text-secondary-300 not-disabled:dark:hover:bg-secondary-900",
		},
		tertiary: {
			solid: "bg-tertiary-600 text-tertiary-100 dark:bg-tertiary-400 dark:text-tertiary-900",
			flat: "bg-tertiary-300 text-tertiary-700 dark:bg-tertiary-700 dark:text-tertiary-300",
			outlined:
				"text-tertiary-600 border-2 border-tertiary-600 dark:text-tertiary-400 dark:border-tertiary-400 not-disabled:hover:bg-tertiary-100 not-disabled:dark:hover:bg-tertiary-800",
			text: "text-tertiary-600 not-disabled:hover:text-tertiary-700 not-disabled:hover:bg-tertiary-100 dark:text-tertiary-400 not-disabled:dark:hover:text-tertiary-300 not-disabled:dark:hover:bg-tertiary-900",
		},
		success: {
			solid: "bg-success-600 text-success-100 dark:bg-success-400 dark:text-success-900",
			flat: "bg-success-300 text-success-700 dark:bg-success-700 dark:text-success-300",
			outlined:
				"text-success-600 border-2 border-success-600 dark:text-success-400 dark:border-success-400 not-disabled:hover:bg-success-100 not-disabled:dark:hover:bg-success-800",
			text: "text-success-600 not-disabled:hover:text-success-700 not-disabled:hover:bg-success-100 dark:text-success-400 not-disabled:dark:hover:text-success-300 not-disabled:dark:hover:bg-success-900",
		},
		danger: {
			solid: "bg-danger-600 text-danger-100 dark:bg-danger-400 dark:text-danger-900",
			flat: "bg-danger-300 text-danger-700 dark:bg-danger-700 dark:text-danger-300",
			outlined:
				"text-danger-600 border-2 border-danger-600 dark:text-danger-400 dark:border-danger-400 not-disabled:hover:bg-danger-100 not-disabled:dark:hover:bg-danger-800",
			text: "text-danger-600 not-disabled:hover:text-danger-700 not-disabled:hover:bg-danger-100 dark:text-danger-400 not-disabled:dark:hover:text-danger-300 not-disabled:dark:hover:bg-danger-900",
		},
		warning: {
			solid: "bg-warning-600 text-warning-100 dark:bg-warning-400 dark:text-warning-900",
			flat: "bg-warning-300 text-warning-700 dark:bg-warning-700 dark:text-warning-300",
			outlined:
				"text-warning-600 border-2 border-warning-600 dark:text-warning-400 dark:border-warning-400 not-disabled:hover:bg-warning-100 not-disabled:dark:hover:bg-warning-800",
			text: "text-warning-600 not-disabled:hover:text-warning-700 not-disabled:hover:bg-warning-100 dark:text-warning-400 not-disabled:dark:hover:text-warning-300 not-disabled:dark:hover:bg-warning-900",
		},
		info: {
			solid: "bg-info-600 text-info-100 dark:bg-info-400 dark:text-info-900",
			flat: "bg-info-300 text-info-700 dark:bg-info-700 dark:text-info-300",
			outlined:
				"text-info-600 border-2 border-info-600 dark:text-info-400 dark:border-info-400 not-disabled:hover:bg-info-100 not-disabled:dark:hover:bg-info-800",
			text: "text-info-600 not-disabled:hover:text-info-700 not-disabled:hover:bg-info-100 dark:text-info-400 not-disabled:dark:hover:text-info-300 not-disabled:dark:hover:bg-info-900",
		},
	};

	const styleClasses = () => colorStyles[color]?.[variant] || "";
	const sizeClasses = () => sizeStyles[size] || "";

	const buttonClasses = cn(
		"texto-label relative transition-all flex flex-row items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-text-700 dark:focus-visible:outline-text-300 focus-visible:outline-offset-2 not-disabled:active:scale-95 ease-in-out not-disabled:hover:shadow-sm",
		styleClasses(),
		sizeClasses(),
		className,
		disabled && "opacity-50 cursor-not-allowed",
		!isIconOnly && "px-3",
		isIconOnly && "aspect-square",
	);

	if (href) {
		return (
			<Link
				onClick={() => {
					window.scrollTo({ top: 0, behavior: "smooth" });
					if (onClick) onClick();
				}}
				className={buttonClasses}
				to={href}
				id={id}
				target={target}
			>
				{iconLeft}
				<span className="px-2">{children}</span>
				{iconRight}
			</Link>
		);
	}

	return (
		<button
			className={buttonClasses}
			onClick={onClick}
			disabled={disabled}
			id={id}
			{...props}
		>
			<span className="pr-2">
				{isLoading ? <IconLoader2 /> : iconLeft}
			</span>
			<span>{children}</span>
			<span className="pl-2">{iconRight}</span>
		</button>
	);
}
