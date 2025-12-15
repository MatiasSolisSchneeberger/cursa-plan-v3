import HeaderCarrera from "../sections/HeaderCarrera"
import Button from "../components/Button"
import ButtonGroup from "../components/ButtonGroup"
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import CardFooter from "../components/CardFooter"
import CardInfoList from "../components/CardInfoList"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"

import {useParams, useSearchParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {GET_CARRERA_QUERY} from "../utils/quieries"
import {transformarCarrera, type SalidaCarrera, type SalidaPlan} from "../utils/transformData"

export function PaginaCarrera() {
	const {carreraSlug} = useParams()
	const [data, setData] = useState<SalidaCarrera | null>(null)
	const [loading, setLoading] = useState(true)
	const [searchParams, setSearchParams] = useSearchParams()

	const planAnioParam = searchParams.get("plan")
	const orientacionSlugParam = searchParams.get("orientacion")

	useEffect(() => {
		const load = async () => {
			setLoading(true)
			const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
					Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
				},
				body: JSON.stringify({
					query: GET_CARRERA_QUERY,
					variables: {slug: carreraSlug},
				}),
			})
			const json = await response.json()
			const estructuraLimpia = transformarCarrera(json.data)
			setData(estructuraLimpia)
			setLoading(false)
		}
		load()
	}, [carreraSlug])

	// --- LÓGICA DE SELECCIÓN POR DEFECTO ---
	useEffect(() => {
		if (!data) return

		let nuevoParams = new URLSearchParams(searchParams)
		let cambioNecesario = false

		// 1. Si no hay plan en URL, seleccionar el más reciente
		let planActual: SalidaPlan | undefined
		if (!planAnioParam) {
			// Ordenar planes por año descendente para tomar el último
			const planesOrdenados = [...data.planes].sort((a, b) => b.anioInicio - a.anioInicio)
			planActual = planesOrdenados[0]
			if (planActual) {
				nuevoParams.set("plan", planActual.anioInicio.toString())
				cambioNecesario = true
			}
		} else {
			planActual = data.planes.find((p) => p.anioInicio.toString() === planAnioParam)
		}

		// 2. Si hay plan, asegurar que haya una orientación seleccionada
		if (planActual) {
			if (!orientacionSlugParam) {
				// Seleccionar por defecto: Tronco Común si existe, sino la primera
				const orientacionDefault =
					planActual.orientaciones.find((o) => o.id === "sin-orientaciones") || planActual.orientaciones[0]

				if (orientacionDefault) {
					nuevoParams.set("orientacion", orientacionDefault.slug)
					cambioNecesario = true
				}
			}
		}

		if (cambioNecesario) {
			setSearchParams(nuevoParams, {replace: true})
		}
	}, [data, planAnioParam, orientacionSlugParam, searchParams, setSearchParams])

	if (loading) return <div className="p-10 text-center">Cargando...</div>
	if (!data) return <div className="p-10 text-center">Carrera no encontrada</div>

	// Obtener objetos basados en la URL actual
	const planSeleccionado = data.planes.find((p) => p.anioInicio.toString() === planAnioParam)
	const orientacionSeleccionada = planSeleccionado?.orientaciones.find((o) => o.slug === orientacionSlugParam)

	const handlePlanChange = (anio: string) => {
		setSearchParams((prev) => {
			prev.set("plan", anio)
			prev.delete("orientacion") // Limpiar orientación al cambiar de plan para que el efecto recalcule
			return prev
		})
	}

	const handleOrientacionChange = (slug: string) => {
		setSearchParams((prev) => {
			prev.set("orientacion", slug)
			return prev
		})
	}

	// Si la URL tiene basura o ids viejos
	if (!planSeleccionado && planAnioParam) return <div>Plan no encontrado</div>

	return (
		<section className={`w-full min-h-screen theme-${carreraSlug} flex flex-col items-center gap-12 pb-20`}>
			<HeaderCarrera name={data.carrera} icon={data.emoji} />

			{/* --- SELECTOR DE PLAN --- */}
			{data.planes.length > 1 && (
				<div className="w-full flex justify-center px-4">
					<ButtonGroup>
						{data.planes.map((plan) => (
							<Button
								key={plan.id}
								onClick={() => handlePlanChange(plan.anioInicio.toString())}
								color="primary"
								variant={planSeleccionado?.id === plan.id ? "solid" : "outlined"}>
								Plan {plan.anioInicio}
							</Button>
						))}
					</ButtonGroup>
				</div>
			)}

			{/* --- SELECTOR DE ORIENTACIÓN --- */}
			{planSeleccionado && planSeleccionado.orientaciones.length > 1 && (
				<div className="w-full flex justify-center px-4">
					<ButtonGroup>
						{planSeleccionado.orientaciones.map((orientacion) => (
							<Button
								key={orientacion.id}
								onClick={() => handleOrientacionChange(orientacion.slug)}
								color="secondary"
								variant={orientacionSeleccionada?.id === orientacion.id ? "solid" : "outlined"}>
								{orientacion.nombre}
							</Button>
						))}
					</ButtonGroup>
				</div>
			)}

			{/* --- VISTA DE MATERIAS --- */}
			{orientacionSeleccionada ? (
				<article className="w-full px-4 flex flex-col gap-10">
					{orientacionSeleccionada.anios.map((anioData) => (
						<section key={anioData.anio} className="flex flex-col gap-6">
							<h2 className="text-2xl font-bold text-primary-700 dark:text-primary-300 border-b pb-2">
								{anioData.anio}° Año
							</h2>

							{/* Periodos */}
							{anioData.periodos.map((periodo) => (
								<div key={`${periodo.id}-${periodo.nroPeriodo}`}>
									<h3 className="text-lg font-semibold text-gray-500 mb-4 uppercase tracking-wider">
										{periodo.tipoPeriodo} {periodo.nroPeriodo > 0 ? periodo.nroPeriodo : ""}
									</h3>

									<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
										{periodo.materias.map((materia) => (
											<Card key={materia.id}>
												<CardHeader color="primary">{materia.nombre}</CardHeader>
												<CardBody>
													{/* Mostrar Correlativas */}
													<div className="space-y-2">
														{renderCorrelativasGroup(materia.correlativas, "cursar", "Para Cursar")}
														{renderCorrelativasGroup(materia.correlativas, "rendir", "Para Rendir")}
													</div>
												</CardBody>
												<CardFooter>
													<Button className="w-full" variant="outlined">
														Ver Más
													</Button>
												</CardFooter>
											</Card>
										))}
									</div>
								</div>
							))}
						</section>
					))}
				</article>
			) : (
				<div className="text-center text-gray-500 mt-10">Selecciona una orientación para ver las materias.</div>
			)}
		</section>
	)
}

// Helper para las correlativas dentro del componente
function renderCorrelativasGroup(correlativas: any[], tipo: string, titulo: string) {
	const filtradas = correlativas.filter((c: any) => c.tipo === tipo)
	if (filtradas.length === 0) return null

	const regular = filtradas.filter((c: any) => c.condicion === "regular")
	const aprobado = filtradas.filter((c: any) => c.condicion === "aprobado")

	return (
		<CardInfoList title={titulo} color={tipo === "cursar" ? "secondary" : "warning"}>
			{regular.length > 0 && (
				<MenuGroup title="Regular">
					{regular.map((c: any, i: number) => (
						<MenuItem key={i}>{c.requisito || "Desconocida"}</MenuItem>
					))}
				</MenuGroup>
			)}
			{aprobado.length > 0 && (
				<MenuGroup title="Aprobado">
					{aprobado.map((c: any, i: number) => (
						<MenuItem key={i}>{c.requisito || "Desconocida"}</MenuItem>
					))}
				</MenuGroup>
			)}
		</CardInfoList>
	)
}
