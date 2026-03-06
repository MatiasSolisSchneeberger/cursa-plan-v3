import { Button } from "@/components/ui/button";
import { IconRocket, IconSchool, IconArrowRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { TypographyH1, TypographyLead } from "@/components/ui/Typography";

export default function HeroSection() {
	return (
		<section className="container flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
			<Badge>
				<IconRocket />
				Cursa Plan v3.2
			</Badge>

			<TypographyH1 className="mb-3">
				Bienvenido a Cursa Plan
			</TypographyH1>

			<TypographyLead>
				Entrá para conocer cada materia, sus correlativas y requisitos,
				además del plan de estudios y las próximas mesas de examen. Toda
				la información para avanzar en tu carrera.
			</TypographyLead>

			{/* CTA */}
			<footer className="flex flex-wrap justify-center gap-4 pt-4">
				<Button asChild>
					<Link to="/register">
						Comenzar ahora
						<IconArrowRight size={20} />
					</Link>
				</Button>

				<Button variant="secondary" asChild>
					<Link to="/carreras">
						<IconSchool size={20} />
						Explorar carreras
					</Link>
				</Button>
			</footer>
		</section>
	);
}
