import {useState} from "react"
import {
	IconArrowRight,
	IconCheck,
	IconChevronDown,
	IconCircleCheck,
	IconCircleDashed,
	IconCircleDashedCheck,
	IconHourglass,
	IconLock,
	IconLockOpen,
	IconChevronUp,
	IconXboxX,
} from "@tabler/icons-react"
import Card from "./Card"
import CardHeader from "./CardHeader"
import CardBody from "./CardBody"
import Chip from "./Chip"
import type {MateriaJSON} from "../types/db"
import {useAuth} from "../context/AuthContext"
import CardInfoList from "./CardInfoList"
import MenuGroup from "./MenuGroup"
import MenuItem from "./MenuItem"
import Button from "./Button"

type EstadoMateria = {
	texto: string
	color: "tertiary" | "info" | "warning" | "success" | "primary" | "secondary" | "danger"
	icon: React.ReactNode
}

interface CardMateriaProps {
	materia: MateriaJSON
	carreraSlug: string
	planAnio: number
}

const estados: EstadoMateria[] = [
	{texto: "Sin cursar", color: "tertiary", icon: <IconCircleDashed size={20} />},
	{texto: "Cursando", color: "info", icon: <IconHourglass size={20} />},
	{texto: "Regular", color: "warning", icon: <IconCircleDashedCheck size={20} />},
	{texto: "Aprobado", color: "success", icon: <IconCircleCheck size={20} />},
	{texto: "Libre", color: "primary", icon: <IconXboxX size={20} />},
]

const disponibilidadMaterias: {
	texto: string
	color: "tertiary" | "info" | "warning" | "success" | "primary" | "secondary" | "danger"
	icon: React.ReactNode
}[] = [
	{texto: "Bloqueado", color: "danger", icon: <IconLock size={20} />},
	{texto: "Solo Cursar", color: "warning", icon: <IconLockOpen size={20} />},
	{texto: "Desbloqueado", color: "success", icon: <IconCheck size={20} />},
]
export default function CardMateria({materia, carreraSlug, planAnio}: CardMateriaProps) {
	const [estadoMateria, setEstadoMateria] = useState<EstadoMateria>(
		() => estados.find((e) => e.texto === materia.estadoMateria) || estados[0],
	)
	const [showCorrelativas, setShowCorrelativas] = useState(false)

	const {session} = useAuth()

	return (
		<Card>
			<CardHeader color="primary">{materia.nombre}</CardHeader>
			<CardBody className="flex flex-col gap-2">
				<aside className="flex flex-col gap-2 *:border-b-2 *:pb-2 *:last:pb-0 *:border-background-300 dark:*:border-background-700 *:last:border-b-0">
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
						{disponibilidadMaterias.map((disponibilidad) => (
							<Chip
								key={disponibilidad.texto}
								color={disponibilidad.color}
								className="text-xs"
								iconLeft={disponibilidad.icon}
								disabled={!session}
								onClick={(e) => e.preventDefault()}
								title={!session ? "Inicia sesión para ver esta información" : ""}>
								{disponibilidad.texto}
							</Chip>
						))}
					</span>
					<span className="flex flex-wrap gap-2">
						{estados.map((estado) => (
							<Chip
								key={estado.texto}
								color={estado.color}
								// Type annotation fixed as per previous lint correct
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
									setEstadoMateria(estado)
								}}
								selected={estadoMateria.texto === estado.texto}
								iconLeft={estado.icon}
								canSelected>
								{estado.texto}
							</Chip>
						))}
					</span>
				</aside>

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

				{showCorrelativas && (
					<section className="flex flex-wrap gap-2">
						{materia.correlativas.map((grupo) => (
							<CardInfoList key={grupo.tipo} color="secondary" title={`Para ${grupo.tipo}`}>
								{grupo.condiciones.map((cond, i) => (
									<MenuGroup
										key={i}
										title={
											cond.tipo === "materia" ?
												cond.condicion ?
													cond.condicion.charAt(0).toUpperCase() + cond.condicion.slice(1)
												:	"Requisito"
											:	cond.tipo.charAt(0).toUpperCase() + cond.tipo.slice(1)
										}>
										{cond.requisitos.map((req, j) => (
											<MenuItem key={j}>
												{"nombre" in req ?
													req.nombre
												: "porcentaje" in req ?
													`${req.porcentaje}% aprobado`
												: "nota" in req ?
													`Nota: ${req.nota}`
												:	""}
											</MenuItem>
										))}
									</MenuGroup>
								))}
							</CardInfoList>
						))}
					</section>
				)}
			</CardBody>
		</Card>
	)
}
