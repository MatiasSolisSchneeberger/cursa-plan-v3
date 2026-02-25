import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import CardCarrera from "@/components/CardCarrera";
import { Link } from "react-router-dom";
import Cargando from "@/sections/Cargando";

interface Carreras {
	id: number;
	nombre: string;
	slug: string;
	icon: string;
}

export default function CarruselCarreras() {
	const [loading, setLoading] = useState(true);
	const [carreras, setCarreras] = useState<Carreras[]>([]);

	useEffect(() => {
		const fetchCarreras = async () => {
			const { data, error } = await supabase
				.from("carreras")
				.select("id,nombre,slug,icon");
			if (error) {
				console.error("Error al obtener las carreras:", error);
				return;
			}
			setCarreras(data as Carreras[]);
			setLoading(false);
		};

		fetchCarreras();
	}, []);

	if (loading) {
		return <Cargando />;
	}

	return (
		<section className="container mx-auto flex flex-col items-center gap-3">
			<span className="texto-label text-primary-400 dark:text-primary-600">
				Carreras disponibles
			</span>
			<Link
				to="/explorar"
				onClick={() => {
					window.scrollTo({
						top: 0,
						behavior: "smooth",
					});
				}}
				className="w-full"
			>
				<h2 className="texto-headline text-text-800 dark:text-text-200 text-center">
					Todas las carreras de FaCENA
				</h2>
				<p className="text-text-600 dark:text-text-400 texto-title text-center text-pretty">
					Busca tu carrera y deja de perder tiempo buscando la
					información importante entre tantas resoluciones
				</p>
				<section className="relative w-full overflow-hidden py-4">
					<div className="animate-scroll flex w-max gap-8 hover:[animation-play-state:paused]">
						{[...carreras, ...carreras].map(
							({ nombre, slug, icon }, index) => (
								<CardCarrera
									carrera={nombre}
									slug={slug}
									icon={icon}
									key={index}
									className="w-max *:text-nowrap"
								/>
							),
						)}
					</div>
				</section>
			</Link>
		</section>
	);
}
