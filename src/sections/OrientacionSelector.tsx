import {IconCheck, IconChevronDown} from "@tabler/icons-react"
import Button from "../components/Button"
import Dropdown from "../components/Dropdown"
import DropdownTrigger from "../components/DropdownTrigger"
import DropdownContent from "../components/DropdownContent"
import Menu from "../components/Menu"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"
import type {PlanJSON} from "../types/db"

interface OrientacionSelectorProps {
	plan: PlanJSON
	currentOrientacionSlug: string | null
	onSelect: (slug: string) => void
	showTitle?: boolean
	className?: string
}

export default function OrientacionSelector({
	plan,
	currentOrientacionSlug,
	onSelect,
	showTitle = true,
	className = "",
}: OrientacionSelectorProps) {
	if (!plan.listaOrientaciones || plan.listaOrientaciones.length === 0) return null

	const currentOrientacionName =
		plan.listaOrientaciones.find((ori) => ori.slug === currentOrientacionSlug)?.nombre || "Todas las orientaciones"

	return (
		<article className={`flex gap-3 items-center justify-center ${showTitle ? "flex-col" : "flex-row"} ${className}`}>
			{showTitle && <span className="text-text-800 dark:text-text-200 texto-title">Elegir la orientación:</span>}
			<Dropdown>
				<DropdownTrigger>
					<Button variant="outlined" color="secondary" iconRight={<IconChevronDown />}>
						{currentOrientacionName}
					</Button>
				</DropdownTrigger>
				<DropdownContent>
					<Menu>
						<MenuGroup>
							<MenuItem
								onClick={() => onSelect("")}
								canHover
								iconRight={
									!currentOrientacionSlug ? <IconCheck className="text-success-400 dark:text-success-600" /> : null
								}>
								Todas las orientaciones
							</MenuItem>
						</MenuGroup>
						<MenuGroup title="Orientaciones">
							{plan.listaOrientaciones.map((ori) => (
								<MenuItem
									key={ori.id}
									isActive={ori.slug === currentOrientacionSlug}
									onClick={() => onSelect(ori.slug)}
									// Alternatively we could use href if we wanted direct links,
									// but preserving the onSelect callback pattern for consistency
									iconRight={
										ori.slug === currentOrientacionSlug ?
											<IconCheck className="text-success-400 dark:text-success-600" />
										:	null
									}>
									{ori.nombre}
								</MenuItem>
							))}
						</MenuGroup>
					</Menu>
				</DropdownContent>
			</Dropdown>
		</article>
	)
}
