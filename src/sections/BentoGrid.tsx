import { motion } from "framer-motion";
import {
	IconDevicesPc,
	IconCalendarClock,
	IconUserPlus,
	IconArrowRight,
	IconSparkles,
	IconProgressCheck,
} from "@tabler/icons-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
		<section className="container mx-auto flex flex-col items-center gap-6 px-4 py-10">
			<Badge variant="secondary">Nuestro sistema</Badge>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, margin: "-50px" }}
				className="grid h-auto w-full grid-cols-1 gap-4 md:h-[650px] md:grid-cols-6 md:grid-rows-3"
			>
				{/* 1. HERO CARD - MOCKUP (Grande: ocupa 4 columnas y 2 filas) */}
				<motion.div
					variants={itemVariants}
					className="col-span-1 h-full min-h-[400px] w-full md:col-span-4 md:row-span-2"
				>
					<Card className="grid h-full grid-cols-1 md:grid-cols-2">
						<CardHeader className="relative flex h-full flex-col justify-center gap-4">
							<Badge variant="secondary">
								<IconSparkles /> Nueva Plataforma
							</Badge>
							<CardTitle className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
								CursaPlan
							</CardTitle>
							<CardDescription className="text-muted-foreground mb-6 text-base md:text-lg">
								Tu plataforma integral para gestionar
								inscripciones, horarios y todo tu recorrido
								académico en un solo lugar.
							</CardDescription>
						</CardHeader>

						<CardContent className="">
							<img
								src="/images/mockup/Carreras-web.png"
								alt="CursaPlan Dashboard Mockup"
								className="h-full w-full scale-125 border-t border-l border-white/20 object-cover object-top-left drop-shadow-2xl md:rounded-tl-2xl dark:border-white/10"
							/>
						</CardContent>
						<CardFooter className="flex gap-3 md:col-span-2">
							<Button className="px-6" asChild>
								<Link to="/carreras">Ver carreras</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link
									to="/register"
									className="flex items-center gap-2"
								>
									Comenzar ahora
									<IconArrowRight size={20} />
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</motion.div>

				{/* 2. Acceso desde cualquier dispositivo (2 columnas, 2 filas) */}
				<motion.div
					variants={itemVariants}
					className="col-span-1 h-full min-h-[400px] w-full md:col-span-2 md:row-span-2"
				>
					<Card className="group relative flex h-full w-full flex-col overflow-hidden shadow-sm dark:shadow-none">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
								<IconDevicesPc />
								Multiplataforma
							</CardTitle>
							<CardDescription>
								Accede desde tu PC, tablet o celular con la
								misma fluidez y diseño adaptativo.
							</CardDescription>
						</CardHeader>
						<CardContent className="relative">
							<img
								src="/images/mockup/CarreraLSI-iPhone&Galaxy.png"
								alt="Mobile App Mockup"
								className="absolute -top-6 right-1/2 h-auto translate-x-1/2 object-cover drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:translate-y-[-10px] md:w-[130%]"
							/>
						</CardContent>
					</Card>
				</motion.div>

				{/* 3. PERIODOS Y FECHAS (Horizontal: 2 columnas, 1 fila) */}
				<motion.div
					variants={itemVariants}
					className="col-span-1 h-full w-full md:col-span-2 md:row-span-1"
				>
					<Link to="/calendario">
						<Card className="group relative h-full min-h-[150px]">
							<CardHeader className="relative z-10 flex h-full flex-col justify-center">
								<CardTitle className="mb-1 flex items-center gap-2 text-xl font-bold">
									<IconCalendarClock className="text-primary-200 h-6 w-6" />
									Fechas Clave
								</CardTitle>
								<CardDescription>
									Nunca más te pierdas un período de
									inscripción o examen final.
								</CardDescription>
							</CardHeader>
							<div className="pointer-events-none absolute top-[-20%] right-[-10%] opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
								<IconCalendarClock className="h-48 w-48" />
							</div>
							<Button
								className="absolute right-4 bottom-4 translate-x-2 rounded-full p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:translate-x-0 group-hover:opacity-100"
								size="icon"
							>
								<IconArrowRight />
							</Button>
						</Card>
					</Link>
				</motion.div>

				{/* 4. FERIADOS (Pequeño: 2 columnas, 1 fila) */}
				<motion.div
					variants={itemVariants}
					className="col-span-1 h-full w-full md:col-span-2 md:row-span-1"
				>
					<Card className="group relative h-full">
						<CardHeader className="relative z-20 w-[60%] p-6">
							<CardTitle className="flex items-center gap-2 text-xl font-bold">
								<IconProgressCheck className="text-primary h-6 w-6" />
								Controla tu progreso
							</CardTitle>
							<CardDescription>
								Guardá tu progreso de la carrera en cada materia
							</CardDescription>
						</CardHeader>
						<CardContent className="absolute right-0 bottom-0 z-10 h-[85%] w-[55%] p-0">
							<img
								src="/images/mockup/Tarjeta.png"
								alt="Tarjeta Feriados Mockup"
								className="h-full w-full translate-x-4 translate-y-2 rotate-[-5deg] object-contain object-bottom-right drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.2] group-hover:-rotate-2"
							/>
						</CardContent>
					</Card>
				</motion.div>

				{/* 5. CTA REGISTRO (2 columnas, 1 fila) */}
				<motion.div
					variants={itemVariants}
					className="col-span-1 h-full w-full md:col-span-2 md:row-span-1"
				>
					<Card className="group hover:bg-accent flex h-full w-full cursor-pointer flex-col justify-center bg-transparent shadow-none transition-all ease-in-out">
						<CardHeader className="p-6 text-center">
							<CardTitle className="flex flex-col items-center gap-3 text-xl font-bold">
								<IconUserPlus className="text-primary-600 dark:text-primary-400 h-6 w-6 transition-all ease-in-out group-hover:scale-125" />
								Únete a CursaPlan
							</CardTitle>
							<CardDescription>
								Crea tu cuenta hoy y organiza tu futuro
								académico.
							</CardDescription>
						</CardHeader>
					</Card>
				</motion.div>
			</motion.div>
		</section>
	);
}
