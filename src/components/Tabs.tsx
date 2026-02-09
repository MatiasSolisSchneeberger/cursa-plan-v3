import {createContext, useContext, useState, type ReactNode} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {cn} from "../utils/cn"
import Button, {type ButtonProps} from "./Button" // Reutilizamos tu Button existente

// --- 1. Contexto para compartir el estado entre componentes ---
interface TabsContextType {
	activeTab: string
	setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabs() {
	const context = useContext(TabsContext)
	if (!context) throw new Error("Tabs components must be used within a <Tabs> provider")
	return context
}

// --- 2. Componente Padre (Tabs) ---
interface TabsProps {
	defaultValue: string
	children: ReactNode
	className?: string
	/** Opcional: Para controlar el estado desde fuera (ej. URL) */
	value?: string
	onValueChange?: (value: string) => void
}

export function Tabs({defaultValue, children, className, value, onValueChange}: TabsProps) {
	// Si pasas 'value' y 'onValueChange', el componente es controlado (ej. por URL).
	// Si no, usa su propio estado interno.
	const [internalState, setInternalState] = useState(defaultValue)

	const activeTab = value ?? internalState
	const setActiveTab = onValueChange ?? setInternalState

	return (
		<TabsContext.Provider value={{activeTab, setActiveTab}}>
			<div className={cn("w-full flex flex-col gap-4", className)}>{children}</div>
		</TabsContext.Provider>
	)
}

// --- 3. Trigger (El botón individual) ---
interface TabsTriggerProps extends ButtonProps {
	value: string
	variants?: [NonNullable<ButtonProps["variant"]>, NonNullable<ButtonProps["variant"]>]
}

export function TabsTrigger({
	value,
	children,
	color = "primary",
	variants = ["solid", "flat"],
	className,
	...props
}: TabsTriggerProps) {
	const {activeTab, setActiveTab} = useTabs()
	const isActive = activeTab === value

	return (
		<Button
			variant={isActive ? variants[0] : variants[1]}
			color={color}
			onClick={() => setActiveTab(value)}
			className={cn("transition-all duration-200", className)}
			{...props}>
			{children}
		</Button>
	)
}

// --- 4. Content (El contenido que aparece/desaparece) ---
interface TabsContentProps {
	value: string
	children: ReactNode
	className?: string
}

export function TabsContent({value, children, className}: TabsContentProps) {
	const {activeTab} = useTabs()

	// Si no es el tab activo, no renderizamos nada (o null)
	if (activeTab !== value) return null

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={value}
				initial={{opacity: 0, y: 5}}
				animate={{opacity: 1, y: 0}}
				exit={{opacity: 0, y: -5}}
				transition={{duration: 0.2}}
				className={cn("w-full", className)}>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
