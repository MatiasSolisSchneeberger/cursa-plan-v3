// --- react ---
import { Link } from "react-router-dom";
import { useState } from "react";

// --- types ---
import type { MateriaJSON } from "@/types/db";
import type { EstadoMateria } from "@/types/materiaTypes";

// --- context ---
import { useSimulador } from "@/context/SimuladorContextData";

// --- scripts ---
import { getMateriaAvailability } from "@/scripts/materiaUtils";
import { ListadoRequisitos } from "@/components/ListadoRequisitos";

// UI
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH3, TypographySmall } from "@/components/ui/Typography";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// --- Iconos ---
import {
	IconArrowRight,
	IconChevronDown,
	IconCircleCheck,
	IconCircleDashed,
	IconCircleDashedCheck,
	IconCircleX,
	IconGitBranch,
	IconHourglass,
	IconLock,
	IconLockOpen,
} from "@tabler/icons-react";

// --- Interfaz ---
interface CardMateriaProps {
	materia: MateriaJSON;
	carreraSlug: string;
	planAnio: number;
}

// --- Sub Componente ---
function BadgeEstado({ estado }: { estado: string }) {
	switch (estado) {
		case "Desbloqueado":
			return (
				<Badge
					variant="outline"
					className="text-success border-success select-none"
				>
					<IconCircleCheck />
					Disponible
				</Badge>
			);
		case "Bloqueado":
			return (
				<Badge
					variant="outline"
					className="text-destructive border-destructive select-none"
				>
					<IconLock />
					No disponible
				</Badge>
			);
		case "Solo Cursar":
			return (
				<Badge
					variant="outline"
					className="text-warning border-warning select-none"
				>
					<IconLockOpen />
					Solo Cursar
				</Badge>
			);
		default:
			return null;
	}
}

/**
 * Componente que muestra una tarjeta con la información de una materia.
 * Contiene un badge que indica el estado de la materia,
 * un collapsible que muestra los requisitos para cursar y rendir la materia,
 * un select para actualizar el estado de la materia (regular, aprobado, etc...)
 * y un botón para ir a la pagina de la materia
 * @param materia - Materia a mostrar
 * @param carreraSlug - Slug de la carrera
 * @param planAnio - Anio del plan
 */
