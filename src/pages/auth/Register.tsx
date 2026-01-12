import {useEffect, useState} from "react"
import Button from "../../components/Button"
import supabase from "../../utils/supabase"
import Alert from "../../components/Alert"
import {IconAlertCircle, IconCheck} from "@tabler/icons-react"
import {useNavigate} from "react-router-dom"
import Input from "../../components/Input"
import Card from "../../components/Card"
import CardHeader from "../../components/CardHeader"
import CardFooter from "../../components/CardFooter"
import CardBody from "../../components/CardBody"
import {useAuth} from "../../context/AuthContext"

export default function Register() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")
	const [full_name, setFullName] = useState<string>("")
	const [username, setUsername] = useState<string>("")

	const [errorMsg, setErrorMsg] = useState<string | null>("")
	const [errorKey, setErrorKey] = useState<number>(0)
	const [successMsg, setSuccessMsg] = useState<string | null>("")
	const [loading, setLoading] = useState<boolean>(false)

	const {session} = useAuth()

	const navigate = useNavigate()

	useEffect(() => {
		if (session) {
			navigate("/", {
				replace: true,
				state: {showAlreadyLoggedInAlert: true},
			})
		}
	}, [session, navigate])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMsg(null)
		setSuccessMsg(null)

		if (!email || !password || !full_name || !username || !confirmPassword) {
			setErrorMsg("Por favor, completa todos los campos")
			setErrorKey((prev) => prev + 1)
			return
		}

		if (password.length < 6) {
			setErrorMsg("La contraseña debe tener al menos 6 caracteres")
			setErrorKey((prev) => prev + 1)
			return
		}

		if (password !== confirmPassword) {
			setErrorMsg("Las contraseñas no coinciden")
			setErrorKey((prev) => prev + 1)
			return
		}

		setLoading(true)

		const {error} = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}`,
				data: {
					username: username,
					full_name: full_name,
				},
			},
		})

		setLoading(false)

		if (error) {
			console.error(error)
			setErrorMsg(error.message)
			setErrorKey((prev) => prev + 1)
		} else {
			setSuccessMsg("Verifica tu correo electrónico para confirmar tu cuenta")
		}
	}

	return (
		<section className="flex items-center justify-center flex-col">
			<Card className="w-full md:w-1/3 flex flex-col gap-6">
				<CardHeader color="primary">Crear tu cuenta</CardHeader>
				<CardBody className="border-b-2 pb-6 border-background-300">
					{errorMsg && (
						<Alert
							key={errorKey}
							color="danger"
							icon={<IconAlertCircle />}
							title="Error al registrar"
							description={errorMsg}
							className="mb-4 animate-shake"
							onClose={() => setErrorMsg(null)}
						/>
					)}

					{successMsg && (
						<Alert
							color="success"
							icon={<IconCheck />}
							title="Éxito"
							description={successMsg}
							className="mb-4"
							onClose={() => setSuccessMsg(null)}
						/>
					)}
					<form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
						{/* Input Nombre Real */}
						<Input
							label="Nombre Real"
							type="text"
							placeholder="Tu nombre completo"
							onChange={(e) => setFullName(e.target.value)}
							value={full_name}
						/>
						{/* Input Username */}
						<Input
							label="Username"
							type="text"
							placeholder="Tu nombre de usuario"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
						<Input
							label="Correo Electrónico"
							type="email"
							placeholder="tu@email.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<Input
							label="Contraseña"
							type="password"
							placeholder="********"
							showPassword={true}
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<Input
							label="Confirmar Contraseña"
							type="password"
							placeholder="********"
							showPassword={true}
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
						/>
						<Button type="submit" disabled={loading} variant="flat" className="mt-2">
							{loading ? "Registrando..." : "Registrarse"}
						</Button>
					</form>
				</CardBody>

				<CardFooter>
					<div className="flex flex-col md:flex-row gap-2">
						<Button variant="outlined" className="w-full" href="/auth/login">
							¿Ya tienes cuenta?
						</Button>
					</div>
				</CardFooter>
			</Card>
		</section>
	)
}
