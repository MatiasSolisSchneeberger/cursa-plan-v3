import CardMateria from "@/components/CardMateria";
import type { AnioJSON, MateriaJSON, PeriodoJSON } from "@/types/db";

interface AniosGridProps {
	anios: AnioJSON[];
	orientacionSlug: string | null;
	carreraSlug: string;
	planAnio: number;
}

// Helper para formatear el título del periodo
const formatPeriodoTitle = (periodo: PeriodoJSON) => {
	const { nombre, slug } = periodo.tipoPeriodo;
	const isSpecial =
		slug.includes("anual") || slug.includes("extracurricular");

	if (isSpecial) return nombre;
	if (periodo.nroPeriodo > 0) return `${periodo.nroPeriodo}° ${nombre}`;
	return nombre;
};

export default function AniosGrid({
	anios,
	orientacionSlug,
	carreraSlug,
	planAnio,
}: AniosGridProps) {
	return (
		<article className="flex flex-col gap-8">
			{anios.map((anioData: AnioJSON) => (
				<section
					key={anioData.anio}
					id={anioData.anio.toString()}
					className="flex scroll-mt-28 flex-col gap-4"
				>
					<h2 className="texto-headline text-text-900 dark:text-text-100 border-background-300 dark:border-background-700 border-b-2 pb-2 text-center">
						{anioData.anio}° Año
					</h2>

					{anioData.periodos.map((periodo: PeriodoJSON) => (
						<article key={periodo.nroPeriodo} className="">
							<h3 className="texto-title text-text-700 dark:text-text-300 border-background-300 dark:border-background-700 mb-3 border-b-2 pb-1 text-center capitalize">
								{formatPeriodoTitle(periodo)}
							</h3>
							<section className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
								{periodo.materias
									.filter((materia: MateriaJSON) => {
										// Si no hay filtro de orientación, mostramos todo
										if (!orientacionSlug) return true;
										// Las materias comunes (sin orientación) siempre se muestran
										if (!materia.orientacion) return true;
										// Si hay filtro, mostramos solo las que coinciden
										if (
											materia.orientacion.slug ===
											orientacionSlug
										)
											return true;
										return false;
									})
									.map((materia: MateriaJSON) => (
										<CardMateria
											key={
												materia.idMateriaPlan ||
												materia.id
											}
											materia={materia}
											carreraSlug={carreraSlug}
											planAnio={planAnio}
										/>
									))}
							</section>
						</article>
					))}
				</section>
			))}
		</article>
	);
}
