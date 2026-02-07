import {IconArrowLeft} from "@tabler/icons-react"
import ButtonIcon from "../components/ButtonIcon"
import IconCarrera from "../components/IconCarrera"
import PlanSelector from "./PlanSelector"
import OrientacionSelector from "./OrientacionSelector"
import LikeButton from "../components/LikeButton"
import type {PlanJSON} from "../types/db"
import Button from "../components/Button"

interface HeaderCarreraProps {
	name: string
	icon: string
	planes: PlanJSON[]
	currentPlanAnio: number
	onPlanSelect: (anio: number) => void
	plan: PlanJSON
	currentOrientacionSlug: string | null
	onOrientacionSelect: (slug: string) => void
	planId: number
}

export default function HeaderCarrera({
	name,
	planes,
	currentPlanAnio,
	onPlanSelect,
	plan,
	currentOrientacionSlug,
	onOrientacionSelect,
	planId,
}: HeaderCarreraProps) {
	return (
		<header className="w-full flex items-center p-3 bg-primary-100 dark:bg-primary-900 outline-primary-300 dark:outline-primary-700 outline-2 rounded-3xl gap-3">
			{/* Bloque Izquierdo: Botón Volver */}
			<div className="shrink-0 ">
				<Button isIconOnly variant="solid" color="primary" href="/">
					<IconArrowLeft />
				</Button>
			</div>

			{/* Bloque Derecho: Contenido */}
			<div className="md:border-l-2 border-primary-300 dark:border-primary-700 pl-3 flex flex-wrap w-full gap-3 justify-between">
				{/* Fila Superior: Título e Icono */}
				<div className="flex items-center flex-1">
					{/* Título */}
					<h1 className="hidden lg:block texto-headline text-primary-600 dark:text-primary-400 w-full text-center">
						{name}
					</h1>
					<h1 className="lg:hidden texto-title text-primary-600 dark:text-primary-400 w-full text-center">
						{name.replace("Licenciatura", "Lic.").replace("Ingeniería", "Ing.").replace("Profesorado", "Prof.")}
					</h1>
				</div>

				{/* Fila Inferior: Controles (Selectores + Like) */}
				<div className="md:border-l-2 md:border-t-0 border-t-2 border-primary-300 dark:border-primary-700 md:pl-3 pt-3 md:pt-0 flex items-center gap-3 overflow-x-auto md:overflow-visible w-full flex-wrap md:w-auto">
					{/* Selectores */}
					<PlanSelector
						planes={planes}
						currentPlanAnio={currentPlanAnio}
						onSelect={onPlanSelect}
						showTitle={false}
						className=""
					/>

					<OrientacionSelector
						plan={plan}
						currentOrientacionSlug={currentOrientacionSlug}
						onSelect={onOrientacionSelect}
						showTitle={false}
						className=""
					/>

					{/* boton de like */}
					<LikeButton planId={planId} className="" />
				</div>
			</div>
		</header>
	)
}
