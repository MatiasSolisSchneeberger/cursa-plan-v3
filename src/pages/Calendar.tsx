//--- IMPORTS ---

// React
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Hooks
import { usePageTitle } from "@/hooks/usePageTitle";

// Tipos
import { type CalendarEvent } from "@/scripts/transformEventos";

// Supabase
import supabase from "@/utils/supabase";

// Scripts
import {
	transformarClases,
	transformarExamenes,
	transformarFeriados,
	transformarInscripciones,
} from "@/scripts/transformEventos";

// Iconos
import {
	IconCalendar,
	IconExternalLink,
	IconFile,
	IconPencil,
	IconSchool,
} from "@tabler/icons-react";

// Componentes
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH1, TypographyH4 } from "@/components/ui/Typography";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";

// Utils
import { cn } from "@/lib/utils";

// Layout
import PageLayout from "@/layout/PageLayout";

// Sections
import Cargando from "@/sections/Cargando";

// --- COMPONENTES ---
/**
 * Componente que renderiza una lista de eventos próximos.
 * @param eventos - Array de eventos a renderizar.
 * @returns Componente que renderiza una lista de eventos próximos.
 */
function EventList({ eventos }: { eventos: CalendarEvent[] }) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const upcomingEventos = eventos.filter((event) => {
		const endDate = event.end ? new Date(event.end) : new Date(event.start);
		endDate.setHours(0, 0, 0, 0);
		return endDate.getTime() >= today.getTime();
	});

	if (upcomingEventos.length === 0) {
		return (
			<p className="text-muted-foreground p-4 text-sm">
				No hay eventos próximos para mostrar.
			</p>
		);
	}

	const sortedEventos = [...upcomingEventos].sort(
		(a, b) => a.start.getTime() - b.start.getTime(),
	);

	return (
		<ItemGroup className="grid grid-cols-1 md:grid-cols-2">
			{sortedEventos.map((event, idx) => {
				const formatDate = (date: Date) =>
					date.toLocaleDateString("es-AR", {
						day: "2-digit",
						month: "2-digit",
					});
				const isSameDay =
					!event.end || event.start.getTime() === event.end.getTime();
				const dateString = isSameDay
					? formatDate(event.start)
					: `${formatDate(event.start)} - ${formatDate(event.end!)}`;

				return (
					<Item
						key={event.id || idx}
						variant={idx === 0 ? "muted" : "default"}
					>
						<ItemContent>
							<ItemTitle>
								<span className="capitalize">
									{dateString}{" "}
									{event.note && ` - ${event.note}`}
								</span>
							</ItemTitle>
							<ItemDescription>
								{event.title}

								<br />
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							{event.eventType && (
								<Badge
									variant="outline"
									className={cn({
										eventType: {
											"Feriado Inamovible":
												"text-destructive",
											Clase: "text-info",
											Examen: "text-success",
											Inscripción: "text-warning",
										},
									})}
								>
									{event.eventType}
								</Badge>
							)}
						</ItemActions>
					</Item>
				);
			})}
		</ItemGroup>
	);
}

/**
 * Componente que renderiza el contenido de una pestaña del calendario.
 * @param label - Etiqueta de la pestaña.
 * @param eventos - Array de eventos a renderizar.
 * @param availablePeriods - Array de períodos disponibles.
 * @returns Componente que renderiza el contenido de una pestaña del calendario.
 */
function CalendarTabContent({
	label,
	eventos,
	availablePeriods,
}: {
	label: string;
	eventos: CalendarEvent[];
	availablePeriods: string[];
}) {
	if (availablePeriods.length > 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>
						<TypographyH4>{label}</TypographyH4>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue={availablePeriods[0]} className="w-full">
						<TabsList>
							{availablePeriods.map((period) => (
								<TabsTrigger key={period} value={period}>
									{period}
								</TabsTrigger>
							))}
						</TabsList>
						{availablePeriods.map((period) => {
							const filteredEventos = eventos.filter(
								(e) => e.period === period,
							);
							return (
								<TabsContent key={period} value={period}>
									<EventList eventos={filteredEventos} />
								</TabsContent>
							);
						})}
					</Tabs>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<TypographyH4>{label}</TypographyH4>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<EventList eventos={eventos} />
			</CardContent>
		</Card>
	);
}

/**
 * Componente principal de la página de calendario.
 * @returns Componente que renderiza la página de calendario.
 */
