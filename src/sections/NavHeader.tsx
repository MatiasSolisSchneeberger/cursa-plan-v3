import LogoPage from "../components/LogoPage"
import Button from "../components/Button"
import Avatar from "../components/Avatar"
import {IconHome} from "@tabler/icons-react"
import {useLocation} from "react-router-dom"

const isLogged = false

const User = () => {
	return (
		<span className="flex flex-row gap-2 items-center">
			{!isLogged ? (
				<>
					<Button variant="outlined" color="secondary">
						Iniciar Sesión
					</Button>
					<Button variant="solid" color="secondary">
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
	const {pathname: path} = useLocation()

	return (
		<header className="flex w-full flex-wrap items-center justify-between rounded-3xl bg-background-100 p-2.5 shadow-xl outline-1 outline-background-400 dark:bg-background-900 ">
			{/* Logo Pagina */}
			<LogoPage />

			{/* Botones de Navegacion */}
			<nav className="hidden md:flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative overflow-hidden md:overflow-visible w-min h-min">
				{path !== "/" && (
					<Button variant="solid" color="primary" iconLeft={<IconHome />} href="/">
						Inicio
					</Button>
				)}
				{path !== "/mesas-examenes" && (
					<Button variant="outlined" color="primary" href="/mesas-examenes">
						Mesa de examenes
					</Button>
				)}
				{path !== "/calendario-academico" && (
					<Button variant="outlined" color="primary" href="/calendario-academico">
						Calendario academico
					</Button>
				)}
			</nav>
			{User()}
		</header>
	)
}
