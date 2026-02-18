import { motion } from "framer-motion";
import {
	IconSchool,
	IconArrowRight,
	IconCalendarTime,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import CardBody from "../components/CardBody";
import Chip from "../components/Chip";
import CardHeader from "../components/CardHeader";
import Button from "../components/Button";

// Variantes de animación para que aparezcan en cascada
const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BentoGrid() {
	return (
		<section className="container mx-auto flex flex-col items-center gap-3">
			<span className="texto-label text-primary-400 dark:text-primary-600">
				Nuestro sistema
			</span>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, margin: "-50px" }}
				className="grid h-auto grid-cols-1 gap-4 md:h-[800px] md:grid-cols-6 md:grid-rows-3"
			>
				{/* 1. HERO CARD - MOCKUP (Grande: ocupa 4 columnas y 2 filas) */}
				<motion.div
					variants={itemVariants}
					className="group relative md:col-span-4 md:row-span-2"
				>
					<Card className="h-full overflow-hidden">
						<CardHeader>Todas las Carreras y Planes</CardHeader>
						<CardBody className="gap-8">
							<Chip
								color="secondary"
								iconLeft={<IconSchool size={18} />}
							>
								Académico
							</Chip>
							<span className="flex w-full justify-center">
								<p className="texto-title text-text-600 dark:text-text-400 max-w-md">
									Accede a la base de datos completa de planes
									de estudio actualizados. Materias,
									correlativas y optativas en un solo lugar.
								</p>
							</span>

							{/* IMAGEN MOCKUP */}

							<img
								src="/images/mockup/Carreras-web.png"
								alt="Interfaz de CursaPlan"
								className="scale-125"
							/>
						</CardBody>
					</Card>
				</motion.div>

				{/* 2. Acceso desde cualquier dispositivo */}
				<motion.div
					variants={itemVariants}
					className="row-span-2 md:col-span-2"
				>
					<Card className="h-full">
						<CardHeader>
							Accede desde cualquier dispositivo
						</CardHeader>
						<CardBody className="min-h-0 flex-1 gap-6">
							<p>
								Guarda todo tu progreso y podes acceder desde
								cualquier dispositivo. Para eso te tienes que
								registrar
							</p>
							<span className="bg-primary-200 dark:bg-primary-950 relative min-h-[300px] w-full flex-1 overflow-hidden rounded-xl">
								{/* Galaxy - Behind and Right */}
								<img
									src="/images/mockup/CarreraLSI-Galaxy.png"
									alt="Galaxy Mockup"
									className="absolute top-0 right-0 z-0 h-full w-9/12 scale-105 object-cover object-top opacity-90 transition-transform duration-500 hover:scale-105"
								/>
								{/* iPhone - Front and Left */}
								<img
									src="/images/mockup/CarreraLSI-iPhone.png"
									alt="iPhone Mockup"
									className="absolute top-24 left-0 z-10 h-full w-9/12 object-cover object-top drop-shadow-2xl transition-transform duration-500 hover:scale-105"
								/>
							</span>
						</CardBody>
					</Card>
				</motion.div>

				{/* 3. PERIODOS Y FECHAS (Horizontal: 3 columnas, 1 fila) */}
				<motion.div
					variants={itemVariants}
					className="md:col-span-2 md:row-span-1"
				>
					<Card className="h-full overflow-hidden">
						<CardHeader>Periodos Clave</CardHeader>
						<CardBody className="">
							<Chip
								color="secondary"
								iconLeft={<IconCalendarTime size={16} />}
							>
								Cronograma
							</Chip>
							<span className="flex flex-col gap-10 overflow-hidden rounded-b-xl md:flex-row md:gap-4 md:overflow-visible">
								<p className="texto-body text-text-600 dark:text-text-400 w-full md:w-1/2">
									Visualiza claramente cuándo son las semanas
									de inscripción, cursada y receso.
								</p>

								{/* Mini visualización de timeline */}
								<img
									src="/images/mockup/862shots_so.png"
									alt=""
									className="h-full max-h-[400px] w-full scale-[120%] overflow-hidden object-cover object-top md:w-1/2"
								/>
							</span>
						</CardBody>
					</Card>
				</motion.div>

				{/* 4. FERIADOS (Pequeño: 1 columna, 1 fila) */}
				<motion.div
					variants={itemVariants}
					className="md:col-span-2 md:row-span-1"
				>
					<Card className="h-full overflow-hidden">
						<CardHeader>Fecha de exámenes</CardHeader>
						<CardBody>
							<span className="flex flex-col gap-10 overflow-hidden rounded-b-xl md:flex-row md:gap-4 md:overflow-visible">
								<p className="texto-body text-text-600 dark:text-text-400">
									En cada materia hay un apartado para revisar
									cuando son las fechas de las mesas de
									exámenes
								</p>

								{/* Mini visualización de timeline */}
								<img
									src="/images/mockup/500shots_so.png"
									alt=""
									className="h-full max-h-[400px] w-full object-cover object-top md:w-1/2"
								/>
							</span>
						</CardBody>
					</Card>
				</motion.div>

				{/* 5. CTA REGISTRO (2 columnas, 1 fila) */}
				<motion.div
					variants={itemVariants}
					className="md:col-span-2 md:row-span-1"
				>
					<Link to="/register" className="group block h-full">
						<Card className="h-full">
							<CardHeader>Empieza Ahora</CardHeader>
							<CardBody className="flex h-full items-center justify-between gap-6">
								<p className="text-text-900 dark:text-text-100 texto-title">
									Organiza tu año ahora mismo.
								</p>
								<Button iconRight={<IconArrowRight />}>
									Registrate
								</Button>
							</CardBody>
						</Card>
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
}