export default function Calendar() {
	const [eventos, setEventos] = useState<CalendarEvent[]>([]);
	const [loading, setLoading] = useState(true);

	// Estado local para el tipo de calendario (pestaña activa)
	const [tipoCalendario, setTipoCalendario] = useState<string>("feriados");

	usePageTitle("Calendario");

	const monthActual = new Date().getMonth();

	useEffect(() => {
		setLoading(true);

		async function fetchData() {
			let transformedEvents: CalendarEvent[] = [];

			try {
				switch (tipoCalendario) {
					case "feriados": {
						const { data, error } = await supabase.from("feriados")
							.select(`
                                id, fecha, nombre, slug, nota,
                                tipo: tipos_feriado (nombre)
                            `);

						if (error) throw error;
						transformedEvents = transformarFeriados(data || []);
						break;
					}
					case "clases": {
						const { data, error } = await supabase.from(
							"calendario_clases",
						).select(`
                            id, nro_periodo, fecha_inicio, fecha_fin, nota,
                            periodo: tipos_periodo(slug, nombre)
                        `);
						if (error) throw error;
						transformedEvents = transformarClases(data || []);
						break;
					}
					case "examenes": {
						const { data, error } = await supabase.from(
							"turnos_examenes",
						).select(`
                            id, fecha_inicio, fecha_fin, is_suspencion, nota,
                            tipo_mesa_id: tipos_mesa(nombre, slug)
                        `);
						if (error) throw error;
						transformedEvents = transformarExamenes(data || []);
						break;
					}
					case "inscripciones": {
						const { data, error } = await supabase.from(
							"inscripciones",
						).select(`
                            id, nro_periodo, fecha_inicio, fecha_fin,
                            periodo: tipos_periodo(slug, nombre)
                        `);
						if (error) throw error;
						transformedEvents = transformarInscripciones(
							data || [],
						);
						break;
					}
				}

				setEventos(transformedEvents);
			} catch (error) {
				console.error("Error fetching calendar events:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [tipoCalendario]);

	useEffect(() => {
		if (loading) return;
		// Usamos setTimeout para dar un pequeño respiro al renderizado del navegador
		const timer = setTimeout(() => {
			// Buscamos el elemento por el ID que generaremos abajo (ej: "mes-0")
			const element = document.getElementById(`mes-${monthActual}`);

			if (element) {
				element.scrollIntoView({
					behavior: "smooth",
					block: "center", // Esto hace que el mes quede centrado en la pantalla
				});
			}
		}, 500); // 100ms es suficiente

		return () => clearTimeout(timer);
	}, [monthActual, loading]); // Se ejecuta cuando carga el componente

	const calendarios = [
		{ id: "feriados", label: "Feriados", icon: <IconCalendar /> },
		{ id: "clases", label: "Clases", icon: <IconSchool /> },
		{ id: "examenes", label: "Exámenes", icon: <IconFile /> },
		{ id: "inscripciones", label: "Inscripciones", icon: <IconPencil /> },
	];

	// Calcular periodos únicos
	const availablePeriods = Array.from(
		new Set(eventos.map((e) => e.period).filter(Boolean)),
	) as string[];

	// Filtrar eventos
	const LINK_CALENDARIO =
		"https://exa.unne.edu.ar/alumnos/docs/2026/RES.%202025-944-CD-EXA.pdf";

	return (
		<PageLayout
			className=""
			breadcrumbs={[
				{ url: "/", label: "Inicio", isHome: true },
				{
					url: "/calendario",
					label: "Calendario",
					isCurrentPage: true,
				},
			]}
		>
			<Card className="mb-6">
				<CardHeader>
					<CardTitle>
						<TypographyH1>Calendarios</TypographyH1>
					</CardTitle>
					<CardDescription>
						Toda la información ha sido extraída de la página
						oficial de FaCENA.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ItemGroup className="flex flex-col gap-2 sm:flex-row sm:gap-4">
						<Item variant="muted" asChild>
							<Link
								to={LINK_CALENDARIO}
								target="_blank"
								rel="noreferrer"
							>
								<ItemContent>
									<ItemTitle>
										Resolución RES - 2025 - 944 - CD-EXA
									</ItemTitle>
								</ItemContent>
								<ItemMedia>
									<IconExternalLink className="size-4" />
								</ItemMedia>
							</Link>
						</Item>
						<Item variant="muted" asChild>
							<Link
								to="https://exa.unne.edu.ar/r/?page_id=3145"
								target="_blank"
								rel="noreferrer"
							>
								<ItemContent>
									<ItemTitle>
										Calendarios Académicos FaCENA
									</ItemTitle>
								</ItemContent>
								<ItemMedia>
									<IconExternalLink className="size-4" />
								</ItemMedia>
							</Link>
						</Item>
					</ItemGroup>
				</CardContent>
			</Card>
			<Tabs
				defaultValue={calendarios[0].id}
				onValueChange={setTipoCalendario}
				className="w-full"
			>
				<TabsList className="mx-auto">
					{calendarios.map(({ id, label, icon }) => {
						return (
							<TabsTrigger key={id} value={id}>
								<span
									className={cn(
										tipoCalendario === id && "text-primary",
									)}
								>
									{icon}
								</span>
								<span className="hidden md:block">{label}</span>
								{tipoCalendario !== id && (
									<span className="md:hidden">{label}</span>
								)}
							</TabsTrigger>
						);
					})}
				</TabsList>
				{calendarios.map(({ id, label }) => {
					return (
						<TabsContent key={id} value={id}>
							{loading ? (
								<Cargando className="h-24" />
							) : (
								<CalendarTabContent
									label={label}
									eventos={eventos}
									availablePeriods={availablePeriods}
								/>
							)}
						</TabsContent>
					);
				})}
			</Tabs>
		</PageLayout>
	);
}
