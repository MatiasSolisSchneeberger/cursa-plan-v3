import {IconCheck} from "@tabler/icons-react"
import {motion, AnimatePresence} from "framer-motion"

// Definimos los estilos en un objeto para limpiar el código
const COLOR_STYLES = {
	primary: {
		selected:
			"bg-primary-200 text-primary-800 outline-primary-600 dark:bg-primary-950 dark:text-primary-50 dark:outline-primary-400",
		default:
			"text-primary-600 outline-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:outline-primary-400 dark:hover:bg-primary-800",
	},
	secondary: {
		selected:
			"bg-secondary-200 text-secondary-800 outline-secondary-600 dark:bg-secondary-950 dark:text-secondary-50 dark:outline-secondary-400",
		default:
			"text-secondary-600 outline-secondary-600 hover:bg-secondary-50 dark:text-secondary-400 dark:outline-secondary-400 dark:hover:bg-secondary-800",
	},
	tertiary: {
		selected:
			"bg-tertiary-200 text-tertiary-800 outline-tertiary-600 dark:bg-tertiary-950 dark:text-tertiary-50 dark:outline-tertiary-400",
		default:
			"text-tertiary-600 outline-tertiary-600 hover:bg-tertiary-50 dark:text-tertiary-400 dark:outline-tertiary-400 dark:hover:bg-tertiary-800",
	},
	danger: {
		selected:
			"bg-danger-200 text-danger-800 outline-danger-600 dark:bg-danger-950 dark:text-danger-50 dark:outline-danger-400",
		default:
			"text-danger-600 outline-danger-600 hover:bg-danger-50 dark:text-danger-400 dark:outline-danger-400 dark:hover:bg-danger-800",
	},
	warning: {
		selected:
			"bg-warning-200 text-warning-800 outline-warning-600 dark:bg-warning-950 dark:text-warning-50 dark:outline-warning-400",
		default:
			"text-warning-600 outline-warning-600 hover:bg-warning-50 dark:text-warning-400 dark:outline-warning-400 dark:hover:bg-warning-800",
	},
	success: {
		selected:
			"bg-success-200 text-success-800 outline-success-600 dark:bg-success-950 dark:text-success-50 dark:outline-success-400",
		default:
			"text-success-600 outline-success-600 hover:bg-success-50 dark:text-success-400 dark:outline-success-400 dark:hover:bg-success-800",
	},
	info: {
		selected: "bg-info-200 text-info-800 outline-info-600 dark:bg-info-950 dark:text-info-50 dark:outline-info-400",
		default:
			"text-info-600 outline-info-600 hover:bg-info-50 dark:text-info-400 dark:outline-info-400 dark:hover:bg-info-800",
	},
}

export default function Chip({
	children,
	color = "primary",
	canSelected = false,
	iconLeft,
	iconRight,
	className,
	onClick = () => {},
	selected,
	disabled,
	title,
}: {
	children: React.ReactNode
	color?: keyof typeof COLOR_STYLES
	canSelected?: boolean
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	className?: string
	selected?: boolean
	onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
	disabled?: boolean
	title?: string
}) {
	const currentStyle = selected ? COLOR_STYLES[color].selected : COLOR_STYLES[color].default

	return (
		<motion.span
			layout // 1. Esto anima el cambio de ancho del contenedor
			onClick={onClick}
			initial={false}
			animate={{
				// Animamos suavemente el color de fondo y borde
				backgroundColor: selected ? "" : "transparent",
			}}
			transition={{type: "spring", stiffness: 500, damping: 30}}
			className={`
                relative flex w-max ${
									canSelected ? "cursor-pointer" : "cursor-default"
								} items-center rounded-xl px-2 py-1 outline-1 select-none overflow-hidden
                ${currentStyle}
                ${className}
                ${disabled ? "cursor-not-allowed opacity-50" : ""}
            `}
			title={title}>
			{/* Animamos el ícono izquierdo si existe */}
			{iconLeft && <span className="mr-1 flex items-center">{iconLeft}</span>}

			<motion.span layout="position" className="px-1 texto-label">
				{children}
			</motion.span>

			<span className="">
				<AnimatePresence mode="popLayout" initial={false}>
					{selected ?
						<motion.span
							key="check"
							initial={{scale: 0, opacity: 0}}
							animate={{scale: 1, opacity: 1}}
							exit={{scale: 0, opacity: 0}}
							transition={{duration: 0.2}}>
							<IconCheck size={16} stroke={3} />
						</motion.span>
					:	iconRight && (
							<motion.span
								key="icon-right"
								initial={{scale: 0, opacity: 0}}
								animate={{scale: 1, opacity: 1}}
								exit={{scale: 0, opacity: 0}}
								transition={{duration: 0.2}}>
								{iconRight}
							</motion.span>
						)
					}
				</AnimatePresence>
			</span>
		</motion.span>
	)
}
