import { ListadoRequisitos } from "@/components/ListadoRequisitos";
import { TypographyH4 } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GrupoCorrelativa } from "@/types/db";

export default function CorrelativasTab({
	correlativasFormat,
}: {
	correlativasFormat: GrupoCorrelativa[];
}) {
	return (
		<>
			{correlativasFormat && correlativasFormat.length > 0 ? (
				<section className="flex flex-col gap-2 md:flex-row">
					<Card className="w-full flex-1">
						<CardHeader>
							<CardTitle>
								<TypographyH4>Para Cursar:</TypographyH4>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{correlativasFormat
								.filter((e) => e.tipo === "cursar")
								.map((cursarGrp) => {
									if (
										!cursarGrp ||
										cursarGrp.condiciones.length === 0
									) {
										return (
											<div className="text-muted-foreground py-2 text-center text-sm">
												No tiene requisitos para cursar.
											</div>
										);
									}
									return (
										<ListadoRequisitos
											condiciones={cursarGrp.condiciones}
										/>
									);
								})}
						</CardContent>
					</Card>
					<Card className="w-full flex-1">
						<CardHeader>
							<CardTitle>
								<TypographyH4>Para Rendir:</TypographyH4>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{correlativasFormat
								.filter((e) => e.tipo === "rendir")
								.map((cursarGrp) => {
									if (
										!cursarGrp ||
										cursarGrp.condiciones.length === 0
									) {
										return (
											<div className="text-muted-foreground py-2 text-center text-sm">
												No tiene requisitos para cursar.
											</div>
										);
									}
									return (
										<ListadoRequisitos
											condiciones={cursarGrp.condiciones}
										/>
									);
								})}
						</CardContent>
					</Card>
				</section>
			) : (
				<span className="texto-label text-text-700 dark:text-text-300 w-full text-center">
					Esta materia no tiene correlativas
				</span>
			)}
		</>
	);
}
