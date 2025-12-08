import {createContext, useContext, useState, useRef, useId} from "react"
import type {RefObject} from "react"

// 1. Contexto
interface DropdownContextType {
	open: boolean
	toggle: () => void
	close: () => void
	triggerRef: RefObject<HTMLDivElement | null>
	contentRef: RefObject<HTMLDivElement | null>
	anchorId: string
}

// 2. Contexto (inicia en null o undefined)
const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

// 3. Hook personalizado
export function useDropdown() {
	const context = useContext(DropdownContext)
	if (!context) {
		throw new Error("useDropdown must be used within a Dropdown")
	}
	return context
}

export default function Dropdown({children}: {children: React.ReactNode}) {
	const [open, setOpen] = useState(false)
	const triggerRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const id = useId()
	const anchorId = `--dropdown-${id.replace(/:/g, "")}` // Clean ID for CSS variable usage

	const toggle = () => setOpen((prev) => !prev)
	const close = () => setOpen(false)

	// 4. Proveemos el estado a los hijos
	return (
		<DropdownContext.Provider value={{open, toggle, close, triggerRef, contentRef, anchorId}}>
			<div className="relative inline-block text-left">{children}</div>
		</DropdownContext.Provider>
	)
}
