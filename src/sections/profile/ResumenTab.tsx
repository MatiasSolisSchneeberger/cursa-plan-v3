import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardAction,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
	IconCheckbox,
	IconBook2,
	IconChartBar,
	IconSchool,
	IconChevronRight,
} from "@tabler/icons-react";
import { useSimulador } from "@/context/SimuladorContextData";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { Avance, EstadoMateria } from "@/types/materiaTypes";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemHeader,
	ItemTitle,
} from "@/components/ui/item";
import { TypographyH4 } from "@/components/ui/Typography";
import { Link } from "react-router-dom";

interface AvancesCardProps {
	title: string;
	icon: React.ElementType;
	value: number;
	avances: Avance[];
	estado?: EstadoMateria;
	iconClassName?: string;
}

function AvancesCard({
	title,
	icon: Icon,
	value,
	avances,
	estado,
	iconClassName,
}: AvancesCardProps) {
	const [open, setOpen] = useState(false);

	const filteredAvances = estado
		? avances.filter(
				(a) => a.estado === estado && a.estado !== "Sin cursar",
			)
		: avances;

	return (
		<Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
			<DialogTrigger asChild>
				<Card className="hover:bg-muted/50 cursor-pointer transition-colors">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle>
							<TypographyH4>{title}</TypographyH4>
						</CardTitle>
						<CardAction
							className={buttonVariants({
								variant: "outline",
								size: "icon-lg",
							})}
						>
							<Icon className={`size-5 ${iconClassName || ""}`} />
						</CardAction>
					</CardHeader>
					<CardContent>{value}</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<TypographyH4>{title}</TypographyH4>
					</DialogTitle>
					<div className="max-h-[60vh] overflow-y-auto pr-2">
						<ItemGroup>
							{filteredAvances.length > 0 ? (
								filteredAvances.map((a) => (
									<Item
										key={a.materia_plan_id}
										className="text-sm"
										asChild
										variant="outline"
									>
										<Link
											to={`/carreras/${a.carrera_slug}/${a.carrera_plan}/${a.materia_slug}`}
										>
											<ItemContent>
												<ItemHeader>
													<ItemTitle>
														{a.materia_nombre ||
															"Materia desconocida"}
													</ItemTitle>
												</ItemHeader>
												<ItemDescription>
													{a.carrera_nombre ||
														"Carrera desconocida"}
												</ItemDescription>
											</ItemContent>
											<ItemActions className="flex items-center justify-center">
												<IconChevronRight />
											</ItemActions>
										</Link>
									</Item>
								))
							) : (
								<p className="text-muted-foreground text-sm">
									No hay materias para mostrar.
								</p>
							)}
						</ItemGroup>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default function ResumenTab() {
	const { avances } = useSimulador();

	const aprobadas = avances.filter((a) => a.estado === "Aprobado").length;
	const regulares = avances.filter((a) => a.estado === "Regular").length;
	const enCurso = avances.filter((a) => a.estado === "Cursando").length;
	const totales = avances.length;

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
			<AvancesCard
				title="Materias Aprobadas"
				icon={IconCheckbox}
				iconClassName="text-primary"
				value={aprobadas}
				avances={avances}
				estado="Aprobado"
			/>
			<AvancesCard
				title="Materias Regulares"
				icon={IconBook2}
				iconClassName="text-info"
				value={regulares}
				avances={avances}
				estado="Regular"
			/>
			<AvancesCard
				title="En Curso"
				icon={IconChartBar}
				iconClassName="text-warning"
				value={enCurso}
				avances={avances}
				estado="Cursando"
			/>
			<AvancesCard
				title="Total de Avances"
				icon={IconSchool}
				iconClassName="text-secondary"
				value={totales}
				avances={avances}
			/>
		</div>
	);
}
