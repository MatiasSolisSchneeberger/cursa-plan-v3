import {useState, useRef, useEffect} from "react"
import {IconCheck, IconChevronDown} from "@tabler/icons-react"
import Menu from "./Menu"
import MenuItem from "./MenuItem"
import {cn} from "../utils/cn"
import MenuGroup from "./MenuGroup"

interface Option {
	value: string
	label: string
	icon?: React.ReactNode
}

interface GroupOption {
	title: string
	options: Option[]
}

interface SelectProps {
	label: string
	groupOptions: GroupOption[]
	value: string
	onChange: (value: string) => void
	placeholder?: string
	required?: boolean
	disabled?: boolean
	className?: string
}

export default function Select({
	label,
	groupOptions,
	value,
	onChange,
	placeholder = "Selecciona una opción",
	required = false,
	disabled = false,
	className,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const selectedOption = groupOptions.flatMap((group) => group.options).find((opt) => opt.value === value)

	// Cerrar al hacer click fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const handleSelect = (optionValue: string) => {
		onChange(optionValue) // Pasamos el valor al padre
		setIsOpen(false) // Cerramos el menú
	}

	return (
		<div className={cn("flex flex-col gap-1 relative", className)} ref={containerRef}>
			<label className="texto-body text-text-800 dark:text-text-200 font-medium ml-1">
				{label}
				{required && <span className="text-danger-600 dark:text-danger-400 ml-1">*</span>}
			</label>

			{/* TRIGGER: Botón que parece un Input */}
			<button
				type="button" // IMPORTANTE: Evita que envíe formularios
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				className={cn(
					"relative w-full text-left flex items-center justify-between",
					"p-3 rounded-xl min-h-11",
					"border-2 transition-all duration-200",
					"bg-background-100 dark:bg-background-900",

					// Estados interactivos
					isOpen ?
						"border-primary-600 ring-2 ring-primary-500/20"
					:	"border-background-200 dark:border-background-700 hover:border-primary-400 dark:hover:border-primary-600",

					disabled && "opacity-50 cursor-not-allowed text-text-400",
				)}>
				<span
					className={cn(
						"texto-label block truncate pr-8", // pr-8 para no pisar el icono
						!selectedOption ? "text-text-600 dark:text-text-400" : "text-text-900 dark:text-text-100",
					)}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>

				<IconChevronDown
					size={18}
					className={cn("text-text-500 absolute right-3 transition-transform duration-300", isOpen && "rotate-180")}
				/>
			</button>

			{/* DROPDOWN MENU */}
			{/* Usamos absolute y z-index alto para que flote sobre otros elementos */}
			{isOpen && (
				<Menu className="w-full absolute top-full left-0 mt-2 z-50 custom-scrollbar border border-background-200 dark:border-background-700">
					{groupOptions.map((group) => (
						<MenuGroup title={group.title}>
							{group.options.map((option) => (
								<MenuItem
									key={option.value}
									onClick={() => handleSelect(option.value)}
									canHover
									iconRight={
										value === option.value ?
											<IconCheck className="text-success-600 dark:text-success-400" />
										:	option.icon
									}
									className={cn("justify-between", value === option.value ? "bg-success-100 dark:bg-success-900" : "")}>
									{option.label}
								</MenuItem>
							))}

							{group.options.length === 0 && <MenuItem>No hay opciones disponibles</MenuItem>}
						</MenuGroup>
					))}
				</Menu>
			)}
		</div>
	)
}
