import {useMemo} from "react"
import {useSearchParams} from "react-router-dom"
import {usePlanData} from "../hooks/usePlanData" // <--- Importamos nuestro Hook
import type {OrientacionData} from "../types/db"
import Button from "../components/Button"
import Dropdown from "../components/Dropdown"
import DropdownTrigger from "../components/DropdownTrigger"
import DropdownContent from "../components/DropdownContent"
import Menu from "../components/Menu"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"
import {IconCalendar, IconCheck, IconChevronDown} from "@tabler/icons-react"
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import CardFooter from "../components/CardFooter"
import Chip from "../components/Chip"
// Importamos el componente visual de correlativas
import CorrelativasMateria from "../components/CorrelativasMateria"
import CardInfoList from "../components/CardInfoList"

interface Props {
	planId: string
}

export default function PlanDeEstudioView({planId}: Props) {
	// 1. Usamos el Hook: Esto trae todas las materias Y sus correlativas en una sola carga
	const {materias, loading} = usePlanData(planId)

	const [searchParams, setSearchParams] = useSearchParams()
	const orientacionSlug = searchParams.get("orientacion")

	// 2. Extraer Orientaciones
	const orientacionesDisponibles = useMemo(() => {
		const unique = new Map<number, OrientacionData>()
		materias.forEach((m) => {
			if (m.orientaciones && !unique.has(m.orientaciones.id)) {
				unique.set(m.orientaciones.id, m.orientaciones)
			}
		})
		return Array.from(unique.values()).sort((a, b) => a.nombre.localeCompare(b.nombre))
	}, [materias])

	// 3. Orientación Activa
	const orientacionActiva = useMemo(() => {
		if (orientacionSlug) {
			return orientacionesDisponibles.find((o) => o.slug === orientacionSlug)
		}
		return orientacionesDisponibles.length > 0 ? orientacionesDisponibles[0] : null
	}, [orientacionesDisponibles, orientacionSlug])

	// 4. Filtrar y Agrupar por Año
	const estructura = useMemo(() => {
		const materiasFiltradas = materias.filter((m) => {
			return m.orientacion_id === null || m.orientacion_id === orientacionActiva?.id
		})

		const porAnio: Record<number, typeof materias> = {}
		materiasFiltradas.forEach((m) => {
			if (!porAnio[m.anio]) porAnio[m.anio] = []
			porAnio[m.anio].push(m)
		})
		return porAnio
	}, [materias, orientacionActiva])

	if (loading) return <div className="p-8 text-center animate-pulse">Cargando materias...</div>

	return (
		<div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
			{/* SELECTOR DE ORIENTACIONES */}
			{orientacionesDisponibles.length > 0 && (
				<div className="flex flex-row justify-center items-center gap-4">
					<p className="texto-label text-text-600 dark:text-text-400">Orientación</p>
					<Dropdown>
						<DropdownTrigger>
							<Button variant="outlined" color="secondary" iconRight={<IconChevronDown />}>
								{orientacionActiva?.nombre || "Seleccionar orientación"}
							</Button>
						</DropdownTrigger>
						<DropdownContent>
							<Menu>
								<MenuGroup title="Orientaciones">
									{orientacionesDisponibles.map((ori) => (
										<MenuItem
											href="#"
											key={ori.id}
											onClick={() => setSearchParams({orientacion: ori.slug})}
											iconRight={ori.slug === orientacionSlug ? <IconCheck className="text-success-400" /> : null}>
											{ori.nombre}
										</MenuItem>
									))}
								</MenuGroup>
							</Menu>
						</DropdownContent>
					</Dropdown>
				</div>
			)}

			{/* BOTONES DE AÑOS */}
			<article className="flex flex-row gap-2 justify-center flex-wrap">
				{Object.keys(estructura).map((anio) => (
					<Button
						key={anio}
						onClick={() =>
							window.scrollTo({top: document.getElementById(`anio-${anio}`)?.offsetTop || 0, behavior: "smooth"})
						}
						variant="flat"
						color="primary">
						{anio}° Año
					</Button>
				))}
			</article>

			{/* GRILLA DE MATERIAS */}
			<div className="flex flex-col gap-8 w-full pb-20">
				{Object.keys(estructura).map((anio) => {
					const materiasDelAnio = estructura[Number(anio)]

					// Agrupación interna por periodo (lógica tuya preservada)
					const porNroPeriodo: Record<number, typeof materias> = {}
					materiasDelAnio.forEach((m) => {
						let sortOrder = m.nro_periodo || 0 // Default a 0 si es null
						if (m.periodo?.id === 5) sortOrder = 10 // Anual
						else if (m.periodo?.id === 6) sortOrder = 20 // Extracurricular

						if (!porNroPeriodo[sortOrder]) porNroPeriodo[sortOrder] = []
						porNroPeriodo[sortOrder].push(m)
					})

					const periodosOrdenados = Object.keys(porNroPeriodo)
						.map(Number)
						.sort((a, b) => a - b)

					return (
						<div key={anio} className="flex flex-col gap-4" id={`anio-${anio}`}>
							<div className="flex items-center gap-4">
								<h3 className="texto-headline text-primary-600 dark:text-primary-400">{anio}° Año</h3>
							</div>

							<div className="flex flex-col gap-6">
								{periodosOrdenados.map((nro) => {
									const listaMaterias = porNroPeriodo[nro]

									// Lógica de títulos
									let tituloModulo = ""
									if (nro === 10) tituloModulo = "Anuales"
									else if (nro === 20) tituloModulo = "Extracurriculares"
									else {
										const nombrePeriodo = listaMaterias[0]?.periodo?.periodo || "Periodo"
										tituloModulo = nro > 0 ? `${nro}° ${nombrePeriodo}` : nombrePeriodo
									}

									return (
										<div key={nro} className="flex flex-col gap-3">
											<h4 className="texto-title text-text-600 dark:text-text-400 uppercase tracking-wider">
												{tituloModulo}
											</h4>

											<ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
												{listaMaterias.map((m) => (
													<li key={m.id}>
														<Card>
															<CardHeader color="primary">{m.materias.nombre}</CardHeader>
															<CardBody>
																<aside className="flex gap-1 flex-wrap mb-2">
																	{m.orientacion_id && <Chip color="secondary">{orientacionActiva?.nombre}</Chip>}
																	{m.nro_optativa && <Chip color="secondary">Optativa {m.nro_optativa}</Chip>}
																</aside>

																{/* AQUI ESTÁ LA MAGIA: Renderizamos las correlativas que vienen del hook */}
																<CorrelativasMateria correlativas={m.correlativas} />
															</CardBody>
															<CardFooter>
																<span className="grid grid-cols-1 sm:grid-cols-2 gap-2">
																	<CardInfoList title="Plan de estudio" color="tertiary">
																		<section className="p-2 w-full flex flex-col gap-2">
																			<span className="texto-body w-full text-text-600 dark:text-text-400 text-center">
																				Plan de estudio:
																			</span>
																			<Button variant="outlined" color="primary">
																				Ver
																			</Button>
																		</section>
																	</CardInfoList>
																	<CardInfoList title="Proxima fecha de examen" color="tertiary">
																		<section className="p-2 w-full flex flex-col gap-2">
																			<span className="texto-body w-full text-text-600 dark:text-text-400 text-center">
																				00/00/0000
																			</span>
																			<span className="flex flex-col gap-2">
																				<Button variant="outlined" color="primary" iconRight={<IconCalendar />}>
																					Agendar
																				</Button>
																				<Button variant="outlined" color="secondary">
																					Ver Mas
																				</Button>
																			</span>
																		</section>
																	</CardInfoList>
																</span>
															</CardFooter>
														</Card>
													</li>
												))}
											</ul>
										</div>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
