import {useEffect, useState} from "react"
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

import {cn} from "../utils/cn"
import Alert from "../components/Alert"
import {IconExternalLink, IconInfoCircle, IconCalendar, IconSchool, IconFile, IconPencil} from "@tabler/icons-react"
import {useAuth} from "../context/AuthContextData"
import PageHeader from "../components/PageHeader"
import {Tabs, TabsContent, TabsTrigger} from "../components/Tabs"

export default function Calendar() {
	const [eventos, setEventos] = useState<CalendarEvent[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)

	// Estado local para el tipo de calendario (pestaña activa)
	const [tipoCalendario, setTipoCalendario] = useState<string>("feriados")

	const {session} = useAuth()

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
                            periodo: tipos_periodo(slug, nombre)
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
                            periodo: tipos_periodo(slug, nombre)
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

	const calendarios = [
		{id: "feriados", label: "Feriados", icon: <IconCalendar />},
		{id: "clases", label: "Clases", icon: <IconSchool />},
		{id: "examenes", label: "Exámenes", icon: <IconFile />},
		{id: "inscripciones", label: "Inscripciones", icon: <IconPencil />},
	]

	// Calcular periodos únicos
	const availablePeriods = Array.from(new Set(eventos.map((e) => e.period).filter(Boolean))) as string[]

	// Filtrar eventos
	const LINK_CALENDARIO = "https://exa.unne.edu.ar/alumnos/docs/2026/RES.%202025-944-CD-EXA.pdf"
	const AVISO_ERROR = `/contacto?etiqueta=error&mensaje=Error en el calendario. &usuario=${session?.user?.user_metadata?.full_name}&email=${session?.user?.user_metadata?.email}`

	return (
		<section className="flex flex-col gap-3">
			<PageHeader
				title={
					<>
						<h1 className="texto-title block md:hidden text-primary-600 dark:text-primary-400 w-full text-start">
							Calendario Académico
						</h1>
						<h1 className="texto-headline hidden md:block text-primary-600 dark:text-primary-400 w-full text-start">
							Calendario Académico
						</h1>
					</>
				}
				backUrl="/">
				<Button
					variant="flat"
					color="info"
					href={LINK_CALENDARIO}
					iconRight={<IconExternalLink size={18} />}
					target="_blank">
					Ver Resolución
				</Button>
				<Button variant="text" color="danger" href={AVISO_ERROR}>
					Avisar error
				</Button>
			</PageHeader>

			<Tabs defaultValue="feriados" value={tipoCalendario} onValueChange={(val) => setTipoCalendario(val)}>
				<ButtonGroup className="w-full md:w-auto">
					{calendarios.map((cal) => (
						<TabsTrigger key={cal.id} value={cal.id} iconLeft={cal.icon}>
							{cal.label}
						</TabsTrigger>
					))}
				</ButtonGroup>

				{calendarios.map((cal) => (
					<TabsContent key={cal.id} value={cal.id}>
						{availablePeriods.length > 0 ?
							<Tabs
								defaultValue={availablePeriods[0]}
								value={selectedPeriod || ""}
								onValueChange={(val) => setSelectedPeriod(val)}>
								<ButtonGroup>
									{availablePeriods.map((period) => (
										<TabsTrigger key={period} value={period} variants={["solid", "outlined"]} color="secondary">
											{period}
										</TabsTrigger>
									))}
								</ButtonGroup>

								{availablePeriods.map((period) => (
									<TabsContent key={period} value={period}>
										<section
											className={cn(
												"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-6 justify-items-center",
												loading ? "animate-pulse opacity-50 pointer-events-none" : "",
											)}>
											{/* Renderizamos los 12 meses */}
											{Array.from({length: 12}, (_, i) => {
												const mesFecha = new Date(2026, i, 1) // Año hardcodeado o dinámico según necesites

												return (
													<CalendarCard
														key={i}
														month={mesFecha}
														events={loading ? [] : eventos.filter((e) => e.period === period)} // Filtramos por el periodo del tab
														hasNavigation={false} // En vista anual no queremos botones prev/next
														className="h-full"
													/>
												)
											})}
										</section>
									</TabsContent>
								))}
							</Tabs>
						:	<section
								className={cn(
									"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-6 justify-items-center",
									loading ? "animate-pulse opacity-50 pointer-events-none" : "",
								)}>
								{/* Renderizamos los 12 meses */}
								{Array.from({length: 12}, (_, i) => {
									const mesFecha = new Date(2026, i, 1) // Año hardcodeado o dinámico según necesites

									return (
										<CalendarCard
											key={i}
											month={mesFecha}
											events={loading ? [] : eventos} // Sin filtro de periodo
											hasNavigation={false} // En vista anual no queremos botones prev/next
											className="h-full"
										/>
									)
								})}
							</section>
						}
					</TabsContent>
				))}
			</Tabs>

			<aside className="mt-4">
				<Alert
					color="info"
					icon={<IconInfoCircle />}
					title="Información Importante"
					canClose={false}
					description={
						<span>
							Fechas extraídas de la resolución: <b>RES - 2025 - 944 - CD-EXA # UNNE.</b>
						</span>
					}
				/>
			</aside>
		</section>
	)
}
