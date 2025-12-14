import {useDropdown} from "./Dropdown"

export default function DropdownTrigger({children}: {children: React.ReactNode}) {
	const {toggle, open, triggerRef, anchorId} = useDropdown()

	return (
		<div
			ref={triggerRef}
			onClick={toggle}
			className=" cursor-pointer inline-flex w-full" // Agregué inline-flex para mejor comportamiento
			aria-expanded={open}
			style={
				{
					// Asignamos el nombre del ancla al elemento DOM
					anchorName: anchorId,
				} as React.CSSProperties
			}>
			{children}
		</div>
	)
}
