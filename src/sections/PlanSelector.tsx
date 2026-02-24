import { IconCheck } from "@tabler/icons-react";
import ButtonGroup from "../components/ButtonGroup";
import Button from "../components/Button";
import type { PlanJSON } from "../types/db";

interface PlanSelectorProps {
	planes: PlanJSON[];
	currentPlanAnio: number;
	onSelect: (anio: number) => void;
	showTitle?: boolean;
	className?: string;
}

export default function PlanSelector({
	planes,
	currentPlanAnio,
	onSelect,
	showTitle = true,
	className = "",
}: PlanSelectorProps) {
	if (planes.length <= 1) return null;

	return (
		<article className={`flex justify-center gap-1 ${className}`}>
			{showTitle && (
				<span className="text-text-800 dark:text-text-200 texto-body">
					Elegir plan:
				</span>
			)}
			<ButtonGroup>
				{planes.map((p) => (
					<Button
						key={p.id}
						color="tertiary"
						onClick={() => onSelect(p.anioInicio)}
						variant={
							currentPlanAnio === p.anioInicio
								? "flat"
								: "outlined"
						}
						iconRight={
							currentPlanAnio === p.anioInicio && <IconCheck />
						}
					>
						{p.anioInicio}
					</Button>
				))}
			</ButtonGroup>
		</article>
	);
}
