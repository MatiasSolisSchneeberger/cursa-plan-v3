import {useEffect, useLayoutEffect, useState} from "react"
import {useDropdown} from "./Dropdown"

export default function DropdownContent({children}: {children: React.ReactNode}) {
	const {open, close, triggerRef, contentRef} = useDropdown()
	const [styles, setStyles] = useState<React.CSSProperties>({})

	// Close on click outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				contentRef.current &&
				!contentRef.current.contains(event.target as Node) &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target as Node)
			) {
				close()
			}
		}

		if (open) {
			document.addEventListener("mousedown", handleClickOutside)
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [open, close, contentRef, triggerRef])

	// Calculate position to prevent overflow
	useLayoutEffect(() => {
		if (open && contentRef.current && triggerRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect()
			const contentRect = contentRef.current.getBoundingClientRect()
			const viewportWidth = window.innerWidth
			const viewportHeight = window.innerHeight

			const newStyles: React.CSSProperties = {
				position: "absolute",
				zIndex: 50,
				opacity: 1,
			}

			// Horizontal logic
			// Check if aligning left overflows the right edge
			// We check triggerRect.left + contentWidth vs viewportWidth
			if (triggerRect.left + contentRect.width > viewportWidth) {
				newStyles.right = 0
				newStyles.left = "auto"
			} else {
				newStyles.left = 0
				newStyles.right = "auto"
			}

			// Vertical logic
			const spaceBelow = viewportHeight - triggerRect.bottom
			const spaceAbove = triggerRect.top
			const requiredHeight = contentRect.height + 10 // buffer

			// Flip to top if not enough space below AND more space above
			if (spaceBelow < requiredHeight && spaceAbove > requiredHeight) {
				newStyles.bottom = "100%"
				newStyles.top = "auto"
				newStyles.marginBottom = "0.5rem"
				newStyles.marginTop = 0
			} else {
				newStyles.top = "100%"
				newStyles.bottom = "auto"
				newStyles.marginTop = "0.5rem"
				newStyles.marginBottom = 0
			}

			setStyles(newStyles)
		}
	}, [open])

	if (!open) return null

	return (
		<section
			onClick={close}
			ref={contentRef}
			className="dropdown-content absolute z-50 min-w-max"
			style={Object.keys(styles).length === 0 ? {opacity: 0} : styles}>
			<article className="py-1">{children}</article>
		</section>
	)
}
