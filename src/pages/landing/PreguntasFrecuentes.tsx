import { Link } from "react-router-dom";
import {
	TypographyH2,
	TypographyH3,
	TypographyP,
	TypographyList,
} from "@/components/ui/Typography";
import LandingLayout from "@/layout/LandingLayout";

export default function PreguntasFrecuentes() {
	return (
		<LandingLayout title="Preguntas Frecuentes">
			<TypographyH2 className="border-background-300 dark:border-background-700 mb-4 text-left">
				Sobre la Plataforma
			</TypographyH2>

			<TypographyH3 className="border-background-300 dark:border-background-700 mt-6 mb-3 border-b-2 pb-1">
				Aclaración Importante
			</TypographyH3>
			<TypographyP>
				Esta es una página que se encuentra en desarrollo. Puede
				contener errores o información desactualizada. Por favor,
				reporta cualquier error que encuentres.
			</TypographyP>

			<TypographyH3 className="border-background-300 dark:border-background-700 mt-6 mb-3 border-b-2 pb-1">
				¿CursaPlan es oficial de la facultad?
			</TypographyH3>
			<TypographyP>
				<strong>No.</strong> CursaPlan es un proyecto independiente
				desarrollado por un estudiante. No tenemos relación directa con
				la gestión de la FaCENA ni con el SIU Guaraní. Nuestra misión es{" "}
				<em>ayudar</em>, pero la información oficial siempre (y
				únicamente) es la que te brinda la facultad a través de sus
				canales formales.
			</TypographyP>

			<TypographyH3 className="border-background-300 dark:border-background-700 mt-6 mb-3 border-b-2 pb-1">
				¿Tengo que pagar para usarlo?
			</TypographyH3>
			<TypographyP>
				Para nada. CursaPlan es 100% gratuito y de código abierto. La
				idea es democratizar el acceso a la información.
			</TypographyP>

			<TypographyH3 className="border-background-300 dark:border-background-700 mt-6 mb-3 border-b-2 pb-1">
				¿Por qué mi carrera no aparece o tiene datos viejos?
			</TypographyH3>
			<TypographyP>
				Actualmente ya estan todas las carreras que aparecen en el sitio
				de la facultad, junto con los planes de estudio que pude
				encontrar. Faltan algunos que no pude encontrar informacion
				completa, solo se que existen. Mientras tanto te recomiendo que
				busques por tu cuenta esa informacion en el sitio de la
				facultad, y me avises para que pueda agregarlo.
			</TypographyP>

			<TypographyH3 className="border-background-300 dark:border-background-700 mt-6 mb-3 border-b-2 pb-1">
				¿Cómo puedo ayudar a mejorar la plataforma?
			</TypographyH3>
			<TypographyP>¡Genial! Hay varias formas:</TypographyP>
			<TypographyList className="list-decimal">
				<li>
					<strong>Reportar Errores:</strong> Si ves una materia mal
					ubicada o una correlativa incorrecta, usa el botón de
					feedback.
				</li>
				<li>
					<strong>Subir Material:</strong> Cuando habiliten la sección
					de recursos, podrás subir parciales viejos, resúmenes o
					guías.
				</li>
				<li>
					<strong>Difundir:</strong> Si te sirve, compartí la web con
					tus compañeros.
				</li>
				<li>
					<strong>Colaborar con el código:</strong> Si sos
					programador, podés contribuir al proyecto en GitHub. Hablame
					por privado para colaborar.{" "}
					<Link
						to="/contacto"
						className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium underline underline-offset-2 transition-colors"
					>
						Contacto
					</Link>
				</li>
			</TypographyList>
		</LandingLayout>
	);
}
