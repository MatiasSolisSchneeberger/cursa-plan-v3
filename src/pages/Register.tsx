import {useState} from "react"
import Button from "../components/Button"
import supabase from "../utils/supabase"
import Alert from "../components/Alert"
import {IconAlertCircle, IconCheck} from "@tabler/icons-react"
import {Link} from "react-router-dom"

export default function Register() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")
	const [name, setName] = useState<string>("")
	const [username, setUsername] = useState<string>("")

	const [errorMsg, setErrorMsg] = useState<string | null>("")
	const [successMsg, setSuccessMsg] = useState<string | null>("")
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMsg(null)
		setSuccessMsg(null)

		if (!email || !password || !name || !username || !confirmPassword) {
			setErrorMsg("Por favor, completa todos los campos")
			return
		}

		if (password.length < 6) {
			setErrorMsg("La contraseña debe tener al menos 6 caracteres")
			return
		}

		if (password !== confirmPassword) {
			setErrorMsg("Las contraseñas no coinciden")
			return
		}

		setLoading(true)

		const {error} = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: window.location.origin,
				data: {
					username: username,
					full_name: name,
				},
			},
		})

		setLoading(false)

		if (error) {
			console.error(error)
			setErrorMsg(error.message)
		} else {
			setSuccessMsg("Verifica tu correo electrónico para confirmar tu cuenta")
		}
	}

	return (
		<section className="flex items-center justify-center h-screen flex-col bg-background-50 dark:bg-background-950 p-4">
			<div className="w-full max-w-sm flex flex-col gap-6">
				<h1 className="text-3xl font-bold text-center text-primary-700 dark:text-primary-300">Crear Cuenta</h1>

				<form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
					{/* Input Nombre Real */}
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium ml-1">Nombre Completo</label>
						<input
							className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-primary-500 transition-all"
							type="text"
							placeholder="Tu nombre completo"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>

					{/* Input Usuario/Apodo (NUEVO) */}
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium ml-1">Apodo / Usuario</label>
						<input
							className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-primary-500 transition-all"
							type="text"
							placeholder="Tu apodo o usuario"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
					</div>

					{/* Input Email */}
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium ml-1">Correo Electrónico</label>
						<input
							className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-primary-500 transition-all"
							type="text"
							placeholder="tu@email.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>

					{/* Input Password */}
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium ml-1">Contraseña</label>
						<input
							className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-primary-500 transition-all"
							type="password"
							placeholder="********"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium ml-1">Confirmar Contraseña</label>
						<input
							className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-primary-500 transition-all"
							type="password"
							placeholder="********"
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
						/>
					</div>

					<Button type="submit" disabled={loading} className="mt-2">
						{loading ? "Registrando..." : "Registrarse"}
					</Button>
				</form>

				<p className="text-center text-sm text-gray-500">
					¿Ya tienes cuenta?{" "}
					<Link to="/login" className="text-primary-600 font-bold hover:underline">
						Inicia Sesión
					</Link>
				</p>
			</div>

			{/* Alertas Flotantes */}
			{errorMsg && (
				<div className="absolute bottom-4 right-4 animate-in slide-in-from-bottom-5">
					<Alert color="danger" icon={<IconAlertCircle />} title="Error" description={errorMsg} />
				</div>
			)}

			{successMsg && (
				<div className="absolute bottom-4 right-4 animate-in slide-in-from-bottom-5">
					<Alert color="success" icon={<IconCheck />} title="Éxito" description={successMsg} />
				</div>
			)}
		</section>
	)
}