export default function CardMateria({
	materia,
	carreraSlug,
	planAnio,
}: CardMateriaProps) {
	const [showCorrelativas, setShowCorrelativas] = useState(false);

	const { getEstado, actualizarAvance } = useSimulador();

	const { cursarSatisfied, rendirSatisfied, isSoloCursar, isDesbloqueado } =
		getMateriaAvailability(materia.correlativas, getEstado);

	let estadoBadge = "Bloqueado";
	if (isDesbloqueado) estadoBadge = "Desbloqueado";
	else if (isSoloCursar) estadoBadge = "Solo Cursar";

	return (
		<Card className="flex w-full shadow-sm transition-all ease-in-out hover:shadow-md">
			<CardHeader>
				<CardTitle>
					<TypographyH3>{materia.nombre}</TypographyH3>
				</CardTitle>
				<CardAction>
					<BadgeEstado estado={estadoBadge} />
				</CardAction>
				<CardDescription className="flex flex-wrap gap-2">
					{materia.esOptativa && (
						<Badge variant="secondary" className="font-normal">
							Optativa{" "}
							{materia.nroOptativa
								? `#${materia.nroOptativa}`
								: ""}
						</Badge>
					)}
					{materia.orientacion && (
						<Badge
							variant="secondary"
							className="text-muted-foreground font-normal"
						>
							{materia.orientacion.nombre}
						</Badge>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col gap-2">
				<Collapsible
					open={showCorrelativas}
					onOpenChange={setShowCorrelativas}
					disabled={
						!materia.correlativas ||
						materia.correlativas.length === 0
					}
				>
					<CollapsibleTrigger className="group border-border/50 data-[state=open]:bg-muted/75 focus-visible:ring-ring hover:bg-muted/50 flex w-full items-center gap-2 rounded-md border p-2 transition-all focus-visible:ring-2 data-disabled:pointer-events-none data-disabled:opacity-75 data-disabled:hover:cursor-not-allowed">
						<IconGitBranch className="text-muted-foreground transition-transform duration-200" />
						<TypographySmall className="font-medium">
							{!materia.correlativas ||
							materia.correlativas.length === 0
								? "Sin correlativas"
								: "Ver correlativas"}
						</TypographySmall>
						<IconChevronDown className="text-muted-foreground ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180" />
					</CollapsibleTrigger>
					<CollapsibleContent className="data-[state=open]:bg-background mt-1 rounded-md px-2 py-2">
						{!materia.correlativas ||
						materia.correlativas.length === 0 ? (
							<div className="text-muted-foreground p-4 text-center text-sm">
								No tiene correlativas
							</div>
						) : (
							<Tabs
								defaultValue={
									materia.correlativas.filter(
										(c) => c.tipo === "cursar",
									).length > 0
										? "cursar"
										: "rendir"
								}
								className="w-full"
							>
								<TabsList className="w-full">
									<TabsTrigger
										value="cursar"
										className="flex-1"
										disabled={
											materia.correlativas.filter(
												(c) => c.tipo === "cursar",
											).length === 0
										}
									>
										Para Cursar
									</TabsTrigger>
									<TabsTrigger
										value="rendir"
										className="flex-1"
										disabled={
											materia.correlativas.filter(
												(c) => c.tipo === "rendir",
											).length === 0
										}
									>
										Para Rendir
									</TabsTrigger>
								</TabsList>
								<TabsContent
									value="cursar"
									className="mt-4 flex flex-col gap-2"
								>
									{(() => {
										const cursarGrp =
											materia.correlativas.find(
												(c) => c.tipo === "cursar",
											);
										if (
											!cursarGrp ||
											cursarGrp.condiciones.length === 0
										) {
											return (
												<div className="text-muted-foreground py-2 text-center text-sm">
													No tiene requisitos para
													cursar.
												</div>
											);
										}
										return (
											<ListadoRequisitos
												condiciones={
													cursarGrp.condiciones
												}
											/>
										);
									})()}
								</TabsContent>
								<TabsContent
									value="rendir"
									className="mt-4 flex flex-col gap-2"
								>
									{(() => {
										const rendirGrp =
											materia.correlativas.find(
												(c) => c.tipo === "rendir",
											);
										if (
											!rendirGrp ||
											rendirGrp.condiciones.length === 0
										) {
											return (
												<div className="text-muted-foreground py-2 text-center text-sm">
													No tiene requisitos para
													rendir.
												</div>
											);
										}
										return (
											<ListadoRequisitos
												condiciones={
													rendirGrp.condiciones
												}
											/>
										);
									})()}
								</TabsContent>
							</Tabs>
						)}
					</CollapsibleContent>
				</Collapsible>
				<Separator />
				<Select
					value={getEstado(materia.idMateriaPlan) || "Sin cursar"}
					onValueChange={(value) =>
						actualizarAvance(
							materia.idMateriaPlan,
							value as EstadoMateria,
						)
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Seleccionar" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Sin cursar">
							<IconCircleDashed />
							Sin Cursar
						</SelectItem>
						<SelectItem
							value="Cursando"
							disabled={!cursarSatisfied}
						>
							<IconHourglass />
							Cursando
						</SelectItem>
						<SelectItem value="Regular" disabled={!cursarSatisfied}>
							<IconCircleDashedCheck />
							Regular
						</SelectItem>
						<SelectItem
							value="Aprobado"
							disabled={!rendirSatisfied}
						>
							<IconCircleCheck />
							Aprobado
						</SelectItem>
						<SelectItem value="Libre" disabled={!cursarSatisfied}>
							<IconCircleX />
							Libre
						</SelectItem>
					</SelectContent>
				</Select>
			</CardContent>
			<CardFooter>
				<Button asChild>
					<Link
						to={`/carreras/${carreraSlug}/${planAnio}/${materia.slug}${
							materia.orientacion
								? `?orientacion=${materia.orientacion.slug}`
								: ""
						}`}
					>
						Ver mas
						<IconArrowRight />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
