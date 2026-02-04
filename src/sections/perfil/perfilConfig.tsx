import {IconBook, IconInfoCircle, IconSettings} from "@tabler/icons-react"
import type {TabConfig} from "../../types/config"
import {PerfilTab} from "./tabs/PerfilTab"

export const getPerfilConfig = (userData: any): TabConfig[] => {
	return [
		{
			id: "info",
			label: "Información",
			icon: <IconInfoCircle />,
			component: <PerfilTab />,
		},
		{
			id: "cursos",
			label: "Cursos",
			icon: <IconBook />,
			component: <div>Cursos</div>,
		},
		{
			id: "configuracion",
			label: "Configuración",
			icon: <IconSettings />,
			component: <div>Configuración</div>,
		},
	]
}
