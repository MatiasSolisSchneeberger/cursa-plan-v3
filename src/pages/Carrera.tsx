import {useEffect, useMemo} from "react"
import {useParams, useSearchParams} from "react-router-dom"
import HeaderCarrera from "../sections/HeaderCarrera"
import Button from "../components/Button"
import {usePageTitle} from "../hooks/usePageTitle"
import AniosGrid from "../sections/AniosGrid"
import Cargando from "../sections/Cargando"
import Alert from "../components/Alert"
import {IconCode, IconExternalLink} from "@tabler/icons-react"
import {useCarrera} from "../hooks/useCarrera"
import {useAuth} from "../context/AuthContextData"

export default function Carrera() {
	const {carreraSlug} = useParams<{carreraSlug: string}>()
	const [searchParams, setSearchParams] = useSearchParams()
	const {session} = useAuth()

	// --- AQUÍ LA MAGIA DE TANSTACK QUERY ---
	// isLoading: true mientras carga la primera vez
	// data: contiene tu JSON ya transformado (o undefined si carga/error)
	// isError: true si falló la promesa
	const {data: carreraJson, isLoading, isError} = useCarrera(carreraSlug)

	const planAnioParam = searchParams.get("plan")
	const orientacionSlugParam = searchParams.get("orientacion")

	/**
	 * Actualiza el título de la página.
	 * usePageTitle automáticamente agrega " - CursaPlan" al final si no se especifica lo contrario.
	 */
	usePageTitle(isLoading ? "CursaPlan" : carreraJson?.carrera || "", true)

	// --- LÓGICA DE SELECCIÓN DE PLAN ---
	/**
	 * Determina el plan de estudios activo basado en los parámetros de búsqueda o por defecto.
	 */
	const planActivo = useMemo(() => {
		if (!carreraJson || !carreraJson.planes || carreraJson.planes.length === 0) return undefined

		// 1. Si existe parámetro URL, buscamos ese plan
		if (planAnioParam) {
			const found = carreraJson.planes.find((p) => p.anioInicio === Number(planAnioParam))
			if (found) return found
		}

		// 2. Si no, tomamos el más reciente por defecto (ordenando por año descendente)
		// Usamos [...copia] para no mutar el array original que viene de React Query (que es inmutable)
		return [...carreraJson.planes].sort((a, b) => b.anioInicio - a.anioInicio)[0]
	}, [carreraJson, planAnioParam])

	// Sincronizar URL solo cuando ya tenemos datos y falta el plan
	useEffect(() => {
		if (planActivo && !planAnioParam) {
			setSearchParams(
				(prev) => {
					const newParams = new URLSearchParams(prev)
					newParams.set("plan", planActivo.anioInicio.toString())
					return newParams
				},
				{replace: true},
			)
		}
	}, [planActivo, planAnioParam, setSearchParams])

	// --- HANDLERS ---

	/**
	 * Maneja el cambio de plan de estudios.
	 * @param anio - El año de inicio del nuevo plan.
	 */
	const handlePlanChange = (anio: number) => {
		setSearchParams({plan: anio.toString()})
	}

	/**
	 * Maneja la selección o deselección de una orientación.
	 * @param slug - El slug de la orientación seleccionada.
	 */
	const handleOrientacionChange = (slug: string) => {
		if (!planActivo) return

		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev)
			newParams.set("plan", planActivo.anioInicio.toString()) // Asegurar plan

			if (orientacionSlugParam === slug) {
				newParams.delete("orientacion") // Toggle off
			} else {
				newParams.set("orientacion", slug) // Select new
			}
			return newParams
		})
	}

	// --- FUNCIONES ---

	/**
	 * Desplaza la vista hacia la sección del año especificado.
	 * @param anio - El número del año al que desplazarse.
	 */
	const goToAnio = (anio: number) => {
		const element = document.getElementById(anio.toString())
		if (element) {
			element.scrollIntoView({behavior: "smooth"})
		}
	}

	// --- RENDER ---
	if (isLoading) return <Cargando />

	if (isError || !carreraJson) {
		return (
			<section className="w-full h-[calc(100vh-12rem)] flex items-center justify-center gap-3">
				<span className="text-text-900 dark:text-text-100 texto-label">
					Ups! Algo salió mal. Parece que no se encontró la información de la carrera.
				</span>
			</section>
		)
	}

	// Si no hay plan activo (caso raro si carreraJson existe pero no tiene planes), manejamos
	if (!planActivo) {
		return (
			<section className="w-full h-[calc(100vh-12rem)] flex items-center justify-center gap-3">
				<span className="text-text-900 dark:text-text-100 texto-label">
					No se encontraron planes de estudio para esta carrera.
				</span>
			</section>
		)
	}

	const linkError = `/contacto?etiqueta=error&mensaje=Error en la carrera ${carreraJson.carrera}&usuario=${session?.user?.user_metadata?.full_name}&email=${session?.user?.user_metadata?.email}`

	return (
		<section className="flex flex-col gap-6 items-center">
			<HeaderCarrera
				name={carreraJson.carrera}
				icon={carreraJson.icon}
				planes={carreraJson.planes}
				currentPlanAnio={planActivo.anioInicio}
				onPlanSelect={handlePlanChange}
				plan={planActivo}
				currentOrientacionSlug={orientacionSlugParam}
				onOrientacionSelect={handleOrientacionChange}
				planId={planActivo.id}
			/>

			<Alert
				color="warning"
				icon={<IconCode />}
				title="Sección en Construcción"
				description={
					<>
						<span>
							Esta información puede tener errores. <strong>Revisar con la resolucion oficial de la facultad.</strong>
						</span>
						<br />
						<br />
						<span>Estamos trabajando para tener la informacion correcta.</span>
					</>
				}
				canClose={true}
				endContent={
					<>
						<Button iconRight={<IconExternalLink />} color="warning" variant="text" href={linkError}>
							Avisar error
						</Button>
					</>
				}
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
