// --- IMPORTS ---
// React
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { useEffect, useMemo } from "react";

// Hooks
import { useCarrera } from "@/hooks/useCarrera";
import { usePageTitle } from "@/hooks/usePageTitle";

// Iconos
import {
	IconCheck,
	IconChevronDown,
	IconExternalLink,
} from "@tabler/icons-react";

// Componentes
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2, TypographySmall } from "@/components/ui/Typography";
import LikeButton from "@/components/LikeButton";

// Secciones
import AniosGrid from "@/sections/AniosGrid";
import Cargando from "@/sections/Cargando";
import OrientacionSelector from "@/sections/OrientacionSelector";

// --- COMPONENTE ---
export default function Carrera() {
	// --- HOOKS ---
	const { carreraSlug, planAnioParam } = useParams<{
		carreraSlug: string;
		planAnioParam?: string;
	}>();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	// --- DATOS ---
	const { data: carreraJson, isLoading, isError } = useCarrera(carreraSlug);
	const orientacionSlugParam = searchParams.get("orientacion");

	// --- EFECTOS ---
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
		<PageLayout
			className={`flex flex-col gap-12 theme-${carreraSlug}`}
			breadcrumbs={[
				{ url: "/", isHome: true },
				{ label: "Carreras", url: "/carreras" },
				...(carreraJson.planes.length > 1
					? [
							{
								customRenderer: () => (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Link
												to={`/carreras/${carreraSlug}`}
												className="hover:text-foreground flex items-center gap-1 transition-colors"
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
														className="flex items-center gap-2"
													>
														{plan.anioInicio}
														{plan.anioInicio ===
															planActivo.anioInicio && (
															<IconCheck className="size-4 text-green-600 dark:text-green-400" />
														)}
													</Link>
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								),
							},
							{
								label: planActivo.anioInicio,
								isCurrentPage: true,
							},
						]
					: [{ label: carreraJson.carrera, isCurrentPage: true }]),
			]}
		>
			<Card className="mx-auto w-full max-w-5xl">
				<CardHeader>
					<CardTitle>
						<TypographyH2 className="border-0 p-0 text-left">
							{carreraJson.carrera}
						</TypographyH2>
					</CardTitle>
					<CardAction className="flex flex-wrap items-center gap-2">
						{carreraJson.planes.length > 1 && (
							<Badge variant="secondary">
								<TypographySmall>
									Plan: {planActivo.anioInicio}
								</TypographySmall>
							</Badge>
						)}
						<LikeButton planId={planActivo.id} />
					</CardAction>
				</CardHeader>
				<CardContent className="flex flex-col gap-3">
					<Item variant="muted">
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
							<Button variant="link" size="sm" asChild>
								<Link to={`#`}>
									Abrir
									<IconExternalLink className="size-4" />
								</Link>
							</Button>
						</ItemActions>
					</Item>
					{carreraJson.planes.length > 1 &&
						(() => {
							const otroPlan = carreraJson.planes.find(
								(p) => p.anioInicio !== planActivo.anioInicio,
							);
							return (
								<Item variant="outline">
									<ItemContent>
										<ItemTitle>
											Esta carrera tiene dos planes
											vigentes
										</ItemTitle>
										<ItemDescription>
											Estás viendo el plan{" "}
											<strong>
												{planActivo.anioInicio}
											</strong>
											. También existe el plan{" "}
											<strong>
												{otroPlan?.anioInicio}
											</strong>
											.
										</ItemDescription>
									</ItemContent>
									<ItemActions>
										<Button
											variant="link"
											size="sm"
											asChild
										>
											<Link
												to={`/carreras/${carreraSlug}/${otroPlan?.anioInicio}`}
											>
												Ver plan {otroPlan?.anioInicio}
											</Link>
										</Button>
									</ItemActions>
								</Item>
							);
						})()}
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
		</PageLayout>
	);
}
