import {useNavigate, useParams} from "react-router-dom"
import supabase from "../utils/supabase"
import {useEffect, useState} from "react"

type CarreraData = {
	id: string
	nombre: string
	slug: string
	emojie: string
}

export function PaginaCarrera() {
	const {carreraSlug} = useParams()
	const navigate = useNavigate()

	const [carreraInfo, setCarreraInfo] = useState<CarreraData | null>(null)
	const [loading, setLoading] = useState(true)

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

	// Renderizado condicional
	if (loading) return <div className="p-10 text-center">Cargando información de la carrera...</div>

	// Si loading es false pero carreraInfo es null, el useEffect ya habrá disparado la navegación,
	// pero retornamos null para evitar parpadeos.
	if (!carreraInfo) return null

	return <section className={`w-full h-full theme-${carreraInfo.slug}`}></section>
}
