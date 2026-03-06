import { Label } from "@/components/ui/label";
import type { PlanJSON } from "../types/db";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconInfoCircle } from "@tabler/icons-react";

interface OrientacionSelectorProps {
	plan: PlanJSON;
	currentOrientacionSlug: string | null;
	onSelect: (slug: string) => void;
	showTitle?: boolean;
	className?: string;
}

export default function OrientacionSelector({
	plan,
	currentOrientacionSlug,
	onSelect,
	showTitle = true,
	className = "",
}: OrientacionSelectorProps) {
	if (!plan.listaOrientaciones || plan.listaOrientaciones.length === 0)
		return null;

	// Calculate which years contain subjects that have an orientation
	const yearsWithOrientaciones = Array.from(
		new Set(
			plan.anios
				.filter((anioData) =>
					anioData.periodos.some((periodo) =>
						periodo.materias.some((materia) => materia.orientacion),
					),
				)
				.map((anioData) => anioData.anio),
		),
	).sort((a, b) => a - b);

	const yearsText =
		yearsWithOrientaciones.length > 0
			? yearsWithOrientaciones.length > 1
				? `${yearsWithOrientaciones.slice(0, -1).join(", ")} y ${yearsWithOrientaciones[yearsWithOrientaciones.length - 1]}`
				: yearsWithOrientaciones[0].toString()
			: "";

	return (
		<article
			className={`flex items-center justify-center gap-3 ${showTitle ? "flex-col" : "flex-row"} ${className}`}
		>
			<Select
				value={currentOrientacionSlug || "todas"}
				onValueChange={(val) => onSelect(val === "todas" ? "" : val)}
			>
				{yearsWithOrientaciones.length > 0 && (
					<Tooltip>
						<TooltipTrigger asChild>
							<span className="flex items-center gap-1">
								<Label>Orientación</Label>
								<IconInfoCircle className="text-muted-foreground size-4" />
							</span>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								Las orientaciones se reflejan en las materias de
								{yearsWithOrientaciones.length > 1
									? " los años "
									: "l año "}
								<span className="font-semibold">
									{yearsText}
								</span>
							</p>
						</TooltipContent>
					</Tooltip>
				)}
				{yearsWithOrientaciones.length === 0 && (
					<Label>Orientación</Label>
				)}
				<SelectTrigger className="w-full max-w-48">
					<SelectValue placeholder="Seleccionar orientación" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Orientaciones</SelectLabel>
						<SelectItem value="todas">
							Todas las orientaciones
						</SelectItem>
						<SelectSeparator />
						{plan.listaOrientaciones.map((ori) => (
							<SelectItem key={ori.id} value={ori.slug}>
								{ori.nombre}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</article>
	);
}
