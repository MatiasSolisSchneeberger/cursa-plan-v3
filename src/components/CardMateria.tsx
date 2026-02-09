import {useState} from "react"

import {IconArrowRight, IconChevronDown, IconChevronUp, IconInfoCircle} from "@tabler/icons-react"
import Card from "./Card"
import CardHeader from "./CardHeader"
import CardBody from "./CardBody"
import Chip from "./Chip"
import Button from "./Button"
import CardFooter from "./CardFooter"
import ToolTip from "./ToolTip"
import CorrelativasList from "./CorrelativasList"

import type {MateriaJSON} from "../types/db"

import {useAuth} from "../context/AuthContextData"
import {useSimulador} from "../context/SimuladorContextData"

import {getMateriaAvailability} from "../scripts/materiaUtils"
import {estados, disponibilidadMaterias} from "../utils/materiaConstants"

interface CardMateriaProps {
	materia: MateriaJSON
	carreraSlug: string
	planAnio: number
}

export default function CardMateria({materia, carreraSlug, planAnio}: CardMateriaProps) {
	const [showCorrelativas, setShowCorrelativas] = useState(false)
	const {session} = useAuth()

	const {getEstado, actualizarAvance} = useSimulador()

	// Usamos idMateriaPlan porque es lo que espera actualizarAvance
	const currentId = materia.idMateriaPlan || materia.id
	const estadoActualTexto = getEstado(currentId)

	const {isBloqueado, isSoloCursar, isDesbloqueado} = getMateriaAvailability(materia.correlativas, getEstado)

	// Check for special conditions (not approved/regular)
	const hasSpecialConditions = materia.correlativas?.some((grupo) =>
		grupo.condiciones.some((cond) => {
			if (cond.tipo === "materia") {
				const condicionRequerida = cond.condicion?.toLowerCase()
				// If condition is explicitly defined and is not 'regular' or 'aprobado'
				if (
					condicionRequerida &&
					condicionRequerida !== "regular" &&
					condicionRequerida !== "aprobado" &&
					condicionRequerida !== "requisito"
				) {
					return true
				}
				return false
			}
			// If it's not a 'materia' condition (e.g. credits, average, etc) it is a special condition
			return true
		}),
	)

	const colorHeader = materia.esOptativa ? "secondary" : "primary"

	return (
		<Card className="">
			<CardHeader color={colorHeader}>{materia.nombre}</CardHeader>
			<CardBody className="flex flex-col gap-2 *:border-b-2 *:pb-2 *:last:pb-0 *:border-background-300 dark:*:border-background-700 *:last:border-b-0">
				{(materia.esOptativa || materia.orientacion) && (
					<span className="flex flex-wrap gap-2">
						{materia.esOptativa && (
							<Chip color="warning" className="text-xs" onClick={(e) => e.preventDefault()}>
								Optativa {materia.nroOptativa ? `#${materia.nroOptativa}` : ""}
							</Chip>
						)}
						{materia.orientacion && (
							<Chip color="secondary" className="text-xs" onClick={(e) => e.preventDefault()}>
								{materia.orientacion.nombre}
							</Chip>
						)}
					</span>
				)}
				<span className="flex flex-wrap gap-2">
					{disponibilidadMaterias.map((disponibilidad) => {
						let isSelected = false
						if (disponibilidad.texto === "Bloqueado") isSelected = isBloqueado
						if (disponibilidad.texto === "Solo Cursar") isSelected = isSoloCursar
						if (disponibilidad.texto === "Desbloqueado") isSelected = isDesbloqueado

						return (
							<Chip
								key={disponibilidad.texto}
								color={disponibilidad.color}
								className="text-xs"
								iconLeft={disponibilidad.icon}
								disabled={!session}
								selected={isSelected}
								onClick={(e) => e.preventDefault()}
								title={!session ? "Inicia sesión para ver esta información" : ""}>
								{disponibilidad.texto}
							</Chip>
						)
					})}
					{hasSpecialConditions && (
						<ToolTip tooltip="Esta materia tiene correlativas que no se consideran para el cálculo automático. Ya sea porcentaje o algo más específico">
							<Chip color="info" selected showSelectedIcon={false} onClick={(e) => e.preventDefault()}>
								<IconInfoCircle size={20} />
							</Chip>
						</ToolTip>
					)}
				</span>

				{/* Selector de estado */}
				<span className="flex flex-wrap gap-2">
					{estados.map((estadoConfig) => {
						const isSelected = estadoActualTexto === estadoConfig.texto

						return (
							<Chip
								key={estadoConfig.texto}
								color={estadoConfig.color}
								// Type annotation fixed as per previous lint correct
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
									if (session) actualizarAvance(materia.idMateriaPlan, estadoConfig.texto)
								}}
								selected={isSelected}
								iconLeft={estadoConfig.icon}
								canSelected
								disabled={!session}
								className={estadoActualTexto === estadoConfig.texto ? "" : "opacity-75"}
								title={!session ? "Inicia sesión para ver esta información" : ""}>
								{estadoConfig.texto}
							</Chip>
						)
					})}
				</span>
			</CardBody>
			<CardFooter className="flex flex-col gap-2">
				<section className="w-full flex flex-wrap gap-2">
					<Button
						iconRight={<IconArrowRight size={20} />}
						className="flex-1 w-full"
						href={`/carreras/${carreraSlug}/${planAnio}/${materia.slug}`}>
						Ver mas
					</Button>
					{materia.correlativas && materia.correlativas.length > 0 && (
						<Button
							iconRight={showCorrelativas ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
							variant="outlined"
							color="tertiary"
							className="flex-1 w-full"
							onClick={() => setShowCorrelativas(!showCorrelativas)}>
							{showCorrelativas ? "Ocultar correlativas" : "Ver correlativas"}
						</Button>
					)}
				</section>

				{/* Listado de correlativas */}
				{showCorrelativas && <CorrelativasList correlativas={materia.correlativas} />}
			</CardFooter>
		</Card>
	)
}
