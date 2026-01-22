import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import CardBody from "../../../components/CardBody"
import CardHeader from "../../../components/CardHeader"
import CardInfoList from "../../../components/CardInfoList"
import Chip from "../../../components/Chip"
import MenuGroup from "../../../components/MenuGroup"
import MenuItem from "../../../components/MenuItem"
import {fechaProxima} from "../../../scripts/fechaProxima"
import supabase from "../../../utils/supabase"
import ToolTip from "../../../components/ToolTip"
import {IconInfoCircle} from "@tabler/icons-react"
import Cargando from "../../Cargando"

export const CalendarioTab = () => {
	const {materiaSlug} = useParams()
	const [fechas, setFechas] = useState<any[]>([])
	const [feriados, setFeriados] = useState<any[]>([])
	const [materiaNombre, setMateriaNombre] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!materiaSlug) return

		const fetchData = async () => {
			setLoading(true)
			const {data: materiaData} = await supabase
				.from("materias")
				.select("nombre, fechas_examenes(fecha)")
				.eq("slug", materiaSlug)
				.single()

			const {data: feriadosData} = await supabase.from("feriados").select("fecha")

			if (materiaData) {
				const fechasRaw = materiaData.fechas_examenes || []
				setFechas(fechasRaw)
				setMateriaNombre(materiaData.nombre)
			}
			if (feriadosData) {
				setFeriados(feriadosData)
			}
			setLoading(false)
		}
		fetchData()
	}, [materiaSlug])

	const today = new Date()
	today.setHours(0, 0, 0, 0)

	const {isUrgent} = fechaProxima(fechas, feriados, today)

	const parseDate = (d: string) => {
		const [y, m, dstr] = d.split("-").map(Number)
		return new Date(y, m - 1, dstr)
	}

	const futureDates = fechas
		.map((f) => ({...f, parsedDate: parseDate(f.fecha)}))
		.filter((f) => f.parsedDate >= today)
		.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())

	const formatDate = (date: Date) =>
		date.toLocaleDateString("es-AR", {day: "2-digit", month: "2-digit", year: "2-digit"})

	return (
		<Card className="grid grid-cols-subgrid col-span-4 md:col-span-5 xl:col-span-9">
			<CardHeader color="secondary" className="col-span-full h-min">
				Calendario
			</CardHeader>
			<CardBody className="grid grid-cols-subgrid gap-3 col-span-4 md:col-span-5 xl:col-span-9">
				{loading && <Cargando className="col-span-full h-min" />}

				{!loading && futureDates.length === 0 && (
					<div className="col-span-full p-4 text-gray-500">No hay fechas de examen próximas.</div>
				)}

				{!loading &&
					futureDates.map((item, index) => {
						const isFirst = index === 0
						let chipColor: "success" | "warning" | "danger" | "info" | "primary" | "secondary" = "secondary"
						let chipText

						if (isFirst) {
							if (isUrgent) {
								chipColor = "danger"
								chipText = "Urgente"
							} else {
								chipColor = "success"
								chipText = "Próximo"
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
						)}&details=${encodeURIComponent(`Mesa de examen de ${materiaNombre}`)}`

						return (
							<CardInfoList
								key={index}
								title={`Mesa N° ${index + 1}`}
								color="secondary"
								className="col-span-4 md:col-span-5 xl:col-span-3">
								<section className="flex flex-col gap-2">
									<MenuGroup>
										<MenuItem
											chip={chipText ? <Chip color={chipColor}>{chipText}</Chip> : null}
											tooltip={
												chipText === "Urgente" && (
													<ToolTip tooltip="Las inscripciones de las mesas cierran 3 días hábiles antes del examen">
														<IconInfoCircle />
													</ToolTip>
												)
											}>
											{formatDate(item.parsedDate)}
										</MenuItem>
									</MenuGroup>

									<Button
										color="tertiary"
										variant="outlined"
										className="mx-2"
										onClick={() => window.open(linkGoogleCalendar, "_blank")}>
										Agendar
									</Button>
								</section>
							</CardInfoList>
						)
					})}
			</CardBody>
		</Card>
	)
}
