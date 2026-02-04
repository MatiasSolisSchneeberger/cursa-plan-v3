import {useAuth} from "../context/AuthContext"

export default function Profile() {
	const {session} = useAuth()

	const user = session?.user.user_metadata

	return <div>Profile</div>
}
