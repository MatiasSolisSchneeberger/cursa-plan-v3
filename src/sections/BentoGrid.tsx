import {motion} from "framer-motion"
import {IconSchool, IconArrowRight, IconCalendarTime} from "@tabler/icons-react"
import {Link} from "react-router-dom"
import Card from "../components/Card"
import CardBody from "../components/CardBody"
import Chip from "../components/Chip"
import CardHeader from "../components/CardHeader"
import Button from "../components/Button"

// Variantes de animación para que aparezcan en cascada
const containerVariants = {
	hidden: {opacity: 0},
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: {opacity: 0, y: 20},
	show: {opacity: 1, y: 0, transition: {duration: 0.5}},
}

export default function BentoGrid() {
	return (
		<section className="container mx-auto py-20">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{once: true, margin: "-50px"}}
				className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-3 gap-4 h-auto md:h-[800px]">
				{/* 1. HERO CARD - MOCKUP (Grande: ocupa 4 columnas y 2 filas) */}
				<motion.div variants={itemVariants} className="md:col-span-4 md:row-span-2 group relative ">
					<Card color="primary" className="overflow-hidden h-full">
						<CardHeader>Todas las Carreras y Planes</CardHeader>
						<CardBody className="gap-8">
							<Chip iconLeft={<IconSchool size={18} />}>Académico</Chip>
							<span className="flex justify-center w-full">
								<p className="texto-title text-text-600 max-w-md dark:text-text-400">
									Accede a la base de datos completa de planes de estudio actualizados. Materias, correlativas y
									optativas en un solo lugar.
								</p>
							</span>

							{/* IMAGEN MOCKUP */}

							<img src="/images/mockup/Carreras-web.png" alt="Interfaz de CursaPlan" className="scale-125" />
						</CardBody>
					</Card>
				</motion.div>

				{/* 2. Acceso desde cualquier dispositivo */}
				<motion.div variants={itemVariants} className="md:col-span-2 row-span-2">
					<Card color="primary" className="h-full">
						<CardHeader>Accede desde cualquier dispositivo</CardHeader>
						<CardBody className="gap-6 flex-1 min-h-0">
							<p>
								Guarda todo tu progreso y podes acceder desde cualquier dispositivo. Para eso te tienes que registrar
							</p>
							<span className="relative w-full flex-1 overflow-hidden min-h-[300px] rounded-xl bg-primary-200 dark:bg-primary-950">
								{/* Galaxy - Behind and Right */}
								<img
									src="/images/mockup/CarreraLSI-Galaxy.png"
									alt="Galaxy Mockup"
									className="absolute top-0 right-0 w-9/12 h-full object-cover object-top opacity-90 scale-105 z-0 hover:scale-105 transition-transform duration-500"
								/>
								{/* iPhone - Front and Left */}
								<img
									src="/images/mockup/CarreraLSI-iPhone.png"
									alt="iPhone Mockup"
									className="absolute top-24 left-0 w-9/12 h-full object-cover object-top z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
								/>
							</span>
						</CardBody>
					</Card>
				</motion.div>

				{/* 3. PERIODOS Y FECHAS (Horizontal: 3 columnas, 1 fila) */}
				<motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
					<Card color="primary" className="h-full overflow-hidden">
						<CardHeader>Periodos Clave</CardHeader>
						<CardBody className="">
							<Chip iconLeft={<IconCalendarTime size={16} />}>Cronograma</Chip>
							<span className="flex flex-col md:flex-row gap-10 md:gap-4 overflow-hidden md:overflow-visible">
								<p className="texto-body text-text-600 dark:text-text-400 w-full md:w-1/2">
									Visualiza claramente cuándo son las semanas de inscripción, cursada y receso.
								</p>

								{/* Mini visualización de timeline */}
								<img
									src="/images/mockup/862shots_so.png"
									alt=""
									className="w-full md:w-1/2 object-cover h-full scale-[120%] max-h-[400px] object-top"
								/>
							</span>
						</CardBody>
					</Card>
				</motion.div>

				{/* 4. FERIADOS (Pequeño: 1 columna, 1 fila) */}
				<motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
					<Card color="primary" className="h-full overflow-hidden">
						<CardHeader>Fecha de exámenes</CardHeader>
						<CardBody>
							<span className="flex flex-col md:flex-row gap-10 md:gap-4 overflow-hidden md:overflow-visible">
								<p className="texto-body text-text-600 dark:text-text-400">
									En cada materia hay un apartado para revisar cuando son las fechas de las mesas de exámenes
								</p>

								{/* Mini visualización de timeline */}
								<img
									src="/images/mockup/500shots_so.png"
									alt=""
									className="w-full md:w-1/2 object-cover h-full max-h-[400px] object-top"
								/>
							</span>
						</CardBody>
					</Card>
				</motion.div>

				{/* 5. CTA REGISTRO (2 columnas, 1 fila) */}
				<motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
					<Link to="/register" className="h-full block group">
						<Card color="primary" className="h-full">
							<CardHeader>Empieza Ahora</CardHeader>
							<CardBody className="h-full flex items-center justify-between gap-6">
								<p className="text-primary-900 dark:text-primary-100 texto-title">Organiza tu año ahora mismo.</p>
								<Button iconRight={<IconArrowRight />}>Registrate</Button>
							</CardBody>
						</Card>
					</Link>
				</motion.div>
			</motion.div>
		</section>
	)
}
