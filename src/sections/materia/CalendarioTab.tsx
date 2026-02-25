import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import CardInfoList from "@/components/CardInfoList";
import Chip from "@/components/Chip";
import MenuGroup from "@/components/MenuGroup";
import MenuItem from "@/components/MenuItem";
import { fechaProxima } from "@/scripts/fechaProxima";
import supabase from "@/utils/supabase";
import ToolTip from "@/components/ToolTip";
import { IconCalendarPlus, IconInfoCircle } from "@tabler/icons-react";
import Cargando from "@/sections/Cargando";

interface CalendarioTabProps {
	fechas: { fecha: string }[];
	materiaNombre: string;
}

export const CalendarioTab = ({
	fechas,
	materiaNombre,
}: CalendarioTabProps) => {
	const [feriados, setFeriados] = useState<any[]>([]);
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

	const { status, tooltip } = fechaProxima(fechas, feriados, today);

	const parseDate = (d: string) => {
		const [y, m, dstr] = d.split("-").map(Number);
		return new Date(y, m - 1, dstr);
	};

	const futureDates = fechas
		.map((f) => ({ ...f, parsedDate: parseDate(f.fecha) }))
		.filter((f) => f.parsedDate >= today)
		.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

	const formatDate = (date: Date) =>
		date.toLocaleDateString("es-AR", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		});

	return (
		<Card>
			<CardHeader color="primary">Calendario</CardHeader>
			<CardBody className="grid grid-cols-4 gap-3 lg:grid-cols-12">
				{loading && <Cargando className="col-span-full" />}

				{!loading && futureDates.length === 0 && (
					<div className="texto-label text-text-700 dark:text-text-300 col-span-full p-4">
						No hay fechas de examen próximas.
					</div>
				)}

				{!loading &&
					futureDates.map((item, index) => {
						const isFirst = index === 0;
						let chipColor:
							| "success"
							| "warning"
							| "danger"
							| "info"
							| "primary"
							| "secondary" = "secondary";
						let chipText;

						if (isFirst && status) {
							if (status === "inscripcion cerrada") {
								chipColor = "danger";
								chipText = "Inscripción cerrada";
							} else if (status === "urgente") {
								chipColor = "warning";
								chipText = "Urgente";
							}
						}

						const linkGoogleCalendar = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
							`Mesa de examen de ${materiaNombre}`,
						)}&dates=${encodeURIComponent(
							item.parsedDate
								.toISOString()
								.replace(/-|:|\.\d\d\d/g, "")
								.slice(0, 8),
						)}/${encodeURIComponent(
							item.parsedDate
								.toISOString()
								.replace(/-|:|\.\d\d\d/g, "")
								.slice(0, 8),
						)}&details=${encodeURIComponent(`Mesa de examen de ${materiaNombre}`)}`;

						return (
							<CardInfoList
								key={index}
								title={`Mesa N° ${index + 1}`}
								color={chipColor}
								className="col-span-4 md:col-span-5 xl:col-span-3"
							>
								<section className="flex flex-col gap-2">
									<MenuGroup>
										<MenuItem
											chip={
												chipText ? (
													<Chip color={chipColor}>
														{chipText}
													</Chip>
												) : null
											}
											tooltip={
												isFirst &&
												tooltip && (
													<ToolTip tooltip={tooltip}>
														<IconInfoCircle />
													</ToolTip>
												)
											}
										>
											{formatDate(item.parsedDate)}
										</MenuItem>
									</MenuGroup>

									<Button
										color="tertiary"
										variant="outlined"
										iconLeft={<IconCalendarPlus />}
										className="mx-2"
										onClick={() =>
											window.open(
												linkGoogleCalendar,
												"_blank",
											)
										}
									>
										Agendar
									</Button>
								</section>
							</CardInfoList>
						);
					})}
			</CardBody>
		</Card>
	);
};
