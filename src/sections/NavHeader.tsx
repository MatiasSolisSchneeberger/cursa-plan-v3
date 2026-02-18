import { useLocation } from "react-router-dom";
import {
	IconMenu2,
	IconUser,
	IconLogout,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";

import { useAuth } from "../context/AuthContextData";
import Button from "../components/Button";
import Menu from "../components/Menu";
import MenuItem from "../components/MenuItem";
import MenuGroup from "../components/MenuGroup";
import Avatar from "../components/Avatar";
import ButtonTheme from "../components/ButtonTheme";

// Importamos tus componentes de Dropdown
import Dropdown from "../components/Dropdown";
import DropdownTrigger from "../components/DropdownTrigger";
import DropdownContent from "../components/DropdownContent";
import LogoPage from "../components/LogoPage";
import { INTERNAL_LINKS } from "../utils/links";

type User = {
	id: string;
	username: string;
	full_name: string;
	role: string;
	icon?: string;
};

function AvatarMenu({
	user,
	avatarColor,
	signOut,
	pathname,
}: {
	user: User;
	avatarColor:
		| "primary"
		| "secondary"
		| "tertiary"
		| "success"
		| "danger"
		| "warning"
		| "info"
		| "background";
	signOut: () => void;
	pathname: string;
}) {
	return (
		<Dropdown key={`user-${pathname}`} placement="bottom-end">
			<DropdownTrigger>
				<Avatar
					color={avatarColor}
					name={user.full_name}
					icon={user.icon}
				/>
			</DropdownTrigger>
			<DropdownContent>
				<Menu>
					<MenuGroup>
						<MenuItem
							avatar={
								<Avatar
									color={avatarColor}
									name={user.full_name}
									icon={user.icon}
								/>
							}
							textHelp={`@${user.username}`}
							className="pb-2 select-none"
						>
							{user.full_name}
						</MenuItem>
					</MenuGroup>
					<MenuGroup title="Mi Cuenta">
						<MenuItem
							href="/perfil"
							iconLeft={<IconUser size={20} />}
						>
							Mi Perfil
						</MenuItem>
						<MenuItem
							href="/config"
							iconLeft={<IconSettings size={20} />}
						>
							Configuración
						</MenuItem>
					</MenuGroup>
					{user.role === "admin" && (
						<MenuGroup title="Administrador">
							<MenuItem
								href="/admin"
								iconLeft={<IconUsers size={20} />}
							>
								Admin
							</MenuItem>
						</MenuGroup>
					)}
					<MenuGroup>
						<MenuItem
							onClick={signOut}
							iconLeft={<IconLogout size={20} />}
							className="text-danger-600 hover:bg-danger-50 dark:text-danger-400 dark:hover:bg-danger-900/20"
						>
							Cerrar Sesión
						</MenuItem>
					</MenuGroup>
				</Menu>
			</DropdownContent>
		</Dropdown>
	);
}

export default function NavHeader() {
	const { pathname } = useLocation();
	const { session, signOut, userProfile } = useAuth();

	// data for user is now in userProfile from context
	const user: User | null = userProfile
		? {
				id: userProfile.id,
				username: userProfile.username,
				full_name: userProfile.full_name,
				role: userProfile.role || "user",
				icon: userProfile.icon,
			}
		: null;

	// Links principales (siempre visibles en desktop)
	const mainLinks = INTERNAL_LINKS.filter((l) => l.category === "main");

	// Links secundarios (agrupados en "Más")
	const secondaryLinks = INTERNAL_LINKS.filter(
		(l) => l.category === "secondary",
	);
	const legalLinks = INTERNAL_LINKS.filter((l) => l.category === "legal");

	const avatarColor = user?.role === "admin" ? "warning" : "primary";

	return (
		<header className="sticky top-0 z-40 mt-2 w-full py-2">
			<section className="bg-background-50/50 dark:bg-background-900/50 outline-background-300 dark:outline-background-700 flex flex-row gap-4 rounded-3xl p-3 shadow-lg outline-2 backdrop-blur-md transition-colors duration-300">
				{/* IZQUIERDA: Logo + Navegación */}
				<article className="flex flex-1 gap-6">
					<LogoPage />

					{/* Menú Desktop */}
					<nav className="hidden items-center gap-2 md:flex">
						{mainLinks.map((link) => (
							<Button
								key={link.href}
								variant="outlined"
								color={
									pathname === link.href
										? "primary"
										: "secondary"
								}
								href={link.href}
								iconLeft={link.icon}
							>
								{link.label}
							</Button>
						))}

						{/* --- DROPDOWN "MÁS" (DESKTOP) --- */}
						{/* Usamos key={pathname} para que se cierre al navegar */}
						<Dropdown key={`more-desktop-${pathname}`}>
							<DropdownTrigger>
								<Button
									variant="text"
									color="secondary"
									iconRight={<IconMenu2 size={20} />}
								>
									Más
								</Button>
							</DropdownTrigger>
							<DropdownContent>
								<Menu>
									<MenuGroup title="Información">
										{secondaryLinks.map((link) => (
											<MenuItem
												key={link.href}
												href={link.href}
												iconLeft={link.icon}
												isActive={
													pathname === link.href
												}
											>
												{link.label}
											</MenuItem>
										))}
									</MenuGroup>
									<MenuGroup title="Legal">
										{legalLinks.map((link) => (
											<MenuItem
												key={link.href}
												href={link.href}
												iconLeft={link.icon}
												isActive={
													pathname === link.href
												}
											>
												{link.label}
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

					<div className="bg-background-300 dark:bg-background-700 mx-1 h-4/5 w-0.5" />

					{user ? (
						/* --- DROPDOWN USUARIO --- */
						<AvatarMenu
							user={user}
							avatarColor={avatarColor}
							signOut={signOut}
							pathname={pathname}
						/>
					) : (
						<div className="hidden gap-2 md:flex">
							<Button href="/login" variant="flat">
								Ingresar
							</Button>
							<Button href="/register" variant="solid">
								Registrarse
							</Button>
						</div>
					)}

					{/* --- DROPDOWN MÓVIL (HAMBURGUESA) --- */}
					<div className="ml-1 md:hidden">
						<Dropdown
							key={`mobile-${pathname}`}
							placement="bottom-end"
						>
							<DropdownTrigger>
								<Button
									isIconOnly
									variant="text"
									color="secondary"
								>
									<IconMenu2 />
								</Button>
							</DropdownTrigger>
							<DropdownContent>
								<Menu className="w-64">
									{/* Ancho fijo para menú móvil */}
									<MenuGroup title="Navegación">
										{mainLinks.map((link) => (
											<MenuItem
												key={link.href}
												href={link.href}
												iconLeft={link.icon}
												isActive={
													pathname === link.href
												}
											>
												{link.label}
											</MenuItem>
										))}
									</MenuGroup>
									<MenuGroup title="Información">
										{secondaryLinks.map((link) => (
											<MenuItem
												key={link.href}
												href={link.href}
												iconLeft={link.icon}
												isActive={
													pathname === link.href
												}
											>
												{link.label}
											</MenuItem>
										))}
									</MenuGroup>
									{!session && (
										<MenuGroup title="Acceso">
											<MenuItem
												href="/login"
												iconLeft={
													<IconUser size={20} />
												}
											>
												Ingresar
											</MenuItem>
											<MenuItem
												href="/register"
												iconLeft={
													<IconUser size={20} />
												}
											>
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
	);
}
