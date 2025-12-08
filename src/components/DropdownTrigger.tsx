import {useDropdown} from "./Dropdown"

export default function DropdownTrigger({children}: {children: React.ReactNode}) {
	const {toggle, open} = useDropdown()

	return (
		<div onClick={toggle} className="cursor-pointer" aria-expanded={open}>
			{children}
		</div>
	)
}
