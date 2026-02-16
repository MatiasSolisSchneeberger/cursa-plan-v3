import Button from "../components/Button"
import {IconSearch, IconRocket, IconUser, IconSchool, IconArrowRight} from "@tabler/icons-react"
import Chip from "../components/Chip"

export default function HeroSection() {
	return (
		<section className="relative w-full min-h-[60vh] flex flex-col gap-8 justify-center items-center overflow-hidden bg-linear-to-bl from-primary-200/50 via-background-100 to-secondary-200/50 dark:from-primary-900/30 dark:via-background-800 dark:to-secondary-900/30 p-8 md:p-16 rounded-4xl border-2 border-background-300 dark:border-background-900 shadow-lg">
			{/* Decoración sutil con tus variables de color */}
			<div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-300/30 blur-[120px] rounded-full pointer-events-none dark:bg-primary-700/30" />
			<div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary-300/30 blur-[120px] rounded-full pointer-events-none dark:bg-secondary-700/30" />

			<Chip color="primary" selected iconLeft={<IconRocket size={20} />}>
				Cursa Plan v3.2
			</Chip>

			<div className="z-10 text-center max-w-4xl space-y-6">
				{/* Uso de tus clases personalizadas de index.css */}
				<h1 className="texto-display text-text-900">
					Bienvenido a <br />
					<span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
						Cursa Plan
					</span>
				</h1>

				<p className="texto-title text-text-700 dark:text-text-300 max-w-2xl mx-auto">
					Entrá para conocer cada materia, sus correlativas y requisitos, además del plan de estudios y las próximas
					mesas de examen. Toda la información para avanzar en tu carrera.
				</p>

				<div className="flex flex-wrap justify-center gap-4 pt-4">
					{/* Integración directa de tu componente Button */}
					<Button size="lg" variant="solid" color="primary" iconRight={<IconArrowRight size={20} />} href="/login">
						Comenzar ahora
					</Button>

					<Button size="lg" variant="flat" color="secondary" iconLeft={<IconSchool size={20} />} href="/explorar">
						Explorar carreras
					</Button>
				</div>
			</div>
		</section>
	)
}
