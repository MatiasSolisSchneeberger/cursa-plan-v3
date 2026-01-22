import {useEffect, useState, useMemo} from "react"
import {useParams, useSearchParams} from "react-router-dom"
import {getCarreraBySlug} from "../scripts/getCarreraBySlug"
import {transformarDatos} from "../scripts/transformData"
import type {CarreraJSON, PlanJSON} from "../types/db"
import HeaderCarrera from "../sections/HeaderCarrera"
import Button from "../components/Button"
import {usePageTitle} from "../hooks/usePageTitle"
import PlanSelector from "../sections/PlanSelector"
import OrientacionSelector from "../sections/OrientacionSelector"
import AniosGrid from "../sections/AniosGrid"
import Cargando from "../sections/Cargando"
import LikeButton from "../components/LikeButton"

export default function Carrera() {
	const {carreraSlug} = useParams<{carreraSlug: string}>()
	const [searchParams, setSearchParams] = useSearchParams()

	// Params URL
	const planAnioParam = searchParams.get("plan")
	const orientacionSlugParam = searchParams.get("orientacion")

	const [carreraJson, setCarreraJson] = useState<CarreraJSON | null>(null)
	const [loading, setLoading] = useState(true)
	usePageTitle(loading ? "CursaPlan" : `${carreraJson?.carrera || ""} - CursaPlan`)

	useEffect(() => {
		const fetchData = async () => {
			if (!carreraSlug) return
			try {
				const rawData = await getCarreraBySlug(carreraSlug)
				if (rawData) setCarreraJson(transformarDatos(rawData))
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [carreraSlug])

	// --- SELECCIONAR PLAN MAS NUEVO POR DEFECTO ---
	useEffect(() => {
		if (carreraJson && !planAnioParam) {
			// Encontrar el plan mas nuevo (mayor anioInicio)
			const newestPlan = carreraJson.planes.reduce((prev, current) =>
				prev.anioInicio > current.anioInicio ? prev : current,
			)
			if (newestPlan) {
				setSearchParams({plan: newestPlan.anioInicio.toString()}, {replace: true})
			}
		}
	}, [carreraJson, planAnioParam, setSearchParams])

	// --- LÓGICA DE SELECCIÓN ---
	const planActivo = useMemo<PlanJSON | undefined>(() => {
		if (!carreraJson) return undefined
		// Busca el plan por año, o devuelve el primero por defecto
		return planAnioParam ?
				carreraJson.planes.find((p) => p.anioInicio === Number(planAnioParam))
			:	carreraJson.planes[0]
	}, [carreraJson, planAnioParam])

	// Handlers
	const handlePlanChange = (anio: number) => {
		// Al cambiar plan, reseteamos orientación
		setSearchParams({plan: anio.toString()})
	}
	const handleOrientacionChange = (slug: string) => {
		// Si clickean la misma que ya está, la quitamos (toggle)
		const nuevoSlug = orientacionSlugParam === slug ? "" : slug
		if (planActivo) {
			// Eliminamos la clave 'orientacion' si está vacía para limpiar la URL
			const params: any = {plan: planActivo.anioInicio.toString()}
			if (nuevoSlug) params.orientacion = nuevoSlug
			setSearchParams(params)
		}
	}

	const goToAnio = (anio: number) => {
		document.getElementById(anio.toString())?.scrollIntoView({behavior: "smooth"})
	}

	if (loading) return <Cargando />
	if (!planActivo)
		return (
			<section className="w-full h-[calc(100vh-12rem)] flex items-center justify-center gap-3">
				<span className="text-text-900 dark:text-text-100 texto-label">
					Ups! Algo salió mal. Parece que no se encontró la información.
				</span>
			</section>
		)

	return (
		<section className="flex flex-col gap-6">
			<HeaderCarrera name={carreraJson?.carrera || ""} icon={carreraJson?.icon || ""} />

			{/* --- SELECTOR DE PLAN --- */}
			{carreraJson?.planes && (
				<PlanSelector planes={carreraJson.planes} currentPlanAnio={planActivo.anioInicio} onSelect={handlePlanChange} />
			)}

			<div className="flex flex-col justify-center items-center gap-2">
				<span className="texto-label">Guardar carrera (plan de estudio)</span>
				<LikeButton planId={planActivo.id} />
			</div>

			{/* --- SELECTOR DE ORIENTACIÓN --- */}
			<OrientacionSelector
				plan={planActivo}
				currentOrientacionSlug={orientacionSlugParam}
				onSelect={handleOrientacionChange}
			/>

			{/* --- BOTONES DE AÑOS --- */}
			<article className="flex flex-wrap gap-2 items-center justify-center">
				{planActivo.anios.map((anio) => (
					<Button key={anio.anio} color="tertiary" onClick={() => goToAnio(anio.anio)} variant="outlined">
						{anio.anio}° Año
					</Button>
				))}
			</article>

			{/* --- GRILLA DE AÑOS --- */}
			<AniosGrid
				anios={planActivo.anios}
				orientacionSlug={orientacionSlugParam}
				carreraSlug={carreraSlug || ""}
				planAnio={planActivo.anioInicio}
			/>
		</section>
	)
}
