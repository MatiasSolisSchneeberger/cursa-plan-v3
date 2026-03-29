import { useState } from "react";
import { Link } from "react-router-dom";
import { IconCheck, IconHelp, IconLoader2, IconArrowLeft } from "@tabler/icons-react";
import supabase from "@/utils/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ContraseñaOlvidada() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setMessage(null);

		try {
			// 1. VERIFICACIÓN SILENCIOSA
			// Llamamos a la función RPC que creamos en la base de datos
			const { data: exists, error: rpcError } = await supabase.rpc(
				"check_email_exists",
				{
					email_to_check: email,
				},
			);

			if (rpcError) throw rpcError;

			// 2. LÓGICA CONDICIONAL
			if (exists) {
				// Solo si existe, llamamos a Supabase para enviar el mail
				const { error: resetError } =
					await supabase.auth.resetPasswordForEmail(email, {
						redirectTo: `${window.location.origin}/actualizar-contraseña`,
					});
				if (resetError) throw resetError;
				console.log("Correo enviado exitosamente (Interno)");
			} else {
				// Si no existe, simulamos una espera para que no sea obvio por el tiempo de respuesta
				// (Opcional, pero recomendado para evitar ataques de tiempo)
				await new Promise((resolve) => setTimeout(resolve, 500));
				console.log("Correo no enviado: Usuario no existe (Interno)");
			}

			// 3. MENSAJE AMBIGUO (SIEMPRE EL MISMO)
			// Al usuario siempre le decimos que "Si existe, se envió".
			setMessage(
				"Si el correo está registrado en nuestra base de datos, recibirás las instrucciones para recuperar tu contraseña en breve.",
			);
		} catch (err: unknown) {
			// Incluso si hay error técnico, a veces es mejor mostrar el mensaje de éxito
			// o un error genérico para no dar pistas.
			console.error("Error técnico:", err);
			setError(
				"Ocurrió un error al procesar la solicitud. Intenta nuevamente.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="flex flex-col items-center justify-center">
			<Card className="w-full max-w-2xl">
				<CardContent>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col">
							<FieldLegend>Recuperar contraseña</FieldLegend>
							<FieldDescription>
								Ingresá tu correo electrónico y te enviaremos un enlace
								para restablecer tu contraseña.
							</FieldDescription>
						</div>

						{message ? (
							<div className="flex flex-col gap-4">
								<Alert>
									<IconCheck className="size-5 stroke-green-500" />
									<AlertTitle>¡Correo enviado!</AlertTitle>
									<AlertDescription>{message}</AlertDescription>
								</Alert>
								<Button asChild variant="outline" className="w-full gap-2 mt-2">
									<Link to="/login">
										<IconArrowLeft size={20} />
										Volver al inicio de sesión
									</Link>
								</Button>
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								className="flex flex-col gap-4"
							>
								<FieldSet>
									<FieldGroup>
										<Field data-invalid={!!error}>
											<FieldLabel htmlFor="email">
												Correo electrónico
											</FieldLabel>
											<Input
												id="email"
												type="email"
												placeholder="tu@email.com"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
												aria-invalid={!!error}
											/>
											{error && <FieldError>{error}</FieldError>}
										</Field>
									</FieldGroup>
								</FieldSet>

								<Button
									type="submit"
									className="mt-2 w-full gap-2"
									disabled={loading}
								>
									{loading && (
										<IconLoader2 className="animate-spin" size={20} />
									)}
									{loading ? "Procesando..." : "Enviar enlace"}
								</Button>
							</form>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button
						color="secondary"
						variant="outline"
						className="w-full gap-2"
					>
						<IconHelp size={20} />
						Ayuda
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
