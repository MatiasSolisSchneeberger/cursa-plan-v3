/*import {useEffect, useState} from "react"*/
import {useAuth} from "../context/AuthContext"
/*import supabase from "../utils/supabase"*/
import Alert from "../components/Alert"
import {IconCone} from "@tabler/icons-react"

export default function Profile() {
	const {session} = useAuth()

	const user = session?.user.user_metadata

	return (
		<section>
			<Alert
				color="warning"
				icon={<IconCone />}
				title="Perfil en Construcción"
				description="Estamos trabajando para ofrecerte más funcionalidades en tu perfil, como ver historial de actividad o gestionar tus preferencias."
				canClose={false}
				className="mb-6"
			/>
			<h1>Perfil</h1>
			{session ?
				<div>
					<p>Hola {user?.username}</p>
				</div>
			:	<p>No hay sesión</p>}
		</section>
	)
}
