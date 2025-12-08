import LogoPage from "../components/LogoPage"
import Button from "../components/Button"
import Avatar from "../components/Avatar"
import {IconCalendar, IconHelp, IconHome, IconInfoCircle, IconMenu, IconMenu2, IconUser} from "@tabler/icons-react"
import {useLocation} from "react-router-dom"
import Dropdown from "../components/Dropdown"
import DropdownTrigger from "../components/DropdownTrigger"
import Menu from "../components/Menu"
import MenuGroup from "../components/MenuGroup"
import MenuItem from "../components/MenuItem"
import DropdownContent from "../components/DropdownContent"
import ButtonIcon from "../components/ButtonIcon"

const isLogged = false

const User = () => {
	return (
		<span className="flex flex-row gap-2 items-center">
			{!isLogged ? (
				<>
					<Button variant="flat" color="primary">
						Iniciar Sesión
					</Button>
					<Button variant="solid" color="primary">
						Registrarse
					</Button>
				</>
			) : (
				<>
					<Avatar name="Matias" notification color="danger" />
					<span>Matias</span>
				</>
			)}
		</span>
	)
}

export function NavHeader() {
	const menuItems = [
		{
			title: "Paginas",
			items: [
				{
					name: "Inicio",
					href: "/",
					icon: <IconHome />,
				},
				{
					name: "Mesa de examenes",
					href: "/mesas-examenes",
					icon: <IconMenu />,
				},
				{
					name: "Calendario academico",
					href: "/calendario-academico",
					icon: <IconCalendar />,
				},
			],
		},
		{
			title: "Usuario",
			items: [
				{
					name: "Perfil",
					href: "/perfil",
					icon: <IconUser />,
				},
			],
		},
		{
			title: "Mas",
			items: [
				{
					name: "Acerca de",
					href: "/acerca-de",
					icon: <IconInfoCircle />,
				},
				{
					name: "Ayuda",
					href: "/ayuda",
					icon: <IconHelp />,
				},
			],
		},
	]
	const {pathname: path} = useLocation()

	return (
		<header className="flex w-full flex-wrap items-center justify-between rounded-3xl bg-background-100 p-2.5 shadow-xl outline-1 outline-background-400 dark:bg-background-900 ">
			{/* Logo Pagina */}
			<LogoPage />

			{/* Botones de Navegacion */}
			<nav className="hidden lg:flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative overflow-hidden lg:overflow-visible w-min h-min">
				<span className="flex flex-row gap-2.5 pr-2.5 first:border-r-2 first:border-background-300 dark:first:border-background-700">
					{menuItems[0].items
						.filter(({href}) => href !== path)
						.map(({name, href, icon}) => (
							<Button variant="outlined" color="secondary" href={href} iconLeft={icon}>
								{name}
							</Button>
						))}
				</span>
				{User()}
			</nav>
			<nav className="inline-block lg:hidden">
				<Dropdown>
					<DropdownTrigger>
						<ButtonIcon variant="outlined" color="primary">
							<IconMenu2 />
						</ButtonIcon>
					</DropdownTrigger>
					<DropdownContent>
						<Menu>
							{menuItems.map(({title, items}) => (
								<MenuGroup key={title} title={title}>
									{items
										.filter(({href}) => href !== path)
										.map(({name, href, icon}) => (
											<MenuItem key={name} href={href} iconLeft={icon}>
												{name}
											</MenuItem>
										))}
								</MenuGroup>
							))}
						</Menu>
					</DropdownContent>
				</Dropdown>
			</nav>
		</header>
	)
}
