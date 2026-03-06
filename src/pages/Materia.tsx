import { Link, useParams } from "react-router-dom";
import {
	IconHome,
	IconCircleCheck,
	IconCircleDashed,
	IconCircleDashedCheck,
	IconHourglass,
	IconCircleX,
	IconLock,
	IconLockOpen,
} from "@tabler/icons-react";

import Cargando from "../sections/Cargando";

import { useSimulador } from "../context/SimuladorContextData";
import { getMateriaAvailability } from "../scripts/materiaUtils";
import { useMateriaData } from "../hooks/useMateriaData";
import { usePageTitle } from "../hooks/usePageTitle";
import type { EstadoMateria } from "@/types/materiaTypes";

// UI Components
import { TypographyH1 } from "@/components/ui/Typography";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { badgeVariants, Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function BadgeEstado({ estado }: { estado: string }) {
	switch (estado) {
		case "Desbloqueado":
			return (
				<Badge
					variant="outline"
					className="text-green-600 select-none dark:text-green-400"
				>
					<IconCircleCheck className="mr-1 size-4" />
					Disponible
				</Badge>
			);
		case "Bloqueado":
			return (
				<Badge
					variant="outline"
					className="text-red-600 select-none dark:text-red-400"
				>
					<IconLock className="mr-1 size-4" />
					No disponible
				</Badge>
			);
		case "Solo Cursar":
			return (
				<Badge
					variant="outline"
					className="text-yellow-600 select-none dark:text-yellow-400"
				>
					<IconLockOpen className="mr-1 size-4" />
					Solo Cursar
				</Badge>
			);
		default:
			return null;
	}
}

/**
 * Componente principal de la página de detalle de una Materia.
 * Muestra información, recursos, fechas y notas de una materia específica.
 * Permite cambiar el estado de la materia (cursando, aprobado, etc.) y ver su disponibilidad.
 */
export default function Materia() {
	// Obtenemos los parámetros de la URL: slug de la materia, plan y carrera.
	const { materiaSlug, planSlug, carreraSlug } = useParams();

	// Hook personalizado para obtener los datos de la materia desde Supabase.
	const { materia, loading, correlativasFormat } = useMateriaData(
		materiaSlug,
		planSlug,
		carreraSlug,
	);

	// Cambiando de nombre la página
	usePageTitle(
		loading ? "cargando..." : `${materia?.materias?.nombre}`,
		true,
	);

	// Contexto del simulador para obtener y actualizar el estado de la materia en el plan del usuario.
	const { getEstado, actualizarAvance } = useSimulador();

	// Si está cargando o no hay materia, mostramos el spinner.
	if (!materia || loading) return <Cargando />;

	// --- LÓGICA DE DISPONIBILIDAD ---
	const { cursarSatisfied, rendirSatisfied, isSoloCursar, isDesbloqueado } =
		getMateriaAvailability(correlativasFormat, getEstado);

	let estadoBadge = "Bloqueado";
	if (isDesbloqueado) estadoBadge = "Desbloqueado";
	else if (isSoloCursar) estadoBadge = "Solo Cursar";

	return (
		<section className="flex w-full flex-col gap-6 pb-10">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							asChild
							className={badgeVariants({ variant: "outline" })}
						>
							<Link to="/">
								<IconHome className="size-4" />
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/carreras">Carreras</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to={`/carreras/${carreraSlug}`}>
								{materia.plan_estudio.carreras.nombre}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to={`/carreras/${carreraSlug}/${planSlug}`}>
								{materia.plan_estudio.anio_inicio}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbPage>
							{materia.materias.nombre}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* CONTENIDO PRINCIPAL Y ACCIONES */}
			<div className="mt-2 flex flex-col gap-6 md:flex-row">
				{/* Info de la Materia */}
				<div className="flex-1 space-y-4">
					<TypographyH1>{materia.materias.nombre}</TypographyH1>
					<div className="flex flex-wrap items-center gap-2">
						<BadgeEstado estado={estadoBadge} />
						{!!materia.nro_optativa && (
							<Badge variant="secondary" className="font-normal">
								Optativa{" "}
								{materia.nro_optativa
									? `#${materia.nro_optativa}`
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
					</div>
				</div>

				{/* Card para cambiar estado */}
				<Card className="h-fit w-full md:w-80">
					<CardHeader className="pb-4">
						<CardTitle className="text-lg">Mi Estado</CardTitle>
						<CardDescription>
							Actualiza tu progreso en esta materia.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Select
							value={getEstado(materia.id) || "Sin cursar"}
							onValueChange={(value) =>
								actualizarAvance(
									materia.id,
									value as EstadoMateria,
								)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Seleccionar estado" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Sin cursar">
									<IconCircleDashed className="size-4" /> Sin
									Cursar
								</SelectItem>
								<SelectItem
									value="Cursando"
									disabled={!cursarSatisfied}
								>
									<IconHourglass className="size-4" />
									Cursando
								</SelectItem>
								<SelectItem
									value="Regular"
									disabled={!cursarSatisfied}
								>
									<IconCircleDashedCheck className="size-4" />
									Regular
								</SelectItem>
								<SelectItem
									value="Aprobado"
									disabled={!rendirSatisfied}
								>
									<IconCircleCheck className="size-4" />
									Aprobado
								</SelectItem>
								<SelectItem
									value="Libre"
									disabled={!cursarSatisfied}
								>
									<IconCircleX className="size-4" /> Libre
								</SelectItem>
							</SelectContent>
						</Select>
					</CardContent>
				</Card>
			</div>

			{/* SECCIÓN DE TABS PRÓXIMAMENTE */}
			<div className="mt-4">
				<Tabs defaultValue="tab1" className="w-full">
					<TabsList>
						<TabsTrigger value="tab1">Pestaña 1</TabsTrigger>
						<TabsTrigger value="tab2">Pestaña 2</TabsTrigger>
						<TabsTrigger value="tab3">Pestaña 3</TabsTrigger>
					</TabsList>
					<TabsContent
						value="tab1"
						className="text-muted-foreground mt-2 flex min-h-32 items-center justify-center rounded-md border p-4"
					>
						Contenido de la Pestaña 1
					</TabsContent>
					<TabsContent
						value="tab2"
						className="text-muted-foreground mt-2 flex min-h-32 items-center justify-center rounded-md border p-4"
					>
						Contenido de la Pestaña 2
					</TabsContent>
					<TabsContent
						value="tab3"
						className="text-muted-foreground mt-2 flex min-h-32 items-center justify-center rounded-md border p-4"
					>
						Contenido de la Pestaña 3
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
