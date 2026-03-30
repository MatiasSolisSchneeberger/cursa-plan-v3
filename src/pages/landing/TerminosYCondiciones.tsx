import { Badge } from "@/components/ui/badge";
import {
	TypographyH2,
	TypographyP,
	TypographyList,
} from "@/components/ui/Typography";
import LandingLayout from "@/layout/LandingLayout";

export default function TerminosYCondiciones() {
	return (
		<LandingLayout title="Términos y Condiciones">
			<div className="mb-6">
				<Badge variant="default">
					Última actualización: Febrero 2026
				</Badge>
			</div>

			<TypographyP>
				Bienvenido a CursaPlan. Al acceder y utilizar este sitio web,
				aceptas cumplir con los siguientes términos y condiciones.
				CursaPlan es un proyecto personal e independiente. Si no estás
				de acuerdo con alguna parte de estos términos, te recomendamos
				no utilizar el servicio.
			</TypographyP>

			<TypographyH2>
				1. Naturaleza del Servicio (Aviso Legal)
			</TypographyH2>
			<TypographyP>
				CursaPlan es una herramienta <strong>no oficial</strong>{" "}
				desarrollada por un estudiante de la facultad con el fin de
				facilitar la organización académica.
			</TypographyP>
			<TypographyList>
				<li>
					<strong>Sin validez oficial:</strong> La información aquí
					presentada (correlatividades, fechas, horarios, programas)
					tiene fines meramente informativos y de ayuda.{" "}
					<strong>
						No reemplaza la información oficial de la facultad.
					</strong>
				</li>
				<li>
					<strong>Fuente de Verdad:</strong> La única fuente de
					información válida y vinculante para trámites académicos,
					inscripciones y exámenes es el sistema{" "}
					<strong>SIU Guaraní</strong> y las resoluciones oficiales de
					la <strong>FaCENA - UNNE</strong>.
				</li>
				<li>
					<strong>Exención de responsabilidad:</strong> El
					desarrollador de CursaPlan no se hace responsable por
					confusiones, inscripciones fallidas, errores en la carga de
					datos o problemas académicos derivados del uso de esta
					información.{" "}
					<strong>
						Es responsabilidad del usuario verificar siempre los
						datos con la facultad.
					</strong>
				</li>
			</TypographyList>

			<TypographyH2>2. Privacidad y Uso de Datos</TypographyH2>
			<TypographyP>
				Tu privacidad es prioritaria. Entendemos que tus datos
				académicos son personales.
			</TypographyP>
			<TypographyList>
				<li>
					<strong>Finalidad de los datos:</strong> Si decides crear
					una cuenta, almacenamos tu progreso (materias
					aprobadas/regularizadas) en nuestra base de datos segura
					únicamente con el fin de{" "}
					<strong>sincronizar tu información</strong>. Esto te permite
					acceder a tu plan de estudios actualizado desde cualquier
					dispositivo (celular, PC, tablet) sin perder tus cambios.
				</li>
				<li>
					<strong>Datos almacenados:</strong> Solo guardamos tu correo
					electrónico (para autenticación) y el estado de las materias
					que tú mismo marcas.
				</li>
				<li>
					<strong>No comercialización:</strong> No vendemos,
					alquilamos ni compartimos tu información personal con
					terceros ni empresas publicitarias.
				</li>
			</TypographyList>

			<TypographyH2>3. Propiedad Intelectual</TypographyH2>
			<TypographyList>
				<li>
					<strong>Del Código:</strong> El diseño, lógica y código
					fuente de CursaPlan son propiedad de su desarrollador.
				</li>
				<li>
					<strong>Del Contenido Académico:</strong> Los planes de
					estudio, nombres de materias y logotipos institucionales son
					propiedad intelectual de la <strong>UNNE</strong> y se
					utilizan en este sitio con fines informativos y educativos
					bajo el principio de "Uso Justo" (Fair Use).
				</li>
				<li>
					<strong>Del Contenido de Usuarios:</strong> Si en el futuro
					subes apuntes o resúmenes a la plataforma, declaras ser el
					autor de los mismos o tener el derecho explícito para
					distribuirlos.
				</li>
			</TypographyList>

			<TypographyH2>4. Uso Aceptable del Sitio</TypographyH2>
			<TypographyP>
				Te comprometes a utilizar el sitio únicamente con fines legales
				y académicos. Queda estrictamente prohibido:
			</TypographyP>
			<TypographyList>
				<li>
					Intentar dañar, deshabilitar o sobrecargar los servidores de
					CursaPlan.
				</li>
				<li>
					Utilizar scripts automatizados (bots/scrapers) para extraer
					información masiva sin permiso explícito.
				</li>
				<li>
					Subir contenido malicioso, ofensivo o que viole derechos de
					autor en las secciones de comunidad.
				</li>
			</TypographyList>

			<TypographyH2>5. Disponibilidad y Modificaciones</TypographyH2>
			<TypographyP>
				Al ser un proyecto mantenido por un estudiante:
			</TypographyP>
			<TypographyList>
				<li>
					<strong>Sin garantía de continuidad:</strong> Nos reservamos
					el derecho de modificar, suspender o discontinuar el
					servicio (temporal o permanentemente) sin previo aviso, ya
					sea por mantenimiento, falta de tiempo o costos de
					infraestructura.
				</li>
				<li>
					<strong>Modificaciones de los términos:</strong> Podemos
					actualizar estos términos en cualquier momento. Se te
					notificará de cambios importantes a través de la plataforma.
				</li>
			</TypographyList>

			<TypographyH2>6. Contacto</TypographyH2>
			<TypographyP>
				Para reportar errores en la información, bugs del sistema o
				problemas con tu cuenta, por favor utiliza el formulario de{" "}
				<strong>Feedback</strong> disponible en el menú de la
				aplicación.
			</TypographyP>
		</LandingLayout>
	);
}
