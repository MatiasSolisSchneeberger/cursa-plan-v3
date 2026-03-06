import { useEffect, useMemo } from "react";
import {
	Link,
	useParams,
	useSearchParams,
	useNavigate,
} from "react-router-dom";
// import HeaderCarrera from "../sections/HeaderCarrera";
import { usePageTitle } from "../hooks/usePageTitle";
import AniosGrid from "../sections/AniosGrid";
import Cargando from "../sections/Cargando";
import {
	IconCheck,
	IconChevronDown,
	IconExternalLink,
	IconHome,
	IconInfoCircle,
} from "@tabler/icons-react";
import { useCarrera } from "../hooks/useCarrera";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { badgeVariants } from "@/components/ui/badge";
import { TypographyH1, TypographyLead } from "@/components/ui/Typography";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrientacionSelector from "@/sections/OrientacionSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

export default function Carrera() {
	const { carreraSlug, planAnioParam } = useParams<{
		carreraSlug: string;
		planAnioParam?: string;
	}>();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	// --- AQUÍ LA MAGIA DE TANSTACK QUERY ---
	// isLoading: true mientras carga la primera vez
	// data: contiene tu JSON ya transformado (o undefined si carga/error)
	// isError: true si falló la promesa
	const { data: carreraJson, isLoading, isError } = useCarrera(carreraSlug);

	const orientacionSlugParam = searchParams.get("orientacion");

	/**
	 * Actualiza el título de la página.
	 * usePageTitle automáticamente agrega " - CursaPlan" al final si no se especifica lo contrario.
	 */
	usePageTitle(isLoading ? "CursaPlan" : carreraJson?.carrera || "", true);

	// --- LÓGICA DE SELECCIÓN DE PLAN ---
	/**
	 * Determina el plan de estudios activo basado en los parámetros de búsqueda o por defecto.
	 */
	const planActivo = useMemo(() => {
		if (
			!carreraJson ||
			!carreraJson.planes ||
			carreraJson.planes.length === 0
		)
			return undefined;

		// 1. Si existe parámetro URL, buscamos ese plan
		if (planAnioParam) {
			const found = carreraJson.planes.find(
				(p) => p.anioInicio === Number(planAnioParam),
			);
			if (found) return found;
		}

		// 2. Si no, tomamos el más reciente por defecto (ordenando por año descendente)
		// Usamos [...copia] para no mutar el array original que viene de React Query (que es inmutable)
		return [...carreraJson.planes].sort(
			(a, b) => b.anioInicio - a.anioInicio,
		)[0];
	}, [carreraJson, planAnioParam]);

	// Sincronizar URL solo cuando ya tenemos datos y falta el plan
	useEffect(() => {
		if (planActivo && !planAnioParam) {
			const currentSearch = searchParams.toString();
			const search = currentSearch ? `?${currentSearch}` : "";
			navigate(
				`/carreras/${carreraSlug}/${planActivo.anioInicio}${search}`,
				{ replace: true },
			);
		}
	}, [planActivo, planAnioParam, navigate, carreraSlug, searchParams]);

	// --- HANDLERS ---

	/**
	 * Maneja el cambio de plan de estudios.
	 * @param anio - El año de inicio del nuevo plan.
	 */
	/*
	const handlePlanChange = (anio: number) => {
		setSearchParams({ plan: anio.toString() });
	};
	*/

	/**
	 * Maneja la selección o deselección de una orientación.
	 * @param slug - El slug de la orientación seleccionada.
	 */
	const handleOrientacionChange = (slug: string) => {
		if (!planActivo) return;

		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set("plan", planActivo.anioInicio.toString()); // Asegurar plan

			if (orientacionSlugParam === slug) {
				newParams.delete("orientacion"); // Toggle off
			} else {
				newParams.set("orientacion", slug); // Select new
			}
			return newParams;
		});
	};

	// --- RENDER ---
	if (isLoading) return <Cargando />;

	if (isError || !carreraJson) {
		return (
			<section className="flex h-[calc(100vh-12rem)] w-full items-center justify-center gap-3">
				<span className="text-text-900 dark:text-text-100 texto-label">
					Ups! Algo salió mal. Parece que no se encontró la
					información de la carrera.
				</span>
			</section>
		);
	}

	// Si no hay plan activo (caso raro si carreraJson existe pero no tiene planes), manejamos
	if (!planActivo) {
		return (
			<section className="flex h-[calc(100vh-12rem)] w-full items-center justify-center gap-3">
				<span className="text-text-900 dark:text-text-100 texto-label">
					No se encontraron planes de estudio para esta carrera.
				</span>
			</section>
		);
	}

	return (
		<section className="flex flex-col gap-6">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							asChild
							className={badgeVariants({ variant: "outline" })}
						>
							<Link to="/">
								<IconHome className="size-4" />
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/carreras">Carreras</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					{carreraJson.planes.length > 1 ? (
						<>
							<BreadcrumbItem>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Link
											to={`/carreras/${carreraSlug}`}
											className="flex items-center gap-1"
										>
											{carreraJson.carrera}
											<IconChevronDown className="size-4" />
										</Link>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										{carreraJson.planes.map((plan) => (
											<DropdownMenuItem
												key={plan.anioInicio}
												asChild
											>
												<Link
													to={`/carreras/${carreraSlug}/${plan.anioInicio}`}
												>
													{plan.anioInicio}

													{/* icono check */}
													{plan.anioInicio ===
														planActivo.anioInicio && (
														<IconCheck className="size-4 text-green-500" />
													)}
												</Link>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>
									{planActivo.anioInicio}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					) : (
						<BreadcrumbItem>
							<BreadcrumbPage>
								{carreraJson.carrera}
							</BreadcrumbPage>
						</BreadcrumbItem>
					)}
				</BreadcrumbList>
			</Breadcrumb>

			<TypographyH1 className="py-3 text-center">
				{carreraJson.carrera}
			</TypographyH1>
			<Card className="mx-auto max-w-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<span
							className={buttonVariants({
								variant: "secondary",
								size: "icon-lg",
							})}
						>
							<IconInfoCircle className="size-4" />
						</span>
						<TypographyLead>Información</TypographyLead>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<Item variant="default" className="hover:bg-muted/25">
						<ItemContent>
							<ItemTitle>Resoluciones | Google Drive</ItemTitle>
							<ItemDescription>
								Esta información fue sacada de la pagina oficial
								de{" "}
								<Link to="https://exa.unne.edu.ar/r/">
									FaCENA
								</Link>
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button variant="outline" size="sm" asChild>
								<Link to={`#`}>
									Abrir
									<IconExternalLink className="size-4" />
								</Link>
							</Button>
						</ItemActions>
					</Item>
				</CardContent>
			</Card>
			<Tabs
				defaultValue={planActivo.anios[0].anio.toString()}
				className="flex w-full flex-col items-center"
			>
				<TabsList className="mb-4 flex h-auto w-full flex-wrap justify-center md:w-1/2">
					{planActivo.anios.map((anio) => (
						<TabsTrigger
							key={anio.anio}
							value={anio.anio.toString()}
						>
							{anio.anio}° Año
						</TabsTrigger>
					))}
				</TabsList>
				<OrientacionSelector
					plan={planActivo}
					currentOrientacionSlug={orientacionSlugParam}
					onSelect={handleOrientacionChange}
					showTitle={false}
				/>
				{/* --- GRILLA DE AÑOS --- */}
				<AniosGrid
					anios={planActivo.anios}
					orientacionSlug={orientacionSlugParam}
					carreraSlug={carreraSlug || ""}
					planAnio={planActivo.anioInicio}
				/>
			</Tabs>
		</section>
	);
}
