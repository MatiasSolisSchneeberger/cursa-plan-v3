import {useLocation} from "react-router-dom"
import {
	IconHome,
	IconCalendar,
	IconInfoCircleFilled,
	IconFile,
	IconFilePencil,
	IconQuestionMark,
	IconUsers,
	IconMenu2,
	IconUser,
	IconLogout,
	IconSettings,
} from "@tabler/icons-react"

import {useAuth} from "../context/AuthContextData"
import Button from "../components/Button"
import Menu from "../components/Menu"
import MenuItem from "../components/MenuItem"
import MenuGroup from "../components/MenuGroup"
import Avatar from "../components/Avatar"
import ButtonTheme from "../components/ButtonTheme"

// Importamos tus componentes de Dropdown
import Dropdown from "../components/Dropdown"
import DropdownTrigger from "../components/DropdownTrigger"
import DropdownContent from "../components/DropdownContent"
import LogoPage from "../components/LogoPage"
import supabase from "../utils/supabase"
import {useEffect, useState} from "react"

type User = {
	id: string
	username: string
	full_name: string
	role: string
}

function AvatarMenu({
	user,
	avatarColor,
	signOut,
	pathname,
}: {
	user: User
	avatarColor: "primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info" | "background"
	signOut: () => void
	pathname: string
}) {
	return (
		<Dropdown key={`user-${pathname}`} placement="bottom-end">
			<DropdownTrigger>
				<Avatar color={avatarColor} name={user.full_name} />
			</DropdownTrigger>
			<DropdownContent>
				<Menu>
					<MenuGroup>
						<MenuItem
							avatar={<Avatar color={avatarColor} name={user.full_name} />}
							textHelp={`@${user.username}`}
							className="select-none pb-2">
							{user.full_name}
						</MenuItem>
					</MenuGroup>
					<MenuGroup title="Mi Cuenta">
						<MenuItem href="/perfil" iconLeft={<IconUser size={20} />}>
							Mi Perfil
						</MenuItem>
						<MenuItem href="/configuracion" iconLeft={<IconSettings size={20} />}>
							Configuración
						</MenuItem>
					</MenuGroup>
					{user.role === "admin" && (
						<MenuGroup title="Administrador">
							<MenuItem href="/admin" iconLeft={<IconUsers size={20} />}>
								Admin
							</MenuItem>
						</MenuGroup>
					)}
					<MenuGroup>
						<MenuItem
							onClick={signOut}
							iconLeft={<IconLogout size={20} />}
							className="text-danger-600 hover:bg-danger-50 dark:text-danger-400 dark:hover:bg-danger-900/20">
							Cerrar Sesión
						</MenuItem>
					</MenuGroup>
				</Menu>
			</DropdownContent>
		</Dropdown>
	)
}

