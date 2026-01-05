import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {usePageTitle} from "../hooks/usePageTitle"

import Button from "../components/Button"
import CalendarCard, {type CalendarEvent} from "../components/CalendarCard"

import supabase from "../utils/supabase"

import {
	transformarFeriados,
	transformarClases,
	transformarExamenes,
	transformarInscripciones,
} from "../scripts/transformEventos"
import ButtonGroup from "../components/ButtonGroup"
import Chip from "../components/Chip"

export default function Calendar() {
	const [eventos, setEventos] = useState<CalendarEvent[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)

	const [searchParams, setSearchParams] = useSearchParams()
	const tipoCalendario = searchParams.get("tipo") // Default a feriados

	// Redireccion por defecto si no hay tipo en la url
	useEffect(() => {
		if (!tipoCalendario) {
			setSearchParams({tipo: "feriados"}, {replace: true})
		}
	}, [tipoCalendario, setSearchParams])

	usePageTitle("Calendario")

	const monthActual = new Date().getMonth()

	useEffect(() => {
		setLoading(true)
		setSelectedPeriod(null)

		async function fetchData() {
			let transformedEvents: CalendarEvent[] = []

			try {
				switch (tipoCalendario) {
					case "feriados": {
						const {data, error} = await supabase.from("feriados").select(`
                            id, fecha, nombre, slug, nota,
                            tipo: tipos_feriado (nombre)
                        `)
						if (error) throw error
						transformedEvents = transformarFeriados(data || [])
						break
					}
					case "clases": {
						const {data, error} = await supabase.from("calendario_clases").select(`
                            id, nro_periodo, fecha_inicio, fecha_fin, nota,
                            periodo: tipos_periodo(periodo)
                        `)
						if (error) throw error
						transformedEvents = transformarClases(data || [])
						break
					}
					case "examenes": {
						const {data, error} = await supabase.from("turnos_examenes").select(`
                            id, fecha_inicio, fecha_fin, is_suspencion, nota,
                            tipo_mesa_id: tipos_mesa(nombre, slug)
                        `)
						if (error) throw error
						transformedEvents = transformarExamenes(data || [])
						break
					}
					case "inscripciones": {
						const {data, error} = await supabase.from("inscripciones").select(`
                            id, nro_periodo, fecha_inicio, fecha_fin,
                            periodo: tipos_periodo(periodo)
                        `)
						if (error) throw error
						transformedEvents = transformarInscripciones(data || [])
						break
					}
				}

				setEventos(transformedEvents)

				// Calcular periodos y seleccionar por defecto "Cuatrimestre" si existe
				const periods = Array.from(new Set(transformedEvents.map((e) => e.period).filter(Boolean))) as string[]
				if (periods.length > 0) {
					const defaultPeriod = periods.find((p) => p.toLowerCase().includes("cuatrimestre")) || periods[0]
					setSelectedPeriod(defaultPeriod)
				}
			} catch (error) {
				console.error("Error fetching calendar events:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [tipoCalendario])

	useEffect(() => {
		if (loading) return
		// Usamos setTimeout para dar un pequeño respiro al renderizado del navegador
		const timer = setTimeout(() => {
			// Buscamos el elemento por el ID que generaremos abajo (ej: "mes-0")
			const element = document.getElementById(`mes-${monthActual}`)

			if (element) {
				element.scrollIntoView({
					behavior: "smooth",
					block: "center", // Esto hace que el mes quede centrado en la pantalla
				})
			}
		}, 500) // 100ms es suficiente

		return () => clearTimeout(timer)
	}, [monthActual, loading]) // Se ejecuta cuando carga el componente

	// if (loading) return <div>Loading...</div> // Removed to show skeleton

	const calendarios = ["feriados", "clases", "examenes", "inscripciones"]

	// Calcular periodos únicos
	const availablePeriods = Array.from(new Set(eventos.map((e) => e.period).filter(Boolean))) as string[]

	// Filtrar eventos
	const filteredEvents = selectedPeriod ? eventos.filter((e) => e.period === selectedPeriod) : eventos

	return (
		<section className="w-full h-full space-y-4 flex flex-col gap-12">
			<div className="flex flex-col gap-4">
				<ButtonGroup>
					{calendarios.map((cal) => (
						<Button
							key={cal}
							// Variante visual para saber cuál está activo
							variant={tipoCalendario === cal ? "solid" : "outlined"}
							onClick={() => setSearchParams({tipo: cal})}>
							{cal.charAt(0).toUpperCase() + cal.slice(1)}
						</Button>
					))}
				</ButtonGroup>

				{availablePeriods.length > 0 && (
					<div className="flex flex-col gap-2 justify-center md:justify-center items-center animate-in fade-in slide-in-from-top-2">
						<span className="text-sm font-medium text-text-500 mr-2">Filtrar por periodo:</span>
						<ButtonGroup>
							{availablePeriods.map((period) => (
								<Button
									key={period}
									variant={selectedPeriod === period ? "solid" : "flat"}
									className="h-8 min-h-8 text-xs"
									onClick={() => setSelectedPeriod(period)}>
									{period}
								</Button>
							))}
						</ButtonGroup>
					</div>
				)}
			</div>

			{/* <pre className="select-all">{JSON.stringify(filteredEvents, null, 2)}</pre> */}
			{tipoCalendario === "examenes" && (
				<div className="flex flex-row gap-3 items-center">
					<Chip color="danger">*</Chip>
					<span className="texto-label text-text-700 dark:text-text-300">
						Suspende clases. excepto para asignaturas de 1er año 1er cuatrimestre
					</span>
				</div>
			)}

			<section
				className={`flex flex-wrap justify-center gap-6 ${
					loading ? "animate-pulse opacity-50 pointer-events-none" : ""
				}`}>
				{/* Renderizamos los 12 meses */}
				{Array.from({length: 12}, (_, i) => {
					const mesFecha = new Date(2026, i, 1) // Año hardcodeado o dinámico según necesites

					return (
						<CalendarCard
							key={i}
							month={mesFecha}
							events={loading ? [] : filteredEvents} // Pasamos vacio cuando carga para el esqueleto
							hasNavigation={false} // En vista anual no queremos botones prev/next
							className="h-full"
						/>
					)
				})}
			</section>
		</section>
	)
}
