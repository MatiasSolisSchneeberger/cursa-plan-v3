import {useState, useEffect} from "react"
import {
	IconUser,
	IconLock,
	IconPalette,
	IconDeviceFloppy,
	IconLoader2,
	IconAlertTriangle,
	IconCheck,
	IconChevronDown,
} from "@tabler/icons-react"
import supabase from "../utils/supabase"

// Componentes
import {Tabs, TabsContent, TabsTrigger} from "../components/Tabs"
import ButtonGroup from "../components/ButtonGroup"
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import CardFooter from "../components/CardFooter"
import Input from "../components/Input"
import Button from "../components/Button"
import Avatar from "../components/Avatar"
import Alert from "../components/Alert"
import {useAuth} from "../context/AuthContextData"
import PageHeader from "../components/PageHeader"
import Dropdown from "../components/Dropdown"
import DropdownTrigger from "../components/DropdownTrigger"
import DropdownContent from "../components/DropdownContent"
import Menu from "../components/Menu"
import MenuItem from "../components/MenuItem"
import MenuGroup from "../components/MenuGroup"
import {Modal, ModalContent, ModalOpen, ModalClose} from "../components/Modal"
import {useUpdatePassword} from "../hooks/useUpdatePassword"

export default function Config() {
	const {session, userProfile, refreshProfile} = useAuth()

	const [loading, setLoading] = useState(false)
	const [msg, setMsg] = useState<{type: "success" | "danger"; text: string} | null>(null)

	// Estado del Formulario
	const [formData, setFormData] = useState({
		full_name: "",
		username: "",
		avatar_url: "",
		icon: "" as AvatarIconName | "",
		password: "",
		confirmPassword: "",
	})

	// 1. Cargar datos actuales desde el contexto
	useEffect(() => {
		if (userProfile) {
			setFormData((prev) => ({
				...prev,
				full_name: userProfile.full_name || "",
				username: userProfile.username || "",
				avatar_url: userProfile.avatar_url || "",
				icon: userProfile.icon || "",
			}))
		}
	}, [userProfile])

	// Handler genérico para inputs
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}

	const handleIconSelect = (iconName: string) => {
		setFormData({...formData, icon: iconName})
	}

	// 2. Guardar Perfil (Nombre, Username, Avatar)
	const updateProfile = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setMsg(null)

		try {
			const {error} = await supabase
				.from("usuarios")
				.update({
					full_name: formData.full_name,
					username: formData.username,
					icon: formData.icon,
					// avatar_url: formData.avatar_url // Descomentar si implementas subida de imagen
				})
				.eq("id", session?.user.id)

			if (error) throw error

			// Actualizar el contexto con los nuevos datos
			await refreshProfile()

			setMsg({type: "success", text: "Perfil actualizado correctamente"})
		} catch (error: any) {
			setMsg({type: "danger", text: error.message || "Error al actualizar"})
		} finally {
			setLoading(false)
		}
	}

	// 3. Cambiar Contraseña - Refactorizado con hook
	const {updatePassword: updatePasswordHook, loading: loadingPassword} = useUpdatePassword()

	const updatePassword = async (e: React.FormEvent) => {
		e.preventDefault()
		setMsg(null) // Limpiar mensajes globales si los hubiera

		const result = await updatePasswordHook(formData.password, formData.confirmPassword)

		if (result.success) {
			setMsg({type: "success", text: result.message})
			setFormData((prev) => ({...prev, password: "", confirmPassword: ""}))
		} else {
			setMsg({type: "danger", text: result.message})
		}
	}

	// 4. Eliminar Cuenta (Placeholder)
	const [deleteConfirmation, setDeleteConfirmation] = useState("")

	const handleDeleteAccount = async () => {
		// 1. Validación: Si no escribió bien el nombre O no hay ID de usuario, cancelamos.
		if (deleteConfirmation !== userProfile?.full_name || !session?.user.id) return

		setLoading(true)
		setMsg(null)

		try {
			// 2. Llamamos a la función segura de la base de datos
			// Esta función borra al usuario de auth.users y por cascada borra su perfil
			const {error} = await supabase.rpc("delete_user")

			if (error) throw error

			setMsg({type: "success", text: "Cuenta eliminada. Te extrañaremos..."})

			// 3. Cerramos sesión forzosamente y redirigimos al home
			setTimeout(async () => {
				await supabase.auth.signOut()
				window.location.href = "/"
			}, 1500)
		} catch (error: any) {
			console.error("Error eliminando cuenta:", error)
			setMsg({type: "danger", text: error.message || "No se pudo eliminar la cuenta."})
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className="flex flex-col gap-3">
			<PageHeader backUrl="/perfil" title="Configuración" />

			<Tabs defaultValue="general">
				{/* --- NAVEGACIÓN DE TABS --- */}
				<div className="flex justify-start md:justify-center ">
					<ButtonGroup>
						<TabsTrigger value="general" iconLeft={<IconUser size={18} />}>
							General
						</TabsTrigger>
						<TabsTrigger value="seguridad" iconLeft={<IconLock size={18} />}>
							Seguridad
						</TabsTrigger>
					</ButtonGroup>
				</div>

				{/* --- TAB: GENERAL --- */}
				<TabsContent value="general">
					<Card className="md:w-1/2 mx-auto">
						<CardHeader color="primary">Información Personal</CardHeader>
						<CardBody>
							<form onSubmit={updateProfile} className="flex flex-col gap-4">
								<aside className="flex flex-col gap-3 items-center">
									{/* Sección Avatar */}
									<Avatar
										color="primary"
										name={formData.full_name}
										icon={formData.icon}
										size="xl"
										className="text-4xl"
									/>
									<Dropdown>
										<DropdownTrigger>
											<Button variant="outlined" type="button" iconRight={<IconChevronDown />} iconLeft={<IconUser />}>
												Cambiar Icono
											</Button>
										</DropdownTrigger>
										<DropdownContent>
											<Menu className="max-h-60 overflow-y-auto">
												<MenuGroup title="Selecciona un icono">
													<MenuItem
														onClick={() => handleIconSelect("")}
														avatar={<Avatar color="secondary" size="sm" />}
														isActive={formData.icon === ""}
														canHover>
														Sin icono
													</MenuItem>
													{[
														"mood-nerd",
														"mood-smile",
														"mood-happy",
														"mood-crazy-happy",
														"ghost",
														"robot",
														"alien",
														"code",
														"flask",
														"calculator",
														"dna",
														"atom",
														"cpu",
														"briefcase",
														"bulb",
														"book",
														"coffee",
														"headphones",
														"rocket",
														"trophy",
														"flame",
														"planet",
													].map((iconName) => (
														<MenuItem
															key={iconName}
															onClick={() => handleIconSelect(iconName)}
															avatar={<Avatar color="secondary" icon={iconName} size="sm" />}
															isActive={formData.icon === iconName}
															canHover>
															{iconName}
														</MenuItem>
													))}
												</MenuGroup>
											</Menu>
										</DropdownContent>
									</Dropdown>
								</aside>
								{/* Inputs */}
								<section className="flex-1 w-full flex flex-col gap-4">
									<Input
										label="Nombre Completo"
										name="full_name"
										value={formData.full_name}
										onChange={handleChange}
										placeholder="Tu nombre y apellido"
									/>
									<Input
										label="Nombre de Usuario"
										name="username"
										value={formData.username}
										onChange={handleChange}
										placeholder="@nombreDeUsuario"
									/>
									<Input
										label="Correo Electrónico"
										value={session?.user.email}
										disabled
										textHelp="El correo no se puede cambiar"
										className="opacity-60 cursor-not-allowed"
									/>
								</section>
								<Button
									type="submit"
									className="w-full md:w-auto"
									disabled={loading}
									iconLeft={loading ? <IconLoader2 className="animate-spin" /> : <IconDeviceFloppy />}>
									Guardar Cambios
								</Button>
							</form>
						</CardBody>
						{msg && (
							<Alert
								icon={msg.type === "success" ? <IconCheck /> : <IconAlertTriangle />}
								color={msg.type}
								title={msg.type === "success" ? "Éxito" : "Error"}
								description={msg.text}
								className="mb-6"
								onClose={() => setMsg(null)}
							/>
						)}
					</Card>
				</TabsContent>

				{/* --- TAB: SEGURIDAD --- */}
				<TabsContent value="seguridad">
					<section className="flex flex-col md:flex-row gap-6">
						<Card className="md:w-1/2">
							<CardHeader color="secondary">Cambiar Contraseña</CardHeader>
							<CardBody>
								<form onSubmit={updatePassword} className="flex flex-col gap-4">
									<Input
										type="password"
										label="Nueva Contraseña"
										name="password"
										value={formData.password}
										onChange={handleChange}
										placeholder="********"
										textHelp={`La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial (!@#$%^&*()_+\-={};':"|,<>?).`}
									/>
									<Input
										type="password"
										label="Confirmar Contraseña"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleChange}
										placeholder="********"
									/>
									<Button
										type="submit"
										color="secondary"
										disabled={loadingPassword || !formData.password}
										iconLeft={loadingPassword ? <IconLoader2 className="animate-spin" /> : <IconLock />}>
										Actualizar Contraseña
									</Button>
								</form>
							</CardBody>
						</Card>

						{/* Zona de Peligro */}
						<Card color="danger" className="md:w-1/2">
							<CardHeader color="danger">
								<div className="flex flex-row items-center gap-2 justify-center">
									<span className="w-6 h-6">
										<IconAlertTriangle />
									</span>
									<span className="w-full mr-6">Zona de Peligro</span>
								</div>
							</CardHeader>
							<CardBody>Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.</CardBody>
							<CardFooter>
								<Modal>
									{/* 1. EL GATILLO (Lo que el usuario ve primero) */}
									<ModalOpen>
										<Button color="danger" variant="outlined">
											Eliminar Cuenta
										</Button>
									</ModalOpen>

									{/* 2. EL CONTENIDO (Aparece al hacer click, centrado y con blur) */}
									<ModalContent size="md">
										<Card color="danger">
											<CardHeader color="danger">Eliminando Cuenta</CardHeader>
											<CardBody>
												<Alert
													icon={<IconAlertTriangle />}
													color="danger"
													title="¿Estás seguro de eliminar tu cuenta?"
													description="Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate."
													canClose={false}
												/>
												<p>
													Ingresa tu nombre completo <strong>{userProfile?.full_name}</strong> para confirmar.
												</p>
												<Input
													label="Nombre Completo"
													name="deleteConfirmation"
													value={deleteConfirmation}
													onChange={(e) => setDeleteConfirmation(e.target.value)}
													placeholder={userProfile?.full_name || "Tu nombre completo"}
												/>
											</CardBody>
											<CardFooter className="flex flex-row gap-2">
												<ModalClose className="w-full">
													<Button variant="outlined" color="danger" className="w-full">
														Cancelar
													</Button>
												</ModalClose>
												<Button
													variant="solid"
													color="danger"
													className="w-full"
													disabled={deleteConfirmation !== userProfile?.full_name}
													onClick={handleDeleteAccount}>
													Eliminar
												</Button>
											</CardFooter>
										</Card>
									</ModalContent>
								</Modal>
							</CardFooter>
						</Card>
					</section>
				</TabsContent>
			</Tabs>
		</section>
	)
}
