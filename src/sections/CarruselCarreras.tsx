import { Link } from "react-router-dom";
import CardCarrera from "../components/CardCarrera";
import Cargando from "./Cargando";
import { useCarreras } from "../hooks/useCarreras";
import { Badge } from "@/components/ui/badge";

export default function CarruselCarreras() {
	const { carreras, loading } = useCarreras();

	if (loading) {
		return <Cargando />;
	}

	return (
		<section className="container mx-auto flex flex-col items-center gap-3">
			<Badge variant="secondary">Carreras disponibles</Badge>
			<Link to="/carreras" className="w-full">
				<h2 className="scroll-m-20 text-center text-3xl font-semibold tracking-tight">
					Todas las carreras de FaCENA
				</h2>
				<p className="text-text-600 dark:text-text-400 texto-title text-center text-pretty">
					Busca tu carrera y deja de perder tiempo buscando la
					información importante entre tantas resoluciones
				</p>
				<section className="group relative w-full overflow-hidden py-4">
					<div className="animate-scroll group-hover:paused flex w-max flex-row gap-8">
						{[...carreras, ...carreras].map(
							({ nombre, slug, icon }, index) => {
								const nombreCarrera = nombre
									.replace("Licenciatura", "Lic.")
									.replace("Profesorado", "Prof.")
									.replace("Tecnicatura", "Tec.")
									.replace("Ingeniería", "Ing.");

								return (
									<CardCarrera
										carrera={nombreCarrera}
										slug={slug}
										icon={icon}
										key={index}
										className="w-sm"
									/>
								);
							},
						)}
					</div>
				</section>
			</Link>
		</section>
	);
}
