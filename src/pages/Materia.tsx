// src/pages/Materia.tsx
import {useParams} from "react-router-dom"
import {IconCheck, IconChevronDown} from "@tabler/icons-react"

import {estados, disponibilidadMaterias} from "../utils/materiaConstants"
import Cargando from "../sections/Cargando"
import ButtonGroup from "../components/ButtonGroup"
import {Tabs, TabsTrigger, TabsContent} from "../components/Tabs"
import Chip from "../components/Chip"
import Dropdown from "../components/Dropdown"
import DropdownTrigger from "../components/DropdownTrigger"
import DropdownContent from "../components/DropdownContent"
import MenuItem from "../components/MenuItem"
import Menu from "../components/Menu"
import MenuGroup from "../components/MenuGroup"
import PageHeader from "../components/PageHeader"

import {InfoTab} from "../sections/materia/InfoTab"
import {CalendarioTab} from "../sections/materia/CalendarioTab"
import {IconCalendar, IconFile, IconInfoCircle} from "@tabler/icons-react"

import {useSimulador} from "../context/SimuladorContextData"
import {useAuth} from "../context/AuthContextData"
import {getMateriaAvailability} from "../scripts/materiaUtils"
import {useMateriaData} from "../hooks/useMateriaData"
import Button from "../components/Button"
import Practicos from "../sections/materia/Parciales/Practicos"
import Teoricos from "../sections/materia/Parciales/Teoricos"
import Libres from "../sections/materia/Parciales/Libres"
import Finales from "../sections/materia/Parciales/Finales"
import {usePageTitle} from "../hooks/usePageTitle"

/**
 * Componente principal de la página de detalle de una Materia.
 * Muestra información, recursos, fechas y notas de una materia específica.
 * Permite cambiar el estado de la materia (cursando, aprobado, etc.) y ver su disponibilidad.
 */