export default function NavHeader() {
	const {pathname} = useLocation()
	const {session, signOut} = useAuth()

	const [user, setUser] = useState<User | null>(null)

	// Links principales (siempre visibles en desktop)
	const mainLinks = [
		{title: "Home", url: "/", icon: <IconHome size={20} />},
		{title: "Calendario", url: "/calendario", icon: <IconCalendar size={20} />},
	]

	// Links secundarios (agrupados en "Más")
	const secondaryLinks = [
		{title: "Sobre Nosotros", url: "/sobre-nosotros", icon: <IconInfoCircleFilled size={20} />},
		{title: "Preguntas Frecuentes", url: "/preguntas-frecuentes", icon: <IconQuestionMark size={20} />},
		{title: "Contacto", url: "/contacto", icon: <IconUsers size={20} />},
		{title: "Términos y Condiciones", url: "/terminos-y-condiciones", icon: <IconFile size={20} />},
		{title: "Política de Privacidad", url: "/politica-de-privacidad", icon: <IconFilePencil size={20} />},
		{title: "Novedades", url: "/novedades", icon: <IconFilePencil size={20} />},
	]

	useEffect(() => {
		const getProfile = async () => {
			if (!session?.user) return

			try {
				const {data, error} = await supabase
					.from("usuarios") // Tu tabla
					.select("username, full_name, role") // Las columnas que querés
					.eq("id", session.user.id) // El filtro de seguridad (tu RLS lo permite)
					.single()

				if (error) {
					console.error("Error cargando perfil:", error)
					return
				}

				if (data) {
					setUser({
						id: session.user.id,
						username: data.username,
						full_name: data.full_name,
						role: data.role || "user",
					})
				}
			} catch (error) {
				console.error("Error inesperado:", error)
			}
		}

		getProfile()
	}, [session])

	const avatarColor = user?.role === "admin" ? "warning" : "primary"

	return (
		<header className="sticky top-0 z-40 w-full mt-2 py-2">
			<section className="bg-background-50/50 backdrop-blur-md dark:bg-background-900/50 outline-background-300 dark:outline-background-700 transition-colors duration-300 rounded-3xl outline-2 flex flex-row p-3 gap-4 shadow-lg">
				{/* IZQUIERDA: Logo + Navegación */}
				<article className="flex flex-1 gap-6">
					<LogoPage />

					{/* Menú Desktop */}
					<nav className="hidden md:flex items-center gap-2">
						{mainLinks.map((link) => (
							<Button
								key={link.url}
								variant="outlined"
								color={pathname === link.url ? "primary" : "secondary"}
								href={link.url}
								iconLeft={link.icon}>
								{link.title}
							</Button>
						))}

						{/* --- DROPDOWN "MÁS" (DESKTOP) --- */}
						{/* Usamos key={pathname} para que se cierre al navegar */}
						<Dropdown key={`more-desktop-${pathname}`}>
							<DropdownTrigger>
								<Button variant="text" color="secondary" iconRight={<IconMenu2 size={20} />}>
									Más
								</Button>
							</DropdownTrigger>
							<DropdownContent>
								<Menu>
									<MenuGroup title="Información">
										{secondaryLinks.map((link) => (
											<MenuItem key={link.url} href={link.url} iconLeft={link.icon} isActive={pathname === link.url}>
												{link.title}
											</MenuItem>
										))}
									</MenuGroup>
								</Menu>
							</DropdownContent>
						</Dropdown>
					</nav>
				</article>

				{/* DERECHA: Acciones */}
				<div className="flex items-center gap-3">
					<ButtonTheme />

					<div className="h-4/5 w-0.5 bg-background-300 dark:bg-background-700 mx-1" />

					{user ?
						/* --- DROPDOWN USUARIO --- */
						<AvatarMenu user={user} avatarColor={avatarColor} signOut={signOut} pathname={pathname} />
					:	<div className="hidden md:flex gap-2">
							<Button href="/login" variant="flat">
								Ingresar
							</Button>
							<Button href="/register" variant="solid">
								Registrarse
							</Button>
						</div>
					}

					{/* --- DROPDOWN MÓVIL (HAMBURGUESA) --- */}
					<div className="md:hidden ml-1">
						<Dropdown key={`mobile-${pathname}`} placement="bottom-end">
							<DropdownTrigger>
								<Button isIconOnly variant="text" color="secondary">
									<IconMenu2 />
								</Button>
							</DropdownTrigger>
							<DropdownContent>
								<Menu className="w-64">
									{/* Ancho fijo para menú móvil */}
									<MenuGroup title="Navegación">
										{mainLinks.map((link) => (
											<MenuItem key={link.url} href={link.url} iconLeft={link.icon} isActive={pathname === link.url}>
												{link.title}
											</MenuItem>
										))}
									</MenuGroup>
									<MenuGroup title="Información">
										{secondaryLinks.map((link) => (
											<MenuItem key={link.url} href={link.url} iconLeft={link.icon} isActive={pathname === link.url}>
												{link.title}
											</MenuItem>
										))}
									</MenuGroup>
									{!session && (
										<MenuGroup title="Acceso">
											<MenuItem href="/login" iconLeft={<IconUser size={20} />}>
												Ingresar
											</MenuItem>
											<MenuItem href="/register" iconLeft={<IconUser size={20} />}>
												Registrarse
											</MenuItem>
										</MenuGroup>
									)}
								</Menu>
							</DropdownContent>
						</Dropdown>
					</div>
				</div>
			</section>
		</header>
	)
}
