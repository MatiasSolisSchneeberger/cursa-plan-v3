import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IconSchool } from "@tabler/icons-react";
import { TypographyH3, TypographyP } from "@/components/ui/Typography";
import { useCarrerasFav } from "@/hooks/useCarrerasFav";
import CardCarrera from "@/components/CardCarrera";

export default function CarrerasTab() {
	const { carrerasFav } = useCarrerasFav();

	if (carrerasFav.length === 0) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center justify-center gap-4 p-6 text-center">
					<IconSchool className="text-muted-foreground h-10 w-10" />
					<div>
						<TypographyH3>No sigues ninguna carrera</TypographyH3>
						<TypographyP className="text-muted-foreground">
							Añade carreras a tus favoritos para verlas en esta
							sección.
						</TypographyP>
					</div>
					<Button asChild>
						<Link to="/">Explorar Carreras</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{carrerasFav.map((fav) => (
				<CardCarrera
					key={fav.id}
					carrera={fav.plan.carrera.nombre}
					slug={fav.plan.carrera.slug}
					icon={fav.plan.carrera.icon}
					planes={[
						{
							anio: fav.plan.anio_inicio,
						},
					]}
				/>
			))}
		</div>
	);
}
