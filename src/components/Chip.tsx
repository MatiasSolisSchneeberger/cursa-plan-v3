import {IconCheck} from "@tabler/icons-react"
import {useState} from "react"
import {motion, AnimatePresence} from "framer-motion"

// Definimos los estilos en un objeto para limpiar el código
const COLOR_STYLES = {
	primary: {
		selected: "bg-primary-200 text-primary-800 outline-primary-600",
		default: "text-primary-600 outline-primary-600 hover:bg-primary-50",
	},
	secondary: {
		selected: "bg-secondary-200 text-secondary-800 outline-secondary-600",
		default: "text-secondary-600 outline-secondary-600 hover:bg-secondary-50",
	},
	tertiary: {
		selected: "bg-tertiary-200 text-tertiary-800 outline-tertiary-600",
		default: "text-tertiary-600 outline-tertiary-600 hover:bg-tertiary-50",
	},
	danger: {
		selected: "bg-danger-200 text-danger-800 outline-danger-600",
		default: "text-danger-600 outline-danger-600 hover:bg-danger-50",
	},
	warning: {
		selected: "bg-warning-200 text-warning-800 outline-warning-600",
		default: "text-warning-600 outline-warning-600 hover:bg-warning-50",
	},
	success: {
		selected: "bg-success-200 text-success-800 outline-success-600",
		default: "text-success-600 outline-success-600 hover:bg-success-50",
	},
	info: {
		selected: "bg-info-200 text-info-800 outline-info-600",
		default: "text-info-600 outline-info-600 hover:bg-info-50",
	},
}

export default function Chip({
	children,
	color = "primary",
	canSelected = false,
	iconLeft,
	iconRight,
}: {
	children: React.ReactNode
	color?: keyof typeof COLOR_STYLES
	canSelected?: boolean
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
}) {
	const [selected, setSelected] = useState(false)

	const handleSelect = () => {
		if (canSelected) setSelected(!selected)
	}

	const currentStyle = selected ? COLOR_STYLES[color].selected : COLOR_STYLES[color].default

	return (
		<motion.span
			layout // 1. Esto anima el cambio de ancho del contenedor
			onClick={handleSelect}
			initial={false}
			animate={{
				// Animamos suavemente el color de fondo y borde
				backgroundColor: selected ? "" : "transparent",
			}}
			transition={{type: "spring", stiffness: 500, damping: 30}}
			className={`
                relative flex w-max cursor-pointer items-center rounded-xl px-2 py-1 outline-1 select-none overflow-hidden
                ${currentStyle}
            `}>
			{/* Animamos el ícono izquierdo si existe */}
			{iconLeft && <span className="mr-1 flex items-center">{iconLeft}</span>}

			<motion.span layout="position" className="px-1 texto-label">
				{children}
			</motion.span>

			<span className="">
				<AnimatePresence mode="popLayout" initial={false}>
					{selected ? (
						<motion.span
							key="check"
							initial={{scale: 0, opacity: 0}}
							animate={{scale: 1, opacity: 1}}
							exit={{scale: 0, opacity: 0}}
							transition={{duration: 0.2}}>
							<IconCheck size={16} stroke={3} />
						</motion.span>
					) : (
						iconRight && (
							<motion.span
								key="icon-right"
								initial={{scale: 0, opacity: 0}}
								animate={{scale: 1, opacity: 1}}
								exit={{scale: 0, opacity: 0}}
								transition={{duration: 0.2}}>
								{iconRight}
							</motion.span>
						)
					)}
				</AnimatePresence>
			</span>
		</motion.span>
	)
}
