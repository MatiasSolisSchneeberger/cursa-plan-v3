import {createContext, useContext, useState, useId, Dispatch, SetStateAction} from "react"
import type {ReactNode} from "react"
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useClick,
	useDismiss,
	useRole,
	useInteractions,
	Placement,
	Strategy,
} from "@floating-ui/react"

interface DropdownContextType {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	toggle: () => void
	close: () => void
	x: number | null
	y: number | null
	strategy: Strategy
	refs: {
		setReference: (node: ReferenceElement | null) => void
		setFloating: (node: FloatingElement | null) => void
	}
	context: any // Floating context
	getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>
	getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>
	anchorId: string
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

export function useDropdown() {
	const context = useContext(DropdownContext)
	if (!context) {
		throw new Error("useDropdown must be used within a Dropdown")
	}
	return context
}

interface DropdownProps {
	children: ReactNode
	className?: string
	placement?: Placement
}

export default function Dropdown({
	children,
	className,
	placement = "bottom-start", // Default alignment
}: DropdownProps) {
	const [open, setOpen] = useState(false)
	const id = useId()
	const anchorId = `--dropdown-${id.replace(/:/g, "")}`

	const {x, y, strategy, refs, context} = useFloating({
		open,
		onOpenChange: setOpen,
		middleware: [offset(4), flip(), shift({padding: 5})],
		placement,
		whileElementsMounted: autoUpdate,
	})

	const click = useClick(context)
	const dismiss = useDismiss(context)
	const role = useRole(context)

	const {getReferenceProps, getFloatingProps} = useInteractions([click, dismiss, role])

	const toggle = () => setOpen((prev) => !prev)
	const close = () => setOpen(false)

	return (
		<DropdownContext.Provider
			value={{
				open,
				setOpen,
				toggle,
				close,
				x,
				y,
				strategy,
				refs,
				context,
				getReferenceProps,
				getFloatingProps,
				anchorId,
			}}>
			<div className={`relative inline-block text-left ${className}`}>{children}</div>
		</DropdownContext.Provider>
	)
}

// Helper types for local usage if needed, though they are imported from floating-ui
type ReferenceElement = Element
type FloatingElement = HTMLElement
