// src/pages/Materia.tsx
import {useEffect, useState, useMemo} from "react"
import {useParams, useSearchParams} from "react-router-dom"
import ConfigLayout from "../layout/ConfigLayout"
import {getMateriaTabs} from "../sections/materia/materiaConfig"
import Cargando from "../sections/Cargando"
import {fechaProxima} from "../scripts/fechaProxima"
import supabase from "../utils/supabase"

// ... imports de supabase, hooks, etc ...

export default function Materia() {
	const {materiaSlug, planSlug, carreraSlug} = useParams()
	const [loading, setLoading] = useState(true)
	const [notFound, setNotFound] = useState(false)
	const [materia, setMateria] = useState<any>(null)
	const [nextExam, setNextExam] = useState<any>(null)

	useEffect(() => {
		const fetchMateria = async () => {
			setLoading(true)
			setNotFound(false)

			const {data, error} = await supabase
				.from("materia_plan")
				.select(
					`
					id,
					materias!inner(nombre, slug, fechas_examenes(fecha)),
					plan_estudio!inner(
						anio_inicio,
						carreras!inner(slug, nombre)
					)
				`,
				)
				.eq("materias.slug", materiaSlug)
				.eq("plan_estudio.anio_inicio", planSlug)
				.eq("plan_estudio.carreras.slug", carreraSlug)
				.maybeSingle()

			const {data: feriados} = await supabase.from("feriados").select("fecha")

			if (error) {
				console.error("Error fetching materia:", error)
			}

			if (!data) {
				setNotFound(true)
			} else {
				setMateria(data as any)

				// Calcular próxima fecha
				const fechas = (data as any).materias?.fechas_examenes || []
				const fechasArray = Array.isArray(fechas) ? fechas : [fechas]
				setNextExam(fechaProxima(fechasArray, feriados || []))
			}
			setLoading(false)
		}

		if (materiaSlug && planSlug && carreraSlug) {
			fetchMateria()
		} else {
			setNotFound(true)
			setLoading(false)
		}
	}, [materiaSlug, planSlug, carreraSlug])

	// Generamos la configuración de tabs inyectándole la data
	const tabsConfig = useMemo(() => {
		if (!materia) return []
		return getMateriaTabs(materia, nextExam)
	}, [materia, nextExam])

	// --- LOGIC FOR TAB SELECTION ---
	const [searchParams, setSearchParams] = useSearchParams()
	const tabParam = searchParams.get("tab")

	// Default to "info" if no tab is selected
	const activeTab = tabParam || "info"

	// LÓGICA PARA RENDERIZAR EL CONTENIDO
	const renderContent = () => {
		// 1. Buscamos si el activeTab coincide con un ID Padre (ej: "recursos")
		const parentTab = tabsConfig.find((t) => t.id === activeTab)
		if (parentTab) return parentTab.component

		// 2. Si no es padre, buscamos si es un Hijo (ej: "parciales_practicos")
		for (const tab of tabsConfig) {
			const subItem = tab.subItems?.find((sub) => sub.id === activeTab)
			if (subItem?.component) {
				return subItem.component
			}
		}
		return <div>Sección no encontrada</div>
	}

	const handleTabChange = (id: string) => {
		setSearchParams({tab: id}, {replace: true})
	}

	if (!materia || loading) return <Cargando />

	return (
		<ConfigLayout
			title={materia.materias.nombre}
			tabs={tabsConfig}
			activeTab={activeTab}
			onTabChange={handleTabChange}
			backLink={`/carreras/${carreraSlug}?plan=${planSlug}`}>
			{renderContent()}
		</ConfigLayout>
	)
}
