import LogoPage from "../components/LogoPage"
import Button from "../components/Button"
import Avatar from "../components/Avatar"
import {
	IconCalendar,
	IconHelp,
	IconHome,
	IconInfoCircle,
	IconLogin2,
	IconLogout,
	IconMenu2,
	IconUser,
} from "@tabler/icons-react"
import {useLocation} from "react-router-dom"
import Dropdown from "../components/Dropdown"
import DropdownTrigger from "../components/DropdownTrigger"
import Menu from "../components/Menu"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"
import DropdownContent from "../components/DropdownContent"
import ButtonIcon from "../components/ButtonIcon"
import ThemeButton from "../components/ButtonTheme"
import {useAuth} from "../context/AuthContext"
import Chip from "../components/Chip"

const MENU_CONFIG = [
	{
		title: "Principal",
		items: [
			{name: "Inicio", href: "/", icon: <IconHome />},
			{name: "Calendario", href: "/calendario", icon: <IconCalendar />},
		],
	},
	{
		title: "Soporte",
		items: [
			{name: "Acerca de", href: "/acerca-de", icon: <IconInfoCircle />}, // TODO: Crear pagina de "Acerca de"
			{name: "Ayuda", href: "/ayuda", icon: <IconHelp />}, // TODO: Crear pagina de "Ayuda"
		],
	},
]

// 2. COMPONENTE DE USUARIO (Encapsulado)
const UserActions = () => {
	const {session, signOut} = useAuth()

	const user = session?.user.user_metadata

	if (session) {
		return (
			<Dropdown>
				<DropdownTrigger>
					{/* Ajuste visual: Cursor pointer para indicar que es clickeable */}
					<div className="cursor-pointer">
						<Avatar name={user?.username} color={import.meta.env.DEV ? "warning" : "primary"} />
					</div>
				</DropdownTrigger>
				<DropdownContent>
					<Menu>
						<MenuGroup title="Mi Cuenta">
							<MenuItem href="/perfil">Perfil</MenuItem>
							<MenuItem canHover={true} onClick={() => signOut()} iconLeft={<IconLogout />}>
								Cerrar Sesión
							</MenuItem>
						</MenuGroup>
					</Menu>
				</DropdownContent>
			</Dropdown>
		)
	}

	return (
		<div className="flex gap-2">
			<Button href="/login" variant="flat" color="primary" className="hidden sm:flex">
				Ingresar
			</Button>
			<Button href="/register" variant="solid" color="primary">
				Registrarse
			</Button>
		</div>
	)
}

export function NavHeader() {
	const {session, signOut} = useAuth()

	const {pathname: path} = useLocation()

	// Aplanamos los items principales para el menú de escritorio (solo queremos mostrar el grupo 0)
	const desktopLinks = MENU_CONFIG[0].items

	return (
		<header className="sticky top-0 z-50 w-full pt-4">
			<nav className="mx-auto flex w-full outline-2 outline-background-300 dark:outline-background-800 items-center justify-between rounded-3xl bg-background-100/30 p-3 shadow-lg backdrop-blur-md dark:bg-background-900/30">
				{/* SECCIÓN IZQUIERDA: LOGO */}
				<div className="flex items-center gap-3">
					<LogoPage />

					{import.meta.env.DEV && <Chip color="warning">dev</Chip>}
				</div>

				{/* SECCIÓN CENTRAL: NAVEGACIÓN ESCRITORIO (Oculto en móvil) */}
				{/* Usamos 'hidden lg:flex' para que aparezca en pantallas grandes */}
				<div className="hidden lg:flex items-center gap-1">
					{desktopLinks.map(({name, href, icon}) => {
						const isActive = href === path
						return (
							<Button
								key={href}
								variant={isActive ? "flat" : "outlined"} // UX: Resaltar activo
								color={isActive ? "primary" : "secondary"}
								href={href}
								iconLeft={icon}>
								{name}
							</Button>
						)
					})}
				</div>

				{/* SECCIÓN DERECHA: ACCIONES Y MENU MÓVIL */}
				<div className="flex items-center gap-3">
					{/* ThemeButton: Visible siempre en escritorio, opcional en móvil */}
					<div className="">
						<ThemeButton />
					</div>

					{/* Acciones de Usuario (Login/Avatar) */}
					<div className="hidden lg:block">
						<UserActions />
					</div>

					{/* MENÚ HAMBURGUESA (Visible solo en móvil/tablet) */}
					{/* Usamos 'lg:hidden' para ocultarlo en escritorio */}
					<div className="lg:hidden">
						<Dropdown>
							<DropdownTrigger>
								<ButtonIcon variant="outlined" color="secondary">
									<IconMenu2 size={20} />
								</ButtonIcon>
							</DropdownTrigger>
							<DropdownContent>
								<Menu>
									{/* Agregamos las acciones de usuario al final del menú móvil para fácil acceso */}
									{session ?
										<MenuGroup title="Perfil">
											<MenuItem href="/perfil" iconLeft={<IconUser />} isActive={path === "/perfil"}>
												Mi perfil
											</MenuItem>
											<MenuItem canHover onClick={() => signOut()} iconLeft={<IconLogout />}>
												Cerrar Sesión
											</MenuItem>
										</MenuGroup>
									:	<MenuGroup title="Perfil">
											<MenuItem href="/login" iconRight={<IconLogin2 />} isActive={path === "/login"}>
												Iniciar Sesión
											</MenuItem>
											<MenuItem href="/register" isActive={path === "/register"}>
												Registrarse
											</MenuItem>
										</MenuGroup>
									}
									{/* Renderizamos TODOS los grupos del menú */}
									{MENU_CONFIG.map((group) => (
										<MenuGroup key={group.title} title={group.title}>
											{group.items.map((item) => (
												<MenuItem key={item.href} href={item.href} iconLeft={item.icon} isActive={item.href === path}>
													{item.name}
												</MenuItem>
											))}
										</MenuGroup>
									))}
								</Menu>
							</DropdownContent>
						</Dropdown>
					</div>
				</div>
			</nav>
		</header>
	)
}
