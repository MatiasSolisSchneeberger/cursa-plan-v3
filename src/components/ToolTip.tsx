import type {ReactNode} from "react"
import {useState, useRef} from "react"
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	arrow,
	useHover,
	useFocus,
	useDismiss,
	useRole,
	useInteractions,
	FloatingPortal,
	FloatingArrow,
} from "@floating-ui/react"
import {AnimatePresence, motion} from "framer-motion"

export default function ToolTip({children, tooltip}: {children: ReactNode; tooltip: ReactNode}) {
	const [isOpen, setIsOpen] = useState(false)
	const arrowRef = useRef(null)

	const {x, y, strategy, refs, context} = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [offset(10), flip(), shift({padding: 5}), arrow({element: arrowRef})],
		whileElementsMounted: autoUpdate,
	})

	const hover = useHover(context, {move: false})
	const focus = useFocus(context)
	const dismiss = useDismiss(context)
	const role = useRole(context, {role: "tooltip"})

	const {getReferenceProps, getFloatingProps} = useInteractions([hover, focus, dismiss, role])

	return (
		<>
			<div ref={refs.setReference} {...getReferenceProps()} className="inline-block relative">
				{children}
			</div>
			<FloatingPortal>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							ref={refs.setFloating}
							style={{
								position: strategy,
								top: y ?? 0,
								left: x ?? 0,
							}}
							{...getFloatingProps()}
							initial={{opacity: 0, scale: 0.95, y: 5}}
							animate={{opacity: 1, scale: 1, y: 0}}
							exit={{opacity: 0, scale: 0.95, y: 5}}
							transition={{duration: 0.2, ease: "easeOut"}}
							className="z-50 bg-background-900 text-text-100 px-3 py-2 rounded-md shadow-lg max-w-xs text-sm">
							{tooltip}
							<FloatingArrow ref={arrowRef} context={context} className="fill-background-900" />
						</motion.div>
					)}
				</AnimatePresence>
			</FloatingPortal>
		</>
	)
}
