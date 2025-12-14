import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import supabase from "../utils/supabase"
import {useEffect, useState} from "react"
import HeaderCarrera from "../sections/HeaderCarrera"
import Button from "../components/Button"
import ButtonGroup from "../components/ButtonGroup"
import PlanDeEstudioView from "../sections/PlanDeEstudioView"
import {IconLoader2} from "@tabler/icons-react"
import type {CarreraData, PlanEstudioData} from "../types/db"

export function PaginaCarrera() {
	const {carreraSlug} = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	const [carreraInfo, setCarreraInfo] = useState<CarreraData | null>(null)
	const [planEstudio, setPlanEstudio] = useState<PlanEstudioData[] | null>(null)
	const [loading, setLoading] = useState(true)

	// --- useEffects ---
	// Obtenemos la información de la carrera
	useEffect(() => {
		const fetchCarrera = async () => {
			if (!carreraSlug) return

			setLoading(true)

			const {data, error} = await supabase
				.from("carreras")
				.select("id, nombre, slug, emojie")
				.eq("slug", carreraSlug)
				.single()

			if (error || !data) {
				console.error("Error al obtener la carrera:", error)
				navigate("/404", {replace: true})
			} else {
				setCarreraInfo(data)
			}

			setLoading(false)
		}

		fetchCarrera()
	}, [carreraSlug, navigate])

	// Obtenemos el plan de estudio
	useEffect(() => {
		const fetchPlanEstudio = async () => {
			if (!carreraSlug) return

			setLoading(true)

			const {data, error} = await supabase
				.from("plan_estudio")
				.select("id, carrera_id, anio_inicio, anio_fin")
				.eq("carrera_id", carreraInfo?.id)

			if (error || !data) {
				console.error("Error al obtener el plan de estudio:", error)
			} else {
				setPlanEstudio(data)
			}

			setLoading(false)
		}

		fetchPlanEstudio()
	}, [carreraInfo?.id, navigate])

	// LÓGICA DE SELECCIÓN DE PLAN
	const planAnioUrl = searchParams.get("plan")

	// Buscamos en el array usando 'anio_inicio' en vez de 'id'
	const planActivo = planEstudio?.find((p) => p.anio_inicio.toString() === planAnioUrl) || planEstudio?.[0] // Fallback al más nuevo

	if (loading)
		return (
			<div className="p-10 text-center h-full w-full flex items-center justify-center gap-2">
				<IconLoader2 className="animate-spin" size={32} />
				<p className="text-lg font-bold">Cargando...</p>
			</div>
		)
	if (!carreraInfo) return null
	return (
		<section className={`w-full min-h-screen theme-${carreraInfo.slug} flex flex-col items-center gap-12`}>
			<HeaderCarrera name={carreraInfo.nombre} icon={carreraInfo.emojie} />

			{/* --- SELECTOR DE PLAN --- */}
			{planEstudio && planEstudio.length > 1 && (
				<div className="w-full flex justify-center px-4">
					<ButtonGroup>
						{planEstudio.map((plan) => {
							// Comparamos IDs para saber cuál pintar (es más seguro)
							const isActive = planActivo?.id === plan.id

							return (
								<Button
									key={plan.id}
									// --- CAMBIO 2: Guardamos el AÑO en la URL ---
									onClick={() => setSearchParams({plan: plan.anio_inicio.toString()})}
									color="primary"
									variant={isActive ? "solid" : "outlined"}>
									Plan {plan.anio_inicio}
								</Button>
							)
						})}
					</ButtonGroup>
				</div>
			)}

			{/* --- VISTA DEL PLAN --- */}
			<article className="w-full">
				{planActivo ? (
					<PlanDeEstudioView key={planActivo.id} planId={planActivo.id.toString()} />
				) : (
					<p className="text-center">No hay plan activo</p>
				)}
			</article>
		</section>
	)
}
