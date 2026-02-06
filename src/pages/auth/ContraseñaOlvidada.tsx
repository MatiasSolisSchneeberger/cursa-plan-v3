import {IconAlertCircle, IconCheck, IconHelp, IconLoader2, IconMail} from "@tabler/icons-react"
import Button from "../../components/Button"
import Card from "../../components/Card"
import CardBody from "../../components/CardBody"
import CardFooter from "../../components/CardFooter"
import CardHeader from "../../components/CardHeader"
import Input from "../../components/Input"
import {useState} from "react"
import supabase from "../../utils/supabase"
import Alert from "../../components/Alert"

export default function ContraseñaOlvidada() {
	const [email, setEmail] = useState("")
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		setMessage(null)

		try {
			// 1. VERIFICACIÓN SILENCIOSA
			// Llamamos a la función RPC que creamos en la base de datos
			const {data: exists, error: rpcError} = await supabase.rpc("check_email_exists", {
				email_to_check: email,
			})

			if (rpcError) throw rpcError

			// 2. LÓGICA CONDICIONAL
			if (exists) {
				// Solo si existe, llamamos a Supabase para enviar el mail
				const {error: resetError} = await supabase.auth.resetPasswordForEmail(email, {
					redirectTo: `${window.location.origin}/actualizar-contraseña`,
				})
				if (resetError) throw resetError
				console.log("Correo enviado exitosamente (Interno)")
			} else {
				// Si no existe, simulamos una espera para que no sea obvio por el tiempo de respuesta
				// (Opcional, pero recomendado para evitar ataques de tiempo)
				await new Promise((resolve) => setTimeout(resolve, 500))
				console.log("Correo no enviado: Usuario no existe (Interno)")
			}

			// 3. MENSAJE AMBIGUO (SIEMPRE EL MISMO)
			// Al usuario siempre le decimos que "Si existe, se envió".
			setMessage(
				"Si el correo está registrado en nuestra base de datos, recibirás las instrucciones para recuperar tu contraseña en breve.",
			)
		} catch (err: any) {
			// Incluso si hay error técnico, a veces es mejor mostrar el mensaje de éxito
			// o un error genérico para no dar pistas.
			console.error("Error técnico:", err)
			setError("Ocurrió un error al procesar la solicitud. Intenta nuevamente.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className="flex min-h-[50vh] items-center justify-center px-4">
			<Card className="w-full max-w-xl">
				<CardHeader color="primary">Cambiar Contraseña</CardHeader>
				<CardBody className="flex flex-col gap-4">
					<span className="texto-body text-text-800 dark:text-text-200">
						Ingresa tu correo electronico y te enviaremos un enlace para restablecer tu contraseña.
					</span>
					{error && (
						<Alert
							color="danger"
							icon={<IconAlertCircle />}
							title="Error"
							description={error}
							onClose={() => setError(null)}
						/>
					)}

					{message ?
						<Alert
							color="success"
							icon={<IconCheck />}
							title="Solicitud recibida"
							description={message}
							canClose={false}
						/>
					:	<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<Input
								label="Email"
								type="email"
								placeholder="tu@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<Button
								type="submit"
								className="w-full"
								disabled={loading}
								iconLeft={loading ? <IconLoader2 className="animate-spin" /> : <IconMail />}>
								{loading ? "Procesando..." : "Enviar enlace"}
							</Button>
						</form>
					}
				</CardBody>
				<CardFooter>
					<Button color="secondary" variant="outlined" className="w-full" iconRight={<IconHelp />}>
						Ayuda
					</Button>
				</CardFooter>
			</Card>
		</section>
	)
}
