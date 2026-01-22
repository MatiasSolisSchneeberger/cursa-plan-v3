/*import {useEffect, useState} from "react"*/
import {useAuth} from "../context/AuthContext"
/*import supabase from "../utils/supabase"*/

export default function Profile() {
	const {session} = useAuth()

	const user = session?.user.user_metadata

	return (
		<section>
			<h1>Perfil</h1>
			{session ?
				<div>
					<p>Hola {user?.username}</p>
				</div>
			:	<p>No hay sesión</p>}
		</section>
	)
}
