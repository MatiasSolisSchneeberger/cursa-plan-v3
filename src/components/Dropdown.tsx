import {createContext, useContext, useState} from "react"

// 1. Contexto
interface DropdownContextType {
	open: boolean
	toggle: () => void
	close: () => void //para cerrar haciendo clik fuera
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

	const toggle = () => setOpen((prev) => !prev)
	const close = () => setOpen(false)
	// 4. Proveemos el estado a los hijos
	return <DropdownContext.Provider value={{open, toggle, close}}>{children}</DropdownContext.Provider>
}
