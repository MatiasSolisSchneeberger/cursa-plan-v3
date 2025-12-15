export default function HeroSection() {
	return (
		<section className="w-full h-64 flex flex-col gap-6 justify-center items-center bg-linear-to-bl from-primary-400 to-secondary-400 dark:from-primary-600 dark:to-secondary-600 p-12 rounded-3xl">
			<h1 className="md:font-primary md:text-5xl md:leading-13 md:font-bold font-primary text-3xl leading-9 font-semibold text-primary-700 dark:text-primary-300">
				Bienvenido a Cursa Plan
			</h1>
			<p className="md:font-primary md:text-base md:leading-6 md:font-semibold md:tracking-wide font-primary text-sm leading-4 font-medium tracking-wide text-primary-900 dark:text-primary-100 text-wrap">
				Entrá para conocer cada materia, sus correlativas y requisitos, además del plan de estudios, las próximas mesas
				de examen y toda la información que necesitás para avanzar en tu carrera universitaria.
			</p>
		</section>
	)
}
