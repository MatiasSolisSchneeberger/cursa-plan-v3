import {useEffect, useState} from "react"
import supabase from "../utils/supabase"
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"

export default function MesasExamenes() {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState<any>([])

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			const {data, error} = await supabase
				.from("fechas_examenes")
				.select(
					`
                id,
                materia_id: materias(
                    id,
                    nombre,
                    slug
                ),
                fecha
            `
				)
				.order("materia_id", {ascending: true})
				.order("fecha", {ascending: true})

			if (error) {
				console.error(error)
			}

			setData(data)
		}

		fetchData()
		setLoading(false)
	}, [])

	return (
		<section>
			<h1 className="texto-display text-text-900 dark:text-text-100">Mesas de Examen</h1>
			{/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
			{loading && <p>Cargando...</p>}
			{data.length === 0 && <p>No hay mesas de examen</p>}
			{data.map((fecha: any) => (
				<Card key={fecha.id} color="primary">
					<CardHeader color="primary">{fecha.materia_id.nombre}</CardHeader>
				</Card>
			))}
		</section>
	)
}
