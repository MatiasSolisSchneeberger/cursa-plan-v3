import {IconCalendar, IconAlertTriangle} from "@tabler/icons-react"
import Button from "./Button"
import Card from "./Card"
import CardBody from "./CardBody"
import CardFooter from "./CardFooter"
import CardHeader from "./CardHeader"
import CardInfoList from "./CardInfoList"
import Chip from "./Chip"
import MenuGroup from "./MenuGroup"
import MenuItem from "./MenuItem"
import type {MateriaJSON, GrupoCorrelativa, Condicion, Requisito} from "../types/db"
import {useEffect, useState} from "react"
import supabase from "../utils/supabase"
import {fechaProxima} from "../scripts/fechaProxima"

interface CardMateriaProps {
	materia: MateriaJSON
	goToMateria: (slug: string) => void
}

export default function CardMateria({materia, goToMateria}: CardMateriaProps) {
	const [fechas, setFechas] = useState<any[]>([])
	const [feriados, setFeriados] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const [examenesRes, feriadosRes] = await Promise.all([
				supabase.from("fechas_examenes").select(`fecha`).eq("materia_id", materia.id),
				supabase.from("feriados").select(`fecha`),
			])

			if (examenesRes.error) console.error(examenesRes.error)
			if (feriadosRes.error) console.error(feriadosRes.error)

			if (examenesRes.data) setFechas(examenesRes.data)
			if (feriadosRes.data) setFeriados(feriadosRes.data)

			setLoading(false)
		}

		fetchData()
	}, [])

	const {proxima, isUrgent} = fechaProxima(fechas, feriados)

	// Agendar google calendar:
	// Función auxiliar para formatear a YYYYMMDD
	const formatGoogleDate = (date: Date) => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, "0")
		const day = String(date.getDate()).padStart(2, "0")
		return `${year}${month}${day}`
	}

	let linkCalendar = ""

	if (proxima) {
		// 1. Calculamos fecha de inicio y fin (día siguiente para evento de todo el día)
		const startDate = formatGoogleDate(proxima)

		const nextDay = new Date(proxima)
		nextDay.setDate(proxima.getDate() + 1)
		const endDate = formatGoogleDate(nextDay)

		// 2. Definimos el título (puedes cambiar "Mesa de Examen" por una variable si la tienes)
		const titulo = `Mesa de Examen - ${materia.nombre}`

		// 3. Construimos la URL usando 'render?action=TEMPLATE' que es más robusto
		linkCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
			titulo
		)}&dates=${startDate}/${endDate}&details=Examen de ${encodeURIComponent(materia.nombre)}`
	}

	return (
		<Card id={materia.slug} className="scroll-mt-28">
			<CardHeader color="primary">{materia.nombre}</CardHeader>
			<CardBody>
				{/* --- CARTEL DE OPTATIVA --- */}
				{materia.esOptativa && (
					<Chip color="warning">Optativa {materia.nroOptativa ? `#${materia.nroOptativa}` : ""}</Chip>
				)}
				{materia.orientacion && <Chip color="tertiary">{materia.orientacion.nombre}</Chip>}
				{materia.correlativas.length === 0 ? (
					<Chip color="tertiary">No hay correlativas</Chip>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{materia.correlativas.map((correlativa: GrupoCorrelativa, indexCorr: number) => (
							<CardInfoList key={`${correlativa.tipo}-${indexCorr}`} title={`Para ${correlativa.tipo}:`}>
								{correlativa.condiciones.map((condicion: Condicion, indexCond: number) => (
									<MenuGroup
										key={`${condicion.tipo}-${indexCond}`}
										title={
											condicion.tipo === "materia"
												? `Tener ${condicion.condicion}`
												: condicion.tipo === "porcentaje"
												? "Porcentaje requerido"
												: "Nota/Otro"
										}>
										{condicion.requisitos.map((requisito: Requisito, indexReq: number) => {
											if ("porcentaje" in requisito) {
												return (
													<MenuItem key={indexReq} canHover={false}>
														{requisito.porcentaje}% de la carrera
													</MenuItem>
												)
											}
											if ("nota" in requisito) {
												return (
													<MenuItem key={indexReq} canHover={false}>
														{requisito.nota}
													</MenuItem>
												)
											}
											if ("nombre" in requisito) {
												return (
													<MenuItem canHover={true} key={indexReq} onClick={() => goToMateria(requisito.slug)}>
														{requisito.nombre}
													</MenuItem>
												)
											}
											return null
										})}
									</MenuGroup>
								))}
							</CardInfoList>
						))}
					</div>
				)}
			</CardBody>
			<CardFooter>
				<section className="flex flex-row gap-2">
					<CardInfoList title="Fecha de examenes" color="secondary" className="*:px-2 *:text-center">
						<MenuItem iconLeft={isUrgent ? <IconAlertTriangle className="text-red-500" /> : undefined} canHover={false}>
							{loading
								? "Cargando..."
								: proxima
								? proxima.toLocaleDateString("es-AR", {
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
								  })
								: "No hay fechas"}
						</MenuItem>

						<div className="flex flex-row gap-2 w-full">
							<Button variant="outlined" disabled={loading || !proxima} className="w-full">
								Ver mas
							</Button>
							<Button
								variant="outlined"
								iconRight={<IconCalendar />}
								className="w-full"
								href={linkCalendar}
								target="_blank"
								disabled={!proxima}>
								Agendar
							</Button>
						</div>
					</CardInfoList>
				</section>
			</CardFooter>
		</Card>
	)
}
