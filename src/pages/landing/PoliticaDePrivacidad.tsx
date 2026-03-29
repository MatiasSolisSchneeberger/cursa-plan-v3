import {
	TypographyH2,
	TypographyP,
	TypographyList,
	TypographyBlockquote,
} from "@/components/ui/Typography";
import LandingLayout from "@/layout/LandingLayout";

export default function PoliticaDePrivacidad() {
	return (
		<LandingLayout title="Política de Privacidad">
			<TypographyBlockquote>
				En CursaPlan, creemos que tus datos académicos son tuyos.
			</TypographyBlockquote>

			<TypographyH2 className="border-background-300 dark:border-background-700 mt-8 mb-4 text-left">
				1. Qué datos recolectamos
			</TypographyH2>
			<TypographyList className="mb-4">
				<li className="marker:text-primary-600 dark:marker:text-primary-400">
					<strong>Información de Cuenta:</strong> Si te registras,
					guardamos tu email y nombre de usuario (gestionado vía
					Supabase).
				</li>
				<li className="marker:text-primary-600 dark:marker:text-primary-400">
					<strong>Datos de Uso:</strong> Guardamos en tu navegador
					(LocalStorage) qué carrera estás viendo y el estado de tus
					materias (Aprobada/Cursando) para que no tengas que cargarlo
					cada vez que entras.
				</li>
			</TypographyList>

			<TypographyH2 className="border-background-300 dark:border-background-700 mt-8 mb-4 text-left">
				2. Cookies
			</TypographyH2>
			<TypographyP>
				No utilizamos cookies de rastreo publicitario. Solo utilizamos
				tokens técnicos para mantener tu sesión abierta.
			</TypographyP>

			<TypographyH2 className="border-background-300 dark:border-background-700 mt-8 mb-4 text-left">
				3. Tus Derechos
			</TypographyH2>
			<TypographyP>
				Podés pedir la eliminación completa de tu cuenta y todos tus
				datos asociados enviando un mensaje a través de nuestro
				formulario de contacto.
			</TypographyP>
		</LandingLayout>
	);
}