export default function Materia() {
	// Obtenemos los parámetros de la URL: slug de la materia, plan y carrera.
	const {materiaSlug, planSlug, carreraSlug} = useParams()

	// Hook personalizado para obtener los datos de la materia desde Supabase.
	const {materia, loading, correlativasFormat} = useMateriaData(materiaSlug, planSlug, carreraSlug)

	// Cambiando de nombre la página
	usePageTitle(loading ? "cargando..." : `${materia?.materias?.nombre}`, true)

	// Contexto de autenticación para saber si el usuario está logueado.
	const {session} = useAuth()

	// Contexto del simulador para obtener y actualizar el estado de la materia en el plan del usuario.
	const {getEstado, actualizarAvance} = useSimulador()

	// Si está cargando o no hay materia, mostramos el spinner.
	if (!materia || loading) return <Cargando />

	// --- LÓGICA DE DISPONIBILIDAD ---
	const estadoActualTexto = getEstado(materia.id)
	const {isSoloCursar, isDesbloqueado} = getMateriaAvailability(correlativasFormat, getEstado)

	let disponibilidadActual = disponibilidadMaterias.find((d) => d.texto === "Bloqueado")
	if (isSoloCursar) disponibilidadActual = disponibilidadMaterias.find((d) => d.texto === "Solo Cursar")
	if (isDesbloqueado) disponibilidadActual = disponibilidadMaterias.find((d) => d.texto === "Desbloqueado")

	const estadoConfig = estados.find((e) => e.texto === estadoActualTexto) || estados[0]
	const materiaCompleta = {...materia, correlativas: correlativasFormat}

	// --- CONFIGURACIÓN DE TABS ---
	const tabsConfig = [
		{
			id: "info",
			label: "Información",
			mobileLabel: "Info.",
			icon: <IconInfoCircle />,
			content: <InfoTab materiaData={materiaCompleta} />,
			default: true,
		},
		{
			id: "parciales",
			label: "Parciales",
			icon: <IconFile />,
			iconRight: <IconChevronDown />,
			children: [
				{
					id: "parciales",
					label: "Parciales",
					content: <Practicos />,
					default: true,
				},
				{
					id: "teoricos",
					label: "Teoricos",
					content: <Teoricos />,
				},
				{
					id: "libres",
					label: "Libres",
					content: <Libres />,
				},
				{
					id: "finales",
					label: "Finales",
					content: <Finales />,
				},
			],
		},
		{
			id: "fechas",
			label: "Fechas",
			icon: <IconCalendar />,
			content: (
				<CalendarioTab
					fechas={
						Array.isArray(materia.materias.fechas_examenes) ? materia.materias.fechas_examenes
						: materia.materias.fechas_examenes ?
							[materia.materias.fechas_examenes]
						:	[]
					}
					materiaNombre={materia.materias.nombre}
				/>
			),
		},
	]

	return (
		<section className="flex flex-col gap-3">
			{/* HEADER DE LA PÁGINA */}
			<PageHeader
				title={
					<>
						<h1 className="texto-title block md:hidden text-primary-600 dark:text-primary-400 w-full text-start">
							{materia.materias.nombre}
						</h1>
						<h1 className="texto-headline hidden md:block text-primary-600 dark:text-primary-400 w-full text-start">
							{materia.materias.nombre}
						</h1>
					</>
				}
				backUrl={`/carreras/${carreraSlug}?plan=${planSlug}`}>
				{disponibilidadActual && (
					<Chip
						color={disponibilidadActual.color}
						iconLeft={disponibilidadActual.icon}
						title={!session ? "Inicia sesión para ver tu disponibilidad" : "Disponibilidad para cursar/rendir"}
						disabled={!session}>
						{disponibilidadActual.texto}
					</Chip>
				)}

				<Dropdown>
					<DropdownTrigger>
						<Button
							variant="flat"
							color={estadoConfig.color}
							iconRight={<IconChevronDown size={18} />}
							className="cursor-pointer"
							title={!session ? "Inicia sesión para cambiar tu estado" : "Cambiar estado"}
							disabled={!session}>
							{estadoConfig.texto}
						</Button>
					</DropdownTrigger>
					<DropdownContent>
						<Menu>
							<MenuGroup title="Estado actual">
								{estados.map((est) => (
									<MenuItem
										canHover
										key={est.texto}
										onClick={() => actualizarAvance(materia.id, est.texto)}
										iconLeft={est.icon}
										iconRight={
											estadoActualTexto === est.texto ?
												<IconCheck className="text-success-600 dark:text-success-400" />
											:	undefined
										}
										isActive={estadoActualTexto === est.texto}>
										{est.texto}
									</MenuItem>
								))}
							</MenuGroup>
						</Menu>
					</DropdownContent>
				</Dropdown>
			</PageHeader>

			{/* CONTENIDO PRINCIPAL: Sistema de Pestañas con Configuración */}
			<Tabs defaultValue={tabsConfig.find((t: any) => t.default)?.id || tabsConfig[0].id}>
				<ButtonGroup>
					{tabsConfig.map((tab) => (
						<TabsTrigger key={tab.id} value={tab.id} iconLeft={tab.icon} iconRight={tab.iconRight}>
							{tab.mobileLabel ?
								<>
									<span className="hidden md:block">{tab.label}</span>
									<span className="md:hidden">{tab.mobileLabel}</span>
								</>
							:	tab.label}
						</TabsTrigger>
					))}
				</ButtonGroup>

				{tabsConfig.map((tab) => (
					<TabsContent key={tab.id} value={tab.id}>
						{
							tab.children ?
								// Si tiene hijos, renderizamos otro sistema de Tabs anidado
								<Tabs defaultValue={tab.children.find((c: any) => c.default)?.id || tab.children[0].id}>
									<ButtonGroup>
										{tab.children.map((child) => (
											<TabsTrigger variants={["solid", "outlined"]} key={child.id} value={child.id} color="secondary">
												{child.label}
											</TabsTrigger>
										))}
									</ButtonGroup>
									{tab.children.map((child) => (
										<TabsContent key={child.id} value={child.id}>
											{child.content}
										</TabsContent>
									))}
								</Tabs>
								// Si no tiene hijos, renderizamos el contenido directamente
							:	tab.content
						}
					</TabsContent>
				))}
			</Tabs>
		</section>
	)
}
