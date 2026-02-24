import Button from "@/components/Button";
import { IconRocket, IconSchool, IconArrowRight } from "@tabler/icons-react";
import Chip from "@/components/Chip";

export default function HeroSection() {
	return (
		<section className="from-primary-200/50 via-background-100 to-secondary-200/50 dark:from-primary-900/30 dark:via-background-800 dark:to-secondary-900/30 border-background-300 dark:border-background-900 relative flex min-h-[60vh] w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-4xl border-2 bg-linear-to-bl p-8 shadow-lg md:p-16">
			{/* Decoración sutil con tus variables de color */}
			<div className="bg-primary-300/30 dark:bg-primary-700/30 pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-[120px]" />
			<div className="bg-secondary-300/30 dark:bg-secondary-700/30 pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-[120px]" />

			<Chip color="primary" selected iconLeft={<IconRocket size={20} />}>
				Cursa Plan v3.2
			</Chip>

			<div className="z-10 max-w-4xl space-y-6 text-center">
				{/* Uso de tus clases personalizadas de index.css */}
				<h1 className="texto-display text-text-900 dark:text-text-100">
					Bienvenido a <br />
					<span className="from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-linear-to-r bg-clip-text text-transparent">
						Cursa Plan
					</span>
				</h1>

				<p className="texto-title text-text-700 dark:text-text-300 mx-auto max-w-2xl">
					Entrá para conocer cada materia, sus correlativas y
					requisitos, además del plan de estudios y las próximas mesas
					de examen. Toda la información para avanzar en tu carrera.
				</p>

				<div className="flex flex-wrap justify-center gap-4 pt-4">
					{/* Integración directa de tu componente Button */}
					<Button
						size="lg"
						variant="solid"
						color="primary"
						iconRight={<IconArrowRight size={20} />}
						href="/register"
					>
						Comenzar ahora
					</Button>

					<Button
						size="lg"
						variant="flat"
						color="secondary"
						iconLeft={<IconSchool size={20} />}
						href="/explorar"
					>
						Explorar carreras
					</Button>
				</div>
			</div>
		</section>
	);
}
