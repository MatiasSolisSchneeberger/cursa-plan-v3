import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import LandingLayout from "@/layout/LandingLayout";
import { IconAlertCircle } from "@tabler/icons-react";

export default function SobreNosotros() {
	return (
		<LandingLayout title="Sobre Nosotros">
			<>
				<h2>De estudiantes, para estudiantes 🎓</h2>
				<span>
					<p>
						CursaPlan nació de una necesidad personal que noté
						apenas pisé la facultad: entender el sistema de
						correlatividades y encontrar información actualizada
						puede ser tan difícil como aprobar el final de{" "}
						<strong>Cálculo Diferencial e Integral</strong>.
					</p>

					<p>
						Por eso creé esta herramienta. No somos la web oficial
						de la UNNE, ni de la FaCENA, ni del Centro de
						Estudiantes. Somos una iniciativa independiente con un
						objetivo simple:{" "}
						<strong>
							ahorrarte el tiempo de buscar entre cientos de PDFs
							y resoluciones para que encuentres lo que necesitás
							en segundos.
						</strong>
					</p>
				</span>

				<h2>La Evolución del Proyecto (v3.0) 🚀</h2>

				<p>
					Esta es la tercera gran iteración de CursaPlan. Reescribí la
					plataforma desde cero para dejar de ser solo una página
					informativa y convertirla en una herramienta interactiva.
				</p>

				<p>
					La gran novedad de esta versión es el{" "}
					<strong>Simulador de Carrera</strong>. Ahora, al
					registrarte, podés marcar las materias que ya aprobaste o
					regularizaste. Tu progreso se guarda en la nube para que
					puedas acceder desde tu celular o computadora y planificar
					tu año sin perder los datos.
				</p>

				<div className="my-6">
					<Alert
						variant="default"
						className="border-yellow-500 bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-500"
					>
						<IconAlertCircle className="size-4" />
						<AlertTitle>🚧 Nota de Desarrollo</AlertTitle>
						<AlertDescription>
							La plataforma se encuentra en constante
							construcción. Como se reescribió todo el código
							recientemente, es posible que encuentres
							funcionalidades básicas que aún faltan o pequeños
							errores. ¡Tu paciencia y feedback son clave para
							mejorar!
						</AlertDescription>
					</Alert>
				</div>

				<h2>¿Qué podés hacer en CursaPlan?</h2>

				<h3 className="">1. Guía de Correlativas y Planes</h3>
				<p>
					Olvídate de las dudas. Entrá a tu carrera y seleccioná tu
					Plan de Estudios (incluso si hay dos vigentes). Vas a ver el
					listado ordenado por año y, lo más importante, qué materias
					te traban y cuáles necesitás para cursar la siguiente.
				</p>
				<ul>
					<li className="marker:text-primary-600 dark:marker:text-primary-400">
						<strong>Modo Usuario:</strong> Si te logueas, el sistema
						te pinta las materias según tu estado real.
					</li>
				</ul>

				<h3 className="">2. Fechas de Mesas de Examen</h3>
				<p>
					Dentro de cada materia, agregamos un apartado con las
					próximas fechas de exámenes finales.
				</p>
				<ul>
					<li className="marker:text-primary-600 dark:marker:text-primary-400">
						<strong>Tip:</strong> Incluimos un botón para{" "}
						<strong>
							agendar la fecha directamente en tu Google Calendar
						</strong>{" "}
						con un solo clic.
					</li>
				</ul>

				<h3 className="">3. Calendario Académico Inteligente</h3>
				<p>
					No es solo un PDF. En nuestro calendario digital destacamos:
				</p>
				<ul>
					<li className="marker:text-primary-600 dark:marker:text-primary-400">
						Feriados y días no laborables.
					</li>
					<li className="marker:text-primary-600 dark:marker:text-primary-400">
						Periodos de inscripción a cursadas y exámenes.
					</li>
					<li className="marker:text-primary-600 dark:marker:text-primary-400">
						Inicio y fin de cada cuatrimestre.
					</li>
					<li className="marker:text-primary-600 dark:marker:text-primary-400">
						<strong>Semanas de Exámenes:</strong> Aclarando
						específicamente cuándo hay suspensión de clases y cuándo
						no.
					</li>
				</ul>

				<h2>Transparencia y Privacidad 🔒</h2>
				<p>
					Creemos que tus datos académicos son tuyos. CursaPlan
					almacena tu progreso (qué materias aprobaste) y tu correo
					electrónico únicamente para permitirte acceder a tu cuenta
					desde cualquier dispositivo.{" "}
					<strong>
						No compartimos ni vendemos tu información a terceros.
					</strong>{" "}
					Utilizamos tecnologías seguras (base de datos en la nube con
					autenticación) para proteger tu sesión.
				</p>

				<h2>¿Encontraste un error? 🐛</h2>
				<p>
					La información académica cambia constantemente. Si ves algo
					desactualizado o tenés una sugerencia genial, te invitamos a
					usar la sección de <strong>Feedback</strong>. Este proyecto
					se construye con la colaboración de todos.
				</p>

				<Separator />

				<p className="italic">
					CursaPlan es un proyecto independiente y no tiene afiliación
					directa con la gestión de la Facultad de Ciencias Exactas y
					Naturales y Agrimensura de la UNNE.
				</p>
			</>
		</LandingLayout>
	);
}
