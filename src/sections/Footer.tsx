import { useEffect, useState } from "react";
import LogoPage from "@/components/LogoPage";
import { Link } from "react-router-dom";

import supabase from "@/utils/supabase";
import { INTERNAL_LINKS, SOCIAL_LINKS } from "@/utils/links";
import {
	Item,
	ItemContent,
	ItemGroup,
	ItemHeader,
	ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import IconCarrera from "@/components/IconCarrera";
import { Label } from "@/components/ui/label";
import {
	TypographyLarge,
	TypographyP,
	TypographySmall,
} from "@/components/ui/Typography";

interface Carrera {
	id: number;
	nombre: string;
	slug: string;
	icon: string;
}

export default function Footer() {
	const [carreras, SetCarreras] = useState<Carrera[]>([]);

	const urlActual = window.location.pathname;

	useEffect(() => {
		const fetchCarreras = async () => {
			const { data, error } = await supabase
				.from("carreras")
				.select("id, nombre, slug, icon")
				.order("slug", { ascending: true });

			if (error) {
				console.log("Error al buscar carreras:", error);
			} else {
				SetCarreras(data);
			}
		};

		fetchCarreras();
	}, []);

	return (
		<footer className="bg-card border-border grid w-full grid-cols-1 items-start justify-center gap-6 rounded-3xl p-6 outline sm:grid-cols-2 md:grid-cols-3">
			{/* Columna 1: Brand & Social */}
			<aside className="flex flex-col gap-4">
				<LogoPage />
				<div className="texto-label flex flex-col gap-2">
					<TypographyP>
						Esta es una pagina para los alumnos{" "}
					</TypographyP>
					<TypographySmall>
						© {new Date().getFullYear()} Cursa Plan. Todos los
						derechos reservados.
					</TypographySmall>
				</div>
				<div className="flex gap-2">
					{SOCIAL_LINKS.map((link) => (
						<Button
							key={link.label}
							variant="outline"
							asChild
							size={"icon-lg"}
						>
							<Link
								to={link.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								{link.icon}
							</Link>
						</Button>
					))}
				</div>
			</aside>

			{/* Columna 2: Carreras */}
			<section>
				<ItemGroup>
					<Label>
						<TypographyLarge>Carreras</TypographyLarge>
					</Label>
					{carreras?.map((carrera) => (
						<Item key={carrera.id} asChild>
							<Link
								to={`/carreras/${carrera.slug}`}
								className={`theme-${carrera.slug}`}
							>
								<IconCarrera
									icon={carrera.icon}
									className="text-primary"
								/>
								<ItemContent>
									<ItemHeader>
										<ItemTitle>{carrera.nombre}</ItemTitle>
									</ItemHeader>
								</ItemContent>
							</Link>
						</Item>
					))}
				</ItemGroup>
			</section>

			{/* Columna 3: Navegación */}
			<section>
				<ItemGroup>
					<Label>
						<TypographyLarge>Navegación</TypographyLarge>
					</Label>
					{INTERNAL_LINKS.map((link) => {
						if (link.href !== urlActual) {
							return (
								<Item key={link.label} asChild>
									<Link to={link.href}>
										{link.icon}
										<ItemContent>
											<ItemHeader>
												<ItemTitle>
													{link.label}
												</ItemTitle>
											</ItemHeader>
										</ItemContent>
									</Link>
								</Item>
							);
						}
						return null;
					})}
				</ItemGroup>
			</section>
		</footer>
	);
}
