/*import {useEffect, useState} from "react"*/
import {useAuth} from "../context/AuthContext"
/*import supabase from "../utils/supabase"*/

export default function Profile() {
	const {session} = useAuth()

	const user = session?.user.user_metadata

	/*const [carrera, setCarrera] = useState<any[]>([])*/

	/*useEffect(() => {
		async function fetchCarrera() {
			const {data, error} = await supabase
				.from("carreras")
				.select("id,nombre,slug,icon")
				.order("nombre", {ascending: true})

			if (error) {
				console.error("Error al obtener carreras:", error)
				return
			}

			setCarrera(data)
		}

		fetchCarrera()
	}, [])*/

	return (
		<section>
			<h1>Perfil</h1>
			{session ? (
				<div>
					<p>Hola {user?.username}</p>
				</div>
			) : (
				<p>No hay sesión</p>
			)}
		</section>
	)
}
