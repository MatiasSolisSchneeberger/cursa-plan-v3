import { useDropdown } from "@/components/Dropdown";
import { type ReactNode } from "react";

export default function DropdownTrigger({ children }: { children: ReactNode }) {
	const { refs, getReferenceProps, open, anchorId } = useDropdown();

	// If children is a single valid element, we can clone it to pass refs and props directly
	// avoiding an extra wrapper div if preferred. However, sticking to the wrapper
	// ensures consistency and avoids issues if children is a fragment or string.
	// The previous implementation used a wrapper div, so I'll keep it but attach refs properly.

	return (
		<div
			ref={refs.setReference}
			{...getReferenceProps()}
			data-state={open ? "open" : "closed"}
			style={
				{
					anchorName: anchorId, // Keep for potential future usage or fallback
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	);
}
