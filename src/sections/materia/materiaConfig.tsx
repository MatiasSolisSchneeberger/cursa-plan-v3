import {InfoTab} from "./tabs/InfoTab"
import RecursosTab from "./tabs/RecursosTab"
import {CalendarioTab} from "./tabs/CalendarioTab"
import {IconCalendar, IconFile, IconInfoCircle} from "@tabler/icons-react"
import type {TabConfig} from "../../types/config"

export const getMateriaTabs = (materiaData: any): TabConfig[] => {
	return [
		{
			id: "info",
			label: "Información",
			icon: <IconInfoCircle />,
			component: <InfoTab materiaData={materiaData} />,
		},
		{
			id: "recursos",
			label: "Recursos",
			icon: <IconFile />,
			subItems: [
				{
					id: "parciales_practicos",
					label: "Parciales Prácticos",
					component: <RecursosTab titulo="Parciales Prácticos" filtroActivo="parciales_practicos" />,
				},
				{
					id: "examenes_finales",
					label: "Exámenes Finales",
					component: <RecursosTab titulo="Exámenes Finales" filtroActivo="examenes_finales" />,
				},
				{
					id: "examenes_libres",
					label: "Exámenes Libres",
					component: <RecursosTab titulo="Exámenes Libres" filtroActivo="examenes_libres" />,
				},
			],
		},
		{
			id: "fechas",
			label: "Fechas",
			icon: <IconCalendar />,
			component: <CalendarioTab />,
		},
		{
			id: "notas",
			label: "Notas",
			icon: <IconFile />,
			subItems: [
				{
					id: "practicos",
					label: "Notas Prácticos",
					component: <div>Notas Prácticos</div>,
				},
				{
					id: "finales",
					label: "Notas Finales",
					component: <div>Notas Finales</div>,
				},
				{
					id: "libres",
					label: "Notas Libres",
					component: <div>Notas Libres</div>,
				},
			],
		},
	]
}
