import {useDropdown} from "./Dropdown"

export default function DropdownContent({children}: {children: React.ReactNode}) {
	const {open} = useDropdown()

	if (!open) return null

	return (
		<div className="absolute right-0 mt-2 w-56 origin-top-right z-50">
			<div className="py-1">{children}</div>
		</div>
	)
}
