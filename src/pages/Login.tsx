import {useEffect, useState} from "react"
import Button from "../components/Button"
import supabase from "../utils/supabase"
import {Link, useNavigate} from "react-router-dom"

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [errorMsg, setErrorMsg] = useState<string | null>("")
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		console.log(email, password)
	}, [email, password])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setLoading(true)

		const {data, error} = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		setLoading(false)

		if (error) {
			// Si falla (contraseña mal, usuario no existe), mostramos el error
			console.error(error)
			setErrorMsg("Credenciales incorrectas. Intenta de nuevo.")
		} else {
			// Si es ÉXITO: Redirigimos al usuario al Home o Dashboard
			console.log("Login exitoso:", data)
			navigate("/")
		}
	}

	return (
		<section className="flex items-center justify-center h-screen flex-col bg-background-50 dark:bg-background-950 p-4">
			<div className="w-full max-w-sm flex flex-col gap-6">
				<h1 className="text-3xl font-bold text-center text-primary-700 dark:text-primary-300">Iniciar Sesión</h1>

				<form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
					{/* Input Email */}
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium ml-1">Correo Electrónico</label>
						<input
							className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-primary-500 transition-all"
							type="email"
							placeholder="tu@email.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
					</div>

					{/* Input Password */}
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium ml-1">Contraseña</label>
						<input
							className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-primary-500 transition-all"
							type="password"
							placeholder="••••••••"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
					</div>

					{/* Mensaje de Error Visual */}
					{errorMsg && (
						<div className="p-3 text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg text-center animate-pulse">
							{errorMsg}
						</div>
					)}

					{/* Botón con estado de carga */}
					<Button type="submit" disabled={loading} className="w-full">
						{loading ? "Entrando..." : "Ingresar"}
					</Button>
				</form>

				{/* Link para ir a Registro si no tiene cuenta */}
				<p className="text-center text-sm text-gray-500">
					¿No tienes cuenta?{" "}
					<Link to="/register" className="text-primary-600 font-bold hover:underline">
						Regístrate aquí
					</Link>
				</p>
			</div>
		</section>
	)
}
