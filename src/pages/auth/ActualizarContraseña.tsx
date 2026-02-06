import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {IconLock, IconAlertCircle, IconLoader2} from "@tabler/icons-react"
import supabase from "../../utils/supabase"
import Card from "../../components/Card"
import CardHeader from "../../components/CardHeader"
import CardBody from "../../components/CardBody"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Alert from "../../components/Alert"

export default function UpdatePassword() {
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()

	// --- Funciones ---
	const checkPasswordStrength = (pass: string) => {
		const rules = [
			{regex: /.{8,}/, message: "La contraseña debe tener al menos 8 caracteres."},
			{regex: /[A-Z]/, message: "La contraseña debe tener al menos una letra mayúscula."},
			{regex: /[0-9]/, message: "La contraseña debe tener al menos un número."},
			{
				regex: /[!@#$%^&*()_+\-={};':"|,<>?]/,
				message: "La contraseña debe tener al menos un carácter especial (!@#$...).",
			},
		]

		for (const rule of rules) {
			if (!rule.regex.test(pass)) {
				return rule.message
			}
		}
		return null
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setError("Las contraseñas no coinciden")
			return
		}
		const passwordError = checkPasswordStrength(password)
		if (passwordError) {
			setError(passwordError)
			return
		}

		setLoading(true)
		setError(null)

		try {
			// 2. Actualizamos el usuario (ya está autenticado por el link del email)
			const {error} = await supabase.auth.updateUser({
				password: password,
			})

			if (error) throw error

			// Si todo sale bien, lo mandamos al inicio o login
			navigate("/", {replace: true})
		} catch (err: any) {
			setError(err.message || "Error al actualizar la contraseña")
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className="flex min-h-[50vh] items-center justify-center px-4">
			<Card className="w-full max-w-md">
				<CardHeader color="secondary">Nueva Contraseña</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						{error && (
							<Alert
								color="danger"
								icon={<IconAlertCircle />}
								title="Error"
								description={error}
								onClose={() => setError(null)}
							/>
						)}

						<Input
							label="Nueva Contraseña"
							type="password"
							placeholder="********"
							showPassword
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<Input
							label="Confirmar Contraseña"
							type="password"
							placeholder="********"
							showPassword
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>

						<Button
							type="submit"
							variant="solid"
							className="w-full"
							disabled={loading}
							iconLeft={loading ? <IconLoader2 className="animate-spin" /> : <IconLock />}>
							{loading ? "Actualizando..." : "Cambiar contraseña"}
						</Button>
					</form>
				</CardBody>
			</Card>
		</section>
	)
}
