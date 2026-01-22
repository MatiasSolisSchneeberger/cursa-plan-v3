import {useEffect, useState} from "react"
import Button from "../../components/Button"
import supabase from "../../utils/supabase"
import {useNavigate} from "react-router-dom"
import Card from "../../components/Card"
import CardHeader from "../../components/CardHeader"
import CardBody from "../../components/CardBody"
import Input from "../../components/Input"
import CardFooter from "../../components/CardFooter"
import {useAuth} from "../../context/AuthContext"
import Alert from "../../components/Alert"
import {IconAlertCircle, IconLoader2} from "@tabler/icons-react"

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [errorMsg, setErrorMsg] = useState<string | null>("")
	const [loading, setLoading] = useState(false)
	const [errorKey, setErrorKey] = useState<number>(0)

	const {session} = useAuth()

	const navigate = useNavigate()

	useEffect(() => {
		if (session) {
			// Si ya existe sesión, lo mandamos al inicio.
			// "replace: true" evita que pueda volver atrás con el botón del navegador.
			// "state" es el dato secreto que enviamos a la otra página.
			navigate("/", {
				replace: true,
				state: {showAlreadyLoggedInAlert: true},
			})
		}
	}, [session, navigate])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMsg(null)

		if (!email || !password) {
			setErrorMsg("Por favor ingresa tu correo y contraseña.")
			setErrorKey((prev) => prev + 1)
			return
		}

		setLoading(true)

		const {data, error} = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		setLoading(false)

		if (error) {
			// Si falla (contraseña mal, usuario no existe), mostramos el error
			console.error(error)
			setErrorKey((prev) => prev + 1)
			setErrorMsg("Credenciales incorrectas. Intenta de nuevo.")
		} else {
			// Si es ÉXITO: Redirigimos al usuario al Home o Dashboard
			console.log("Login exitoso:", data)
			navigate("/", {
				replace: true,
				state: {showSuccessAlert: true},
			})
		}
	}

	return (
		<section className="flex items-center justify-center flex-col">
			<Card className="w-full md:w-1/3">
				<CardHeader color="secondary">Hola de nuevo</CardHeader>
				<CardBody className="border-b-2 pb-6 border-background-300">
					{errorMsg && (
						<Alert
							key={errorKey}
							color="danger"
							icon={<IconAlertCircle />}
							title={"Error al iniciar sesión."}
							description={errorMsg}
							className="mb-4 animate-shake"
							onClose={() => setErrorMsg(null)}
						/>
					)}
					<form onSubmit={handleSubmit} className="flex flex-col gap-2">
						<Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						<Button
							className="w-full"
							variant="solid"
							type="submit"
							disabled={loading}
							iconLeft={loading && <IconLoader2 className="animate-spin" />}>
							{loading ? "Iniciando sesión..." : "Iniciar sesión"}
						</Button>
					</form>
				</CardBody>
				<CardFooter>
					<div className="flex flex-col md:flex-row gap-2">
						{/* TODO: Implementar flujo de recuperación de contraseña */}
						<Button variant="outlined" className="w-full" onClick={() => alert("Funcionalidad en desarrollo.")}>
							¿Te olvidaste la contraseña?
						</Button>
						<Button variant="outlined" className="w-full" href="/register">
							¿No tienes cuenta?
						</Button>
					</div>
				</CardFooter>
			</Card>
		</section>
	)
}
