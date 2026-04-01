import { useEffect, useState } from "react";
import { fechaProxima } from "@/scripts/fechaProxima";
import supabase from "@/utils/supabase";
import {
	IconAlertCircle,
	IconCalendarPlus,
	IconCalendarX,
	IconExternalLink,
} from "@tabler/icons-react";
import Cargando from "@/sections/Cargando";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { TypographyH3, TypographyP } from "@/components/ui/Typography";
import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface CalendarioTabProps {
	fechas: { fecha: string }[];
	materiaNombre: string;
}

export default function CalendarioTab({
	fechas,
	materiaNombre,
}: CalendarioTabProps) {
	const [feriados, setFeriados] = useState<{ fecha: string }[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFeriados = async () => {
			setLoading(true);
			const { data: feriadosData } = await supabase
				.from("feriados")
				.select("fecha");
			if (feriadosData) {
				setFeriados(feriadosData);
			}
			setLoading(false);
		};
		fetchFeriados();
	}, []);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const { status } = fechaProxima(fechas, feriados, today);

	const parseDate = (d: string) => {
		const [y, m, dstr] = d.split("-").map(Number);
		return new Date(y, m - 1, dstr);
	};

	const allDates = fechas
		.map((f) => ({ ...f, parsedDate: parseDate(f.fecha) }))
		.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
		.map((f, index) => ({ ...f, mesaNumber: index + 1 }));

	const futureDates = allDates.filter((f) => f.parsedDate >= today);

	const formatDate = (date: Date) =>
		date.toLocaleDateString("es-AR", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		});

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<TypographyH3>Calendario de exámenes</TypographyH3>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{loading && <Cargando className="h-16" />}

				{!loading && futureDates.length === 0 && (
					<div className="texto-label text-text-700 dark:text-text-300 p-4">
						No hay fechas de examen próximas.
					</div>
				)}

				<ItemGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{!loading && (
						<>
							{futureDates.map((item, index) => {
								const isFirst = index === 0;
								let chipText;

								if (isFirst && status) {
									if (status === "inscripcion cerrada") {
										chipText = "Inscripción cerrada";
									} else if (status === "urgente") {
										chipText = "Urgente";
									}
								}

								// --- NUEVA LÓGICA DEL LINK ---
								const formatGoogleCalendarDate = (
									date: Date,
								) => {
									const year = date.getFullYear();
									const month = String(
										date.getMonth() + 1,
									).padStart(2, "0");
									const day = String(date.getDate()).padStart(
										2,
										"0",
									);
									return `${year}${month}${day}`;
								};

								const dateString = formatGoogleCalendarDate(
									item.parsedDate,
								);

								// El evento dura todo el día, por lo que el endDate es el día siguiente
								const endDate = new Date(item.parsedDate);
								endDate.setDate(endDate.getDate() + 1);
								const endDateString =
									formatGoogleCalendarDate(endDate);

								const linkGoogleCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
									`Mesa de examen de ${materiaNombre}`,
								)}&dates=${dateString}/${endDateString}&details=${encodeURIComponent(
									`Mesa de examen de ${materiaNombre}`,
								)}`;

								return (
									<Item
										key={index}
										variant={
											index === 0 ? "muted" : "outline"
										}
									>
										<ItemContent>
											<ItemTitle>
												Mesa N° {item.mesaNumber}
											</ItemTitle>
											<ItemDescription>
												{formatDate(item.parsedDate)}
											</ItemDescription>
										</ItemContent>
										<ItemActions>
											{chipText && (
												<Tooltip>
													<TooltipTrigger asChild>
														<Badge
															variant="outline"
															className={cn(
																chipText ===
																	"Urgente"
																	? "text-yellow-600 outline outline-yellow-600 dark:text-yellow-400 dark:outline-yellow-400"
																	: "text-red-600 outline outline-red-600 dark:text-red-400 dark:outline-red-400",
															)}
														>
															{chipText}
														</Badge>
													</TooltipTrigger>
													<TooltipContent>
														<TypographyP>
															Las inscripciones
															cierran 3 días
															hábiles antes de la
															fecha
														</TypographyP>
													</TooltipContent>
												</Tooltip>
											)}
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														variant={
															index === 0
																? "default"
																: "outline"
														}
														asChild
													>
														<Link
															to={
																linkGoogleCalendar
															}
															rel="noopener noreferrer"
															target="_blank"
														>
															<IconCalendarPlus />
															Agendar
														</Link>
													</Button>
												</TooltipTrigger>
												<TooltipContent>
													<p>
														Agendar en Google
														Calendar
													</p>
												</TooltipContent>
											</Tooltip>
										</ItemActions>
									</Item>
								);
							})}
							<Item variant="default">
								<ItemMedia>
									<IconCalendarX className="size-5" />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>
										Solo hay fechas hasta la mesa N°5
										actualmente.
									</ItemTitle>
									<ItemDescription>
										Cuando suban las nuevas mesas se subiran
										lo antes posible.
									</ItemDescription>
								</ItemContent>
							</Item>
						</>
					)}
				</ItemGroup>
				<Separator />
				<Alert className="mx-auto max-w-xl border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
					<IconAlertCircle className="size-5" />
					<AlertTitle>Revisar los documentos oficiales.</AlertTitle>
					<AlertDescription>
						Estas fechas pueden cambiar por decisiones de la
						facultad. Para más información, visitar el sitio oficial
						de{" "}
						<Link
							to="https://exa.unne.edu.ar/r/"
							className="underline"
						>
							FaCENA.
						</Link>
					</AlertDescription>
					<AlertAction></AlertAction>
				</Alert>
			</CardContent>
			<CardFooter>
				<Button asChild>
					<Link to="http://exa.unne.edu.ar/r/?page_id=21642">
						Ver resolución
						<IconExternalLink />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
