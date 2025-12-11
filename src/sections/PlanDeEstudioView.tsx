import {useEffect, useMemo, useState} from "react"
import {useSearchParams} from "react-router-dom"
import supabase from "../utils/supabase"
import type {MateriaPlanRow, OrientacionData} from "../types/db"
import ButtonGroup from "../components/ButtonGroup"
import Button from "../components/Button"

interface Props {
	planId: string
}

export default function PlanDeEstudioView({planId}: Props) {
	const [materias, setMaterias] = useState<MateriaPlanRow[]>([])
	const [loading, setLoading] = useState(true)

	const [searchParams, setSearchParams] = useSearchParams()

	// Estado derivado de la URL
	const orientacionSlug = searchParams.get("orientacion")

	// 1. FETCH DE MATERIAS
	useEffect(() => {
		const fetchMaterias = async () => {
			setLoading(true)
			const {data, error} = await supabase
				.from("materia_plan")
				.select(
					`
                    id, anio, nro_periodo, orientacion_id, nro_optativa,
                    materias (id, nombre, slug),
                    periodo (id, periodo),
                    orientaciones (id, nombre, slug)
                `
				)
				.eq("plan_id", planId)
				// Ordenamos para que la grilla salga ordenada visualmente
				.order("anio", {ascending: true})
				.order("periodo_id", {ascending: true})
				.order("nro_periodo", {ascending: true})

			if (!error && data) {
				// Casteamos a nuestro tipo para que TS no se queje
				setMaterias(data as unknown as MateriaPlanRow[])
			}
			setLoading(false)
		}

		fetchMaterias()
	}, [planId])

	// 2. EXTRAER ORIENTACIONES DISPONIBLES (Memoizado para no recalcular)
	const orientacionesDisponibles = useMemo(() => {
		const unique: OrientacionData[] = []
		const map = new Map()

		materias.forEach((m) => {
			if (m.orientaciones && !map.has(m.orientaciones.id)) {
				map.set(m.orientaciones.id, true)
				unique.push(m.orientaciones)
			}
		})
		return unique.sort((a, b) => a.nombre.localeCompare(b.nombre))
	}, [materias])

	// 3. DETERMINAR ORIENTACIÓN ACTIVA
	const orientacionActiva = useMemo(() => {
		if (orientacionSlug) {
			const found = orientacionesDisponibles.find((o) => o.slug === orientacionSlug)
			if (found) return found
		}
		// Default: La primera de la lista
		return orientacionesDisponibles.length > 0 ? orientacionesDisponibles[0] : null
	}, [orientacionesDisponibles, orientacionSlug])

	// 4. FILTRAR Y AGRUPAR LAS MATERIAS (El corazón de la lógica)
	const estructura = useMemo(() => {
		// A. Primero filtramos las materias según la orientación seleccionada
		const materiasFiltradas = materias.filter((m) => {
			// Mostramos la materia si:
			// 1. No tiene orientación (es Tronco Común)
			// 2. O coincide con la orientación seleccionada
			return m.orientacion_id === null || m.orientacion_id === orientacionActiva?.id
		})

		// B. Agrupamos por AÑO
		const porAnio: Record<number, MateriaPlanRow[]> = {}

		materiasFiltradas.forEach((m) => {
			if (!porAnio[m.anio]) porAnio[m.anio] = []
			porAnio[m.anio].push(m)
		})

		return porAnio
	}, [materias, orientacionActiva])

	if (loading) return <div className="p-8 text-center animate-pulse">Cargando materias...</div>

	return (
		<div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
			{/* SELECTOR DE ORIENTACIONES (Solo si existen) */}
			{orientacionesDisponibles.length > 0 && (
				<div className="flex flex-col items-center gap-2">
					<p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Orientación</p>
					<ButtonGroup>
						{/* Botón para ver todo (o Tronco común si prefieres) */}
						{orientacionesDisponibles.map((ori) => (
							<Button
								key={ori.nombre}
								onClick={() => {
									setSearchParams((prev: URLSearchParams) => {
										const newParams = new URLSearchParams(prev)
										newParams.set("orientacion", ori.slug)
										return newParams
									})
								}}
								variant={orientacionActiva?.id === ori.id ? "solid" : "outlined"}
								color={orientacionActiva?.id === ori.id ? "primary" : "secondary"}>
								{ori.nombre}
							</Button>
						))}
					</ButtonGroup>
				</div>
			)}

			{/* GRILLA DE MATERIAS POR AÑO */}
			<div className="flex flex-col gap-8 w-full">
				{Object.keys(estructura).map((anio) => {
					const materiasDelAnio = estructura[Number(anio)]

					// --- NUEVA LÓGICA AQUÍ: Agrupar por nro_periodo ---

					// 1. Creamos un diccionario donde la clave es el nro_periodo (ej: 1, 2, 0)
					const porNroPeriodo: Record<number, MateriaPlanRow[]> = {}

					materiasDelAnio.forEach((m) => {
						// Si es nulo, le ponemos 0 u otro número para agruparlo
						const nro = m.nro_periodo ?? 0
						if (!porNroPeriodo[nro]) porNroPeriodo[nro] = []
						porNroPeriodo[nro].push(m)
					})

					// 2. Obtenemos las claves (los números) y las ordenamos numéricamente
					const periodosOrdenados = Object.keys(porNroPeriodo)
						.map(Number)
						.sort((a, b) => a - b) // Orden ascendente: 0, 1, 2...

					return (
						<div key={anio} className="flex flex-col gap-4">
							{/* Título del Año */}
							<div className="flex items-center gap-4">
								<h3 className="text-2xl font-bold text-primary-800 dark:text-primary-200">{anio}° Año</h3>
								<div className="h-px bg-primary-200 dark:bg-primary-800 flex-1" />
							</div>

							{/* Contenedor de Periodos (Grid) */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
								{periodosOrdenados.map((nro) => {
									const listaMaterias = porNroPeriodo[nro]
									// Sacamos el nombre "bonito" del primer elemento del grupo (ej: "1er Cuatrimestre")
									// Si no tiene nombre, ponemos un fallback
									const nombrePeriodo = listaMaterias[0]?.periodo?.periodo || "Materias Anuales"

									return (
										<div
											key={nro}
											className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-3">
											{/* Título del Periodo (ej: Primer Cuatrimestre) */}
											<h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">
												{nro > 0 ? nro + "° " + nombrePeriodo : "Anual"}
											</h4>

											{/* Lista de Materias de ese periodo */}
											<ul className="flex flex-col gap-2">
												{listaMaterias.map((m) => (
													<li
														key={m.id}
														className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
														{/* Iconito indicador */}
														<div
															className={`w-2 h-2 rounded-full shrink-0 ${
																m.orientacion_id ? "bg-secondary-400" : "bg-primary-400"
															}`}
														/>

														<span className="text-sm md:text-base text-gray-700 dark:text-gray-200 font-medium leading-snug">
															{m.materias.nombre}
														</span>

														{/* Badge Orientación (si aplica) */}
														{m.orientaciones && (
															<span className="ml-auto text-[10px] px-2 py-0.5 bg-secondary-100 dark:bg-secondary-900/50 text-secondary-700 dark:text-secondary-300 rounded-full whitespace-nowrap">
																{m.orientaciones.nombre}
															</span>
														)}

														{m.tipo && (
															<span className="ml-auto text-[10px] px-2 py-0.5 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full whitespace-nowrap">
																{m.tipo}
															</span>
														)}

														{m.nro_optativa && (
															<span className="ml-auto text-[10px] px-2 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full whitespace-nowrap">
																Optativa {m.nro_optativa}
															</span>
														)}
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

			{/* Mensaje vacío */}
			{Object.keys(estructura).length === 0 && (
				<div className="text-center text-gray-500 py-10 italic">No hay materias cargadas para esta selección.</div>
			)}
		</div>
	)
}
