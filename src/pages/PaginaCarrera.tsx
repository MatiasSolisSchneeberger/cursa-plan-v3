import {useEffect, useState, useMemo} from "react"
import {useParams, useSearchParams} from "react-router-dom"
import {getCarreraBySlug} from "../scripts/getCarreraBySlug"
import {transformarDatos} from "../scripts/transformData"
import {IconCheck, IconChevronDown, IconLoader2} from "@tabler/icons-react"
import HeaderCarrera from "../sections/HeaderCarrera"
import ButtonGroup from "../components/ButtonGroup"
import Button from "../components/Button"
import Dropdown from "../components/Dropdown"
import DropdownTrigger from "../components/DropdownTrigger"
import DropdownContent from "../components/DropdownContent"
import Menu from "../components/Menu"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import CardInfoList from "../components/CardInfoList"
import CardFooter from "../components/CardFooter"
import Chip from "../components/Chip"

export default function PaginaCarrera() {
	const {carreraSlug} = useParams<{carreraSlug: string}>()
	const [searchParams, setSearchParams] = useSearchParams()

	// Params URL
	const planAnioParam = searchParams.get("plan")
	const orientacionSlugParam = searchParams.get("orientacion")

	const [carreraJson, setCarreraJson] = useState<any>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			if (!carreraSlug) return
			try {
				const rawData = await getCarreraBySlug(carreraSlug)
				if (rawData) setCarreraJson(transformarDatos(rawData))
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [carreraSlug])

	// --- LÓGICA DE SELECCIÓN ---
	const planActivo = useMemo(() => {
		if (!carreraJson) return null
		// Busca el plan por año, o devuelve el primero por defecto
		return planAnioParam
			? carreraJson.planes.find((p: any) => p.anioInicio === Number(planAnioParam))
			: carreraJson.planes[0]
	}, [carreraJson, planAnioParam])

	// Handlers
	const handlePlanChange = (anio: number) => {
		// Al cambiar plan, reseteamos orientación
		setSearchParams({plan: anio.toString()})
	}
	const handleOrientacionChange = (slug: string) => {
		// Si clickean la misma que ya está, la quitamos (toggle)
		const nuevoSlug = orientacionSlugParam === slug ? "" : slug
		if (planActivo) {
			// Eliminamos la clave 'orientacion' si está vacía para limpiar la URL
			const params: any = {plan: planActivo.anioInicio.toString()}
			if (nuevoSlug) params.orientacion = nuevoSlug
			setSearchParams(params)
		}
	}

	const goToAnio = (anio: number) => {
		document.getElementById(anio.toString())?.scrollIntoView({behavior: "smooth"})
	}

	const goToMateria = (slug: string) => {
		document.getElementById(slug)?.scrollIntoView({behavior: "smooth"})
	}

	if (loading)
		return (
			<section className="w-full h-[calc(100vh-12rem)] flex items-center justify-center gap-3">
				<IconLoader2 size={32} className="animate-spin text-primary-400 dark:text-primary-600" />
				<span className="text-text-900 dark:text-text-100 texto-label">Cargando...</span>
			</section>
		)
	if (!planActivo)
		return (
			<section className="w-full h-[calc(100vh-12rem)] flex items-center justify-center gap-3">
				<span className="text-text-900 dark:text-text-100 texto-label">
					Ups! Algo salió mal. Parece que no se encontró la información.
				</span>
			</section>
		)

	return (
		<section className="flex flex-col gap-6">
			<HeaderCarrera name={carreraJson.carrera} icon={carreraJson.icon} />
			{/* --- CONTROLES --- */}
			{/* <pre className="select-all">{JSON.stringify(planActivo, null, 2)}</pre> */}{" "}
			{carreraJson.planes.length > 1 && (
				<article className="flex flex-col gap-3 items-center justify-center">
					<span className="text-text-800 dark:text-text-200 texto-title">Elegir el plan de estudio:</span>
					<ButtonGroup>
						{carreraJson.planes.map((p: any) => (
							<Button
								key={p.id}
								onClick={() => handlePlanChange(p.anioInicio)}
								variant={planActivo.anioInicio === p.anioInicio ? "flat" : "outlined"}>
								{p.anioInicio}
							</Button>
						))}
					</ButtonGroup>
				</article>
			)}
			{planActivo.listaOrientaciones.length > 0 && (
				<article className="flex flex-col gap-3 items-center justify-center">
					<span className="text-text-800 dark:text-text-200 texto-title">Elegir la orientación:</span>
					<Dropdown>
						<DropdownTrigger>
							<Button variant="outlined" iconRight={<IconChevronDown />}>
								{planActivo.listaOrientaciones.find((ori: any) => ori.slug === orientacionSlugParam)?.nombre ||
									"Todas las orientaciones"}
							</Button>
						</DropdownTrigger>
						<DropdownContent>
							<Menu>
								<MenuItem
									onClick={() => handleOrientacionChange("")}
									iconRight={
										!orientacionSlugParam ? <IconCheck className="text-success-400 dark:text-success-600" /> : null
									}>
									Todas las orientaciones
								</MenuItem>
								<MenuGroup title="Orientaciones">
									{planActivo.listaOrientaciones.map((ori: any) => (
										<MenuItem
											href={`?plan=${planActivo.anioInicio}&orientacion=${ori.slug}`}
											key={ori.id}
											onClick={() => handleOrientacionChange(ori.slug)}
											iconRight={
												ori.slug === orientacionSlugParam ? (
													<IconCheck className="text-success-400 dark:text-success-600" />
												) : null
											}>
											{ori.nombre}
										</MenuItem>
									))}
								</MenuGroup>
							</Menu>
						</DropdownContent>
					</Dropdown>
				</article>
			)}
			<article className="flex flex-wrap gap-2 items-center justify-center">
				{planActivo.anios.map((anio: any) => (
					<Button key={anio.anio} onClick={() => goToAnio(anio.anio)} variant="outlined">
						{anio.anio}° Año
					</Button>
				))}
			</article>
			{/* --- GRILLA DE AÑOS --- */}
			<article className="flex flex-col gap-6">
				{planActivo.anios.map((anioData: any) => (
					<section key={anioData.anio} id={anioData.anio} className="flex flex-col gap-4 scroll-mt-28">
						<h2 className="texto-headline text-text-900 dark:text-text-100">{anioData.anio}° Año</h2>

						{anioData.periodos.map((periodo: any) => (
							<article key={periodo.nroPeriodo} className="">
								<h3 className="texto-title text-text-700 dark:text-text-300 mb-2">
									{periodo.nroPeriodo}° {periodo.tipoPeriodo}
								</h3>

								<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
									{periodo.materias
										.filter((materia: any) => {
											// Si no hay filtro de orientación, mostramos todo
											if (!orientacionSlugParam) return true
											// Las materias comunes (sin orientación) siempre se muestran
											if (!materia.orientacion) return true
											// Si hay filtro, mostramos solo las que coinciden
											if (materia.orientacion.slug === orientacionSlugParam) return true
											return false
										})
										// AGREGAMOS EL INDEX AQUÍ vvv
										.map((materia: any, index: number) => (
											// CAMBIAMOS LA KEY AQUÍ vvv

											<Card key={`${materia.id}-${index}`} id={materia.slug} className="scroll-mt-28">
												<CardHeader color="primary">{materia.nombre}</CardHeader>
												<CardBody>
													{/* --- CARTEL DE OPTATIVA --- */}
													{materia.esOptativa && (
														<Chip className="mb-2" color="warning">
															Optativa {materia.nroOptativa ? `#${materia.nroOptativa}` : ""}
														</Chip>
													)}
													{materia.correlativas.length > 0 && (
														<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
															{materia.correlativas.map((correlativa: any) => (
																<CardInfoList key={correlativa.tipo} title={`Para ${correlativa.tipo}:`}>
																	{correlativa.condiciones.map((condicion: any) => (
																		<MenuGroup key={condicion.id} title={`Tener ${condicion.condicion}:`}>
																			{condicion.requisitos.map((requisito: any) => (
																				<MenuItem
																					canHover={true}
																					key={requisito.id}
																					onClick={() => goToMateria(requisito.slug)}>
																					{requisito.nombre}
																				</MenuItem>
																			))}
																		</MenuGroup>
																	))}
																</CardInfoList>
															))}
														</div>
													)}
												</CardBody>
												<CardFooter>
													<div></div>
												</CardFooter>
											</Card>
										))}
								</section>
							</article>
						))}
					</section>
				))}
			</article>
		</section>
	)
}
