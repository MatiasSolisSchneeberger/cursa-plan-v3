import {useState} from "react"

import {
	IconArrowRight,
	IconChevronDown,
	IconCircleCheck,
	IconCircleDashed,
	IconCircleDashedCheck,
	IconHourglass,
	IconLock,
	IconLockOpen,
	IconChevronUp,
	IconXboxX,
	IconInfoCircle,
	IconCheck,
	IconLetterR,
	IconLetterA,
	IconLetterRSmall,
} from "@tabler/icons-react"

import Card from "./Card"
import CardHeader from "./CardHeader"
import CardBody from "./CardBody"
import Chip from "./Chip"
import CardInfoList from "./CardInfoList"
import MenuGroup from "./MenuGroup"
import MenuItem from "./MenuItem"
import Button from "./Button"
import CardFooter from "./CardFooter"
import ToolTip from "./ToolTip"

import type {EstadoMateria as EstadoMateriaType} from "../types/materia"
import type {MateriaJSON} from "../types/db"

import {useAuth} from "../context/AuthContextData"
import {useSimulador} from "../context/SimuladorContextData"

type EstadoMateriaConfig = {
	texto: EstadoMateriaType
	color: "tertiary" | "info" | "warning" | "success" | "primary" | "secondary" | "danger"
	icon: React.ReactNode
}

interface CardMateriaProps {
	materia: MateriaJSON
	carreraSlug: string
	planAnio: number
}

const estados: EstadoMateriaConfig[] = [
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
	{texto: "Desbloqueado", color: "success", icon: <IconCircleCheck size={20} />},
]
export default function CardMateria({materia, carreraSlug, planAnio}: CardMateriaProps) {
	const [showCorrelativas, setShowCorrelativas] = useState(false)
	const {session} = useAuth()

	const {getEstado, actualizarAvance} = useSimulador()

	// Usamos idMateriaPlan porque es lo que espera actualizarAvance
	// (Asegúrate de que tu JSON de materia tenga esta propiedad, si no usa materia.id)
	const currentId = materia.idMateriaPlan || materia.id
	const estadoActualTexto = getEstado(currentId)

	// Función helper para verificar si un grupo de correlativas está satisfecho
	const getConfig = (estado: string) => estados.find((e) => e.texto === estado)

	const isGroupSatisfied = (tipoGrupo: string) => {
		const grupo = materia.correlativas?.find((g) => g.tipo === tipoGrupo)
		if (!grupo) return true // Si no hay requisitos de ese tipo, está satisfecho

		// Verificamos cada condición del grupo
		return grupo.condiciones.every((cond) => {
			if (cond.tipo === "materia") {
				// Verificamos cada requisito dentro de la condición
				return cond.requisitos.every((req) => {
					if ("id" in req) {
						const est = getEstado(req.id)
						if (!est || est === "Sin cursar") return false

						const condicionRequerida = cond.condicion?.toLowerCase()
						// Si no tiene condición explicita, asumimos que con tener algún estado positivo basta?
						// O asumimos Regular? Por seguridad y consistencia con lo anterior:
						if (condicionRequerida === "aprobado") {
							return est === "Aprobado"
						} else {
							// Default o 'regular' -> Regular o Aprobado
							return est === "Regular" || est === "Aprobado"
						}
					}
					// Si es otro tipo de requisito (nota, porcentaje), asumimos true por ahora o lo ignoramos
					return true
				})
			}
			return true
		})
	}

	const cursarSatisfied = isGroupSatisfied("cursar")
	const rendirSatisfied = isGroupSatisfied("rendir")

	const isBloqueado = !cursarSatisfied
	const isSoloCursar = cursarSatisfied && !rendirSatisfied
	const isDesbloqueado = cursarSatisfied && rendirSatisfied
	// Nota: Podría haber un caso donde rendirSatisfied es true pero cursarSatisfied false?
	// Teóricamente no debería pasar en un plan lógico, pero si pasa, isBloqueado ganaría si definimos jerarquía.
	// Asumimos modelo incremental: Cursar -> Rendir.

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

	return (
		<Card className="">
			<CardHeader color="primary">{materia.nombre}</CardHeader>
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
				{showCorrelativas && (
					<section className="flex flex-col gap-2">
						{materia.correlativas.map((grupo) => (
							<CardInfoList key={grupo.tipo} color="secondary" className="" title={`Para ${grupo.tipo}`}>
								{grupo.condiciones.map((cond, i) => (
									<MenuGroup
										key={i}
										title={
											cond.tipo === "materia" ?
												cond.condicion ?
													cond.condicion.charAt(0).toUpperCase() + cond.condicion.slice(1)
												:	"Requisito"
											:	cond.tipo.charAt(0).toUpperCase() + cond.tipo.slice(1)
										}
										className={
											cond.condicion === "regular" ? "[&>span]:text-warning-500"
											: cond.condicion === "aprobado" ?
												"[&>span]:text-success-500"
											: cond.condicion === "optativo" ?
												"[&>span]:text-info-500"
											:	""
										}>
										{cond.requisitos.map((req, j) => {
											let chipEstado = null
											let isSatisfied = false

											// Lógica para mostrar estado del requisito
											if ("id" in req) {
												const est = getEstado(req.id) // El context busca en ambos campos
												if (est && est !== "Sin cursar") {
													const conf = getConfig(est)

													// Lógica de jerarquía: Regular < Aprobado
													const condicionRequerida = cond.condicion?.toLowerCase()
													if (condicionRequerida) {
														if (condicionRequerida === "regular") {
															if (est === "Regular" || est === "Aprobado") {
																isSatisfied = true
															}
														} else if (condicionRequerida === "aprobado") {
															if (est === "Aprobado") {
																isSatisfied = true
															}
														}
													}

													if (conf) {
														chipEstado = (
															<Chip
																color={conf.color}
																selected={isSatisfied}
																className="text-[10px] h-5 px-2 py-0 min-h-0 ml-2 pointer-events-none">
																{conf.texto}
															</Chip>
														)
													}
												}
											}

											return (
												<MenuItem
													key={j}
													chip={chipEstado}
													iconLeft={
														cond.condicion === "regular" ? <IconLetterR size={20} />
														: cond.condicion === "aprobado" ?
															<IconLetterA size={20} />
														:	null
													}>
													{"nombre" in req ?
														req.nombre
													: "porcentaje" in req ?
														`${req.porcentaje}%`
													: "nota" in req ?
														`Nota: ${req.nota}`
													:	""}
												</MenuItem>
											)
										})}
									</MenuGroup>
								))}
							</CardInfoList>
						))}
					</section>
				)}
			</CardFooter>
		</Card>
	)
}
