import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {IconLock, IconAlertCircle, IconLoader2} from "@tabler/icons-react"
import Card from "../../components/Card"
import CardHeader from "../../components/CardHeader"
import CardBody from "../../components/CardBody"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Alert from "../../components/Alert"
import {useUpdatePassword} from "../../hooks/useUpdatePassword"

export default function UpdatePassword() {
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const navigate = useNavigate()

	// --- Hook ---
	const {updatePassword, loading, error, setError} = useUpdatePassword()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// El hook ya valida igualdad y fortaleza
		const result = await updatePassword(password, confirmPassword)

		if (result.success) {
			navigate("/", {replace: true})
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
