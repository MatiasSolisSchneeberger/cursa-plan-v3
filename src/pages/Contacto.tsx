import {useState} from "react"
import {
	IconBrandGithub,
	IconMail,
	IconSend,
	IconBug,
	IconBook,
	IconQuestionMark,
	IconUsers,
	IconBulb,
} from "@tabler/icons-react"
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import Input from "../components/Input"
import Button from "../components/Button"
import Alert from "../components/Alert"
import CardFooter from "../components/CardFooter"
import supabase from "../utils/supabase"
import Select from "../components/Select"

const ETIQUETAS = [
	{value: "error", label: "Reportar un Error", icon: <IconBug />},
	{value: "datos", label: "Error en Plan/Correlativas", icon: <IconBook />},
	{value: "sugerencia", label: "Sugerencia", icon: <IconBulb />},
	{value: "colaboracion", label: "Colaboración", icon: <IconUsers />},
	{value: "consulta", label: "Consulta General", icon: <IconQuestionMark />},
]

export default function Contact() {
	const [formData, setFormData] = useState({
		nombre: "",
		email: "",
		mensaje: "",
		etiqueta: "general",
	})
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setStatus("loading")
			const {error} = await supabase.from("mensajes").insert({
				nombre: formData.nombre,
				email: formData.email,
				mensaje: formData.mensaje,
				etiqueta: formData.etiqueta,
			})
			if (error) throw error
			setStatus("success")
			setFormData({nombre: "", email: "", mensaje: "", etiqueta: "general"})
			setTimeout(() => setStatus("idle"), 3000)
		} catch (error) {
			console.error("Error enviando mensaje:", error)
			setStatus("error")
			setTimeout(() => setStatus("idle"), 3000)
		}
	}

	return (
		<section className="container grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto px-4 py-8 max-w-6xl">
			<Card>
				<CardHeader color="primary">Hablemos</CardHeader>
				<CardBody>
					<p className="text-text-700 dark:text-text-300 texto-body">
						¿Tenés alguna duda sobre el plan de estudios? ¿Encontraste un error en la plataforma? ¡Escribinos! Tu
						feedback nos ayuda a mejorar CursaPlan.
					</p>
				</CardBody>
				<CardFooter className="flex flex-col gap-2">
					<Button variant="outlined" iconLeft={<IconMail />} className="w-full">
						micorreo@gmail.com
					</Button>
					<Button variant="outlined" iconLeft={<IconBrandGithub />} className="w-full">
						/cursaplan-v3
					</Button>
				</CardFooter>
			</Card>

			{/* Columna Derecha: Formulario */}
			<Card>
				<CardHeader color="secondary">Envíanos un mensaje</CardHeader>
				<CardBody>
					<div className="mb-4">
						{status === "success" && (
							<Alert color="success" title="¡Recibido!" description="Gracias por escribirnos." icon={<IconSend />} />
						)}
						{status === "error" && (
							<Alert color="danger" title="Error" description="No se pudo enviar." icon={<IconMail />} />
						)}
					</div>

					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<Input
							label="Nombre"
							placeholder="Tu nombre"
							value={formData.nombre}
							onChange={(e) => setFormData({...formData, nombre: e.target.value})}
							required
							disabled={status === "loading"}
						/>
						<Input
							label="Email"
							type="email"
							placeholder="tu@email.com"
							value={formData.email}
							onChange={(e) => setFormData({...formData, email: e.target.value})}
							required
							disabled={status === "loading"}
						/>

						<Select
							label="Motivo de contacto"
							value={formData.etiqueta}
							onChange={(val) => setFormData({...formData, etiqueta: val})}
							groupOptions={[{title: "Etiquetas", options: ETIQUETAS}]}
							disabled={status === "loading"}
						/>
						{/* TextArea manual estilizado como tu Input */}
						<div className="flex flex-col gap-1">
							<label className="texto-body text-text-800 dark:text-text-200">
								Mensaje
								<span className="text-danger-600 dark:text-danger-400"> *</span>
							</label>
							<textarea
								className="p-3 rounded-xl texto-label border-2 border-background-200 dark:border-background-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed autofill:bg-primary-200 dark:autofill:bg-primary-800 w-full min-h-[120px]"
								placeholder="¿En qué podemos ayudarte?"
								value={formData.mensaje}
								onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
								required
							/>
						</div>
						<Button type="submit" className="w-full" iconRight={<IconSend />}>
							Enviar Mensaje
						</Button>
					</form>
				</CardBody>
			</Card>
		</section>
	)
}
