import { TypographyH2, TypographyLead } from "@/components/ui/Typography";
import CardMateria from "../components/CardMateria";
import type { AnioJSON, MateriaJSON, PeriodoJSON } from "../types/db";
import { TabsContent } from "@/components/ui/tabs";

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
		<>
			{anios.map((anioData: AnioJSON) => (
				<TabsContent
					key={anioData.anio}
					value={anioData.anio.toString()}
					className="flex w-full flex-col gap-4"
				>
					<TypographyH2>{anioData.anio}° Año</TypographyH2>

					{anioData.periodos.map((periodo: PeriodoJSON) => (
						<article key={periodo.nroPeriodo} className="">
							<TypographyLead className="border-border mb-4 border-b pb-1 text-center">
								{formatPeriodoTitle(periodo)}
							</TypographyLead>
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
				</TabsContent>
			))}
		</>
	);
}
