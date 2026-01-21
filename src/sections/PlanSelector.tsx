import {IconCheck} from "@tabler/icons-react"
import ButtonGroup from "../components/ButtonGroup"
import Button from "../components/Button"
import type {PlanJSON} from "../types/db"

interface PlanSelectorProps {
	planes: PlanJSON[]
	currentPlanAnio: number
	onSelect: (anio: number) => void
}

export default function PlanSelector({planes, currentPlanAnio, onSelect}: PlanSelectorProps) {
	if (planes.length <= 1) return null

	return (
		<article className="flex flex-col gap-3 items-center justify-center">
			<span className="text-text-800 dark:text-text-200 texto-title">Elegir el plan de estudio:</span>
			<ButtonGroup>
				{planes.map((p) => (
					<Button
						key={p.id}
						onClick={() => onSelect(p.anioInicio)}
						variant={currentPlanAnio === p.anioInicio ? "solid" : "outlined"}
						iconRight={currentPlanAnio === p.anioInicio && <IconCheck />}>
						{p.anioInicio}
					</Button>
				))}
			</ButtonGroup>
		</article>
	)
}
