import { useParams, useSearchParams } from "react-router-dom";
import {
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
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/layout/PageLayout";
import {
	Card,
	CardAction,
	CardContent,
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
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";
// import { InfoTab } from "@/sections/materia/InfoTab";
import CorrelativasTab from "@/sections/materia/CorrelativasTab";
// import RecursosTab from "@/sections/materia/RecursosTab";
import CalendarioTab from "@/sections/materia/CalendarioTab";

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
	const [searchParams] = useSearchParams();
	const orientacionSlug = searchParams.get("orientacion");

	// Hook personalizado para obtener los datos de la materia desde Supabase.
	const { materia, loading, correlativasFormat } = useMateriaData(
		materiaSlug,
		planSlug,
		carreraSlug,
		orientacionSlug,
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
		<PageLayout
			className="flex w-full flex-col items-center gap-12"
			breadcrumbs={[
				{ url: "/", isHome: true },
				{ label: "Carreras", url: "/carreras" },
				{
					label: materia.plan_estudio.carreras.nombre,
					url: `/carreras/${carreraSlug}/${planSlug}`,
				},
				{
					label: materia.plan_estudio.anio_inicio,
					url: `/carreras/${carreraSlug}/${planSlug}`,
				},
				...(materia.orientacion
					? [
							{
								label: materia.orientacion.nombre,
								url: `/carreras/${carreraSlug}/${planSlug}`,
							},
						]
					: []),
				{ label: materia.materias.nombre, isCurrentPage: true },
			]}
		>
			{/* CONTENIDO PRINCIPAL Y ACCIONES */}
			<Card className="mx-auto w-full max-w-5xl">
				{/* Info de la Materia */}
				<CardHeader className="flex-1">
					<CardTitle>
						<TypographyH1 className="hidden text-left md:block">
							{materia.materias.nombre}
						</TypographyH1>
						<span className="block text-left md:hidden">
							{materia.materias.nombre}
						</span>
					</CardTitle>
					<CardAction className="flex flex-wrap justify-end gap-2">
						{/* Estado */}
						<BadgeEstado estado={estadoBadge} />

						{/* Nro de Optativa */}
						{materia.nro_optativa && (
							<Badge variant="secondary" className="font-normal">
								Optativa {"#"}
								{materia.nro_optativa}
							</Badge>
						)}

						{/* Orientación */}
						{materia.orientacion && (
							<Badge variant="secondary" className="font-normal">
								{materia.orientacion.nombre}
							</Badge>
						)}
					</CardAction>
				</CardHeader>
				<CardContent>
					{/* Card para cambiar estado */}
					<Item variant="muted">
						<ItemContent>
							<ItemTitle>Mi Estado</ItemTitle>
							<ItemDescription>
								Actualiza tu progreso en esta materia.
							</ItemDescription>
						</ItemContent>
						<ItemActions>
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
										<IconCircleDashed className="size-4" />
										Sin Cursar
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
										<IconCircleX className="size-4" />
										Libre
									</SelectItem>
								</SelectContent>
							</Select>
						</ItemActions>
					</Item>
				</CardContent>
			</Card>

			<article className="w-full">
				<Tabs defaultValue="correlativas" className="w-full">
					<TabsList className="mx-auto w-full max-w-5xl">
						{/*<TabsTrigger value="informacion">
							Información
						</TabsTrigger>*/}
						<TabsTrigger value="correlativas">
							Correlativas
						</TabsTrigger>
						{/*<TabsTrigger value="recursos">Recursos</TabsTrigger>*/}
						<TabsTrigger value="examenes">Exámenes</TabsTrigger>
					</TabsList>
					{/*<TabsContent value="informacion">
						<InfoTab />
					</TabsContent>*/}
					<TabsContent value="correlativas">
						<CorrelativasTab
							correlativasFormat={correlativasFormat}
						/>
					</TabsContent>
					{/*<TabsContent value="recursos">
						<RecursosTab />
					</TabsContent>*/}
					<TabsContent value="examenes">
						<CalendarioTab
							fechas={
								Array.isArray(materia.materias.fechas_examenes)
									? materia.materias.fechas_examenes
									: materia.materias.fechas_examenes
										? [materia.materias.fechas_examenes]
										: []
							}
							materiaNombre={materia.materias.nombre}
						/>
					</TabsContent>
				</Tabs>
			</article>
		</PageLayout>
	);
}
