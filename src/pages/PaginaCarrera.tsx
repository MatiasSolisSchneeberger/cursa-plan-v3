import {useParams} from "react-router-dom"

export function PaginaCarrera() {
	const {carrera} = useParams()

	return <div className={`text-primary-600 w-full h-full theme-${carrera}`}>Carrera - {carrera}</div>
}
