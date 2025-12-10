import {useEffect, useState} from "react" // 1. Importar hooks
import CardCarrera, {CardCarreraSkeleton} from "../components/CardCarrera"
import supabase from "../utils/supabase"

interface carreraType {
	id: number
	nombre: string
	slug: string
	emojie: string
}

export default function ListadoCarreras() {
	// 2. Estado para guardar los datos
	const [carreras, setCarreras] = useState<carreraType[]>([])
	const [loading, setLoading] = useState(true) // Opcional: para mostrar carga

	useEffect(() => {
		// 3. Crear la función asíncrona DENTRO del useEffect
		const fetchCarreras = async () => {
			try {
				const {data, error} = await supabase
					.from("carreras")
					.select("id, nombre, slug, emojie")
					.order("slug", {ascending: true})

				if (error) {
					console.log("Error al buscar carreras:", error)
				} else {
					setCarreras(data)
				}
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false) // Termina de cargar pase lo que pase
			}
		}

		fetchCarreras()
	}, []) // 4. Array vacío para que solo se ejecute al montar el componente

	return (
		<section className="relative flex w-full shrink-0 flex-col flex-wrap content-start items-center justify-center gap-6 self-stretch">
			<h2 className="texto-headline text-center text-text-950 dark:text-text-50">Carreras</h2>
			<ul className="relative grid w-full shrink-0 grid-cols-1 flex-wrap content-start items-start justify-start gap-6 self-stretch md:grid-cols-2 lg:grid-cols-3">
				{loading
					? Array.from({length: 12}).map((_, index) => <CardCarreraSkeleton key={index} />)
					: carreras.map(({id, nombre, slug, emojie}) => {
							return <CardCarrera key={id} icon={emojie} slug={slug} carrera={nombre} />
					  })}
			</ul>
		</section>
	)
}
