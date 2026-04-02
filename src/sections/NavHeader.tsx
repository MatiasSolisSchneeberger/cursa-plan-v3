/* --- Imports --- */
// React
import { Link } from "react-router-dom";

// Componentes
import { Avatar, AvatarLetter, AvatarIcon } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import ButtonTheme from "@/components/ButtonTheme";
import IconAvatar from "@/components/IconAvatar";
import IconCarrera from "@/components/IconCarrera";
import LogoPage from "@/components/LogoPage";

// Iconos
import {
	IconBook,
	IconBug,
	IconCalendar,
	IconHome,
	IconLoader2,
	IconLogin,
	IconLogout,
	IconMenu2,
	IconSettings,
	IconUser,
	IconUserPlus,
	IconUserSquare,
} from "@tabler/icons-react";

// Context
import { useAuth } from "@/context/AuthContextData";

// hooks
import { useCarreras } from "@/hooks/useCarreras";

// types
import type { Carrera } from "@/types/materiaTypes";

type User = {
	id: string;
	username: string;
	full_name: string;
	role: string;
	icon?: string;
};

import { INTERNAL_LINKS } from "@/utils/links";
function AvatarUser({ user, signOut }: { user: User; signOut: () => void }) {
	const { role, username, icon } = user;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar
					size="lg"
					className={
						role === "admin" ? "border-primary border-2" : ""
					}
				>
					{icon ? (
						<AvatarIcon>
							<IconAvatar icon={icon} className="size-5" />
						</AvatarIcon>
					) : (
						<AvatarLetter>
							{username.charAt(0).toUpperCase()}
						</AvatarLetter>
					)}
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
					<DropdownMenuItem asChild>
						<Link
							to="/perfil"
							className="flex flex-row items-center gap-2"
						>
							<IconUser />
							Perfil
						</Link>
					</DropdownMenuItem>
					{role === "admin" && (
						<DropdownMenuItem asChild>
							<Link
								to="/admin"
								className="flex flex-row items-center gap-2"
							>
								<IconUserSquare />
								Administrador
							</Link>
						</DropdownMenuItem>
					)}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link
							to="/config"
							className="flex flex-row items-center gap-2"
						>
							<IconSettings />
							Configuración
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem variant="destructive" asChild>
						<span
							onClick={signOut}
							className="flex flex-row items-center gap-2"
						>
							<IconLogout />
							Cerrar Sesión
						</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function Nav({ carreras, loading }: { carreras: Carrera[]; loading: boolean }) {
	return (
		<NavigationMenu className="hidden lg:flex" delayDuration={1000}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={buttonVariants({
							className: "cursor-pointer",
							variant: "outline",
						})}
					>
						<Link
							to="/"
							className="flex flex-row items-center gap-2"
						>
							<IconHome className="size-5" />
							Inicio
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={buttonVariants({
							className: "cursor-pointer",
							variant: "outline",
						})}
					>
						<Link
							to="/carreras"
							className="flex flex-row items-center gap-2"
						>
							<IconBook className="size-5" />
							Carreras
						</Link>
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{loading ? (
								<li>
									<NavigationMenuLink asChild>
										<Link to="/carreras">
											<IconBook />
											Cargando...
										</Link>
									</NavigationMenuLink>
								</li>
							) : (
								carreras.map(({ icon, id, nombre, slug }) => (
									<NavigationMenuLink asChild key={id}>
										<Link
											to={`/carreras/${slug}`}
											className="flex flex-row items-center gap-2"
										>
											<IconCarrera
												icon={icon}
												className="min-h-5 min-w-5"
											/>
											{nombre}
										</Link>
									</NavigationMenuLink>
								))
							)}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={buttonVariants({
							className: "cursor-pointer",
							variant: "outline",
						})}
					>
						<Link
							to="/calendario"
							className="flex flex-row items-center gap-2"
						>
							<IconCalendar className="size-5" />
							Calendario
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={buttonVariants({
							className: "cursor-pointer",
							variant: "outline",
						})}
					>
						<IconMenu2 className="size-5" />
						Mas
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="flex w-[400px] gap-2 md:w-[500px] lg:w-[600px]">
							<ul className="w-full">
								{INTERNAL_LINKS.filter(
									({ category }) => category === "secondary",
								).map(({ label, href, icon }) => (
									<NavigationMenuLink asChild>
										<Link
											to={href}
											className="flex flex-row items-center gap-2"
										>
											{icon}
											{label}
										</Link>
									</NavigationMenuLink>
								))}
							</ul>
							<Separator orientation="vertical" />
							<div className="w-full space-y-2">
								<ul>
									{INTERNAL_LINKS.filter(
										({ category }) => category === "legal",
									).map(({ label, href, icon }) => (
										<NavigationMenuLink asChild>
											<Link
												to={href}
												className="flex flex-row items-center gap-2"
											>
												{icon}
												{label}
											</Link>
										</NavigationMenuLink>
									))}
								</ul>
								<Separator />
								<NavigationMenuLink asChild>
									<Link
										to="/contacto?etiqueta=error"
										className="flex flex-row items-center gap-2"
									>
										<IconBug />
										Reportar error
									</Link>
								</NavigationMenuLink>
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

export default function NavHeader() {
	const { signOut, userProfile, loading: loadingAuth } = useAuth();

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

	// Carreras
	const { carreras, loading } = useCarreras();

	return (
		<header className="sticky top-0 z-40 mt-2 w-full py-2">
			<section className="bg-card border-border flex flex-row gap-4 rounded-3xl border p-3 shadow-md backdrop-blur-md transition-colors duration-300">
				{/* IZQUIERDA: Logo + Navegación */}
				<article className="flex flex-1 gap-6">
					<LogoPage />

					{/* Menú Desktop */}
					<Nav carreras={carreras} loading={loading} />
				</article>

				{/* DERECHA: Acciones */}
				<article className="*:border-border flex items-center gap-2 *:border-l-2 *:pl-2 *:first:border-0 *:first:pl-0">
					<div>
						<ButtonTheme />
					</div>
					{loadingAuth ? (
						<div>
							<IconLoader2 className="animate-spin" />
						</div>
					) : user ? (
						<div>
							<AvatarUser signOut={signOut} user={user} />
						</div>
					) : (
						<>
							<div className="hidden flex-row gap-2 lg:flex">
								<Button asChild variant="secondary">
									<Link to="/login">
										<IconLogin />
										Iniciar Sesión
									</Link>
								</Button>
								<Button asChild variant="default">
									<Link to="/register">
										<IconUserPlus />
										Registrarte
									</Link>
								</Button>
							</div>
							<div className="flex flex-row gap-2 lg:hidden">
								<Button
									size={"icon-lg"}
									asChild
									variant="secondary"
								>
									<Link to="/login">
										<IconLogin />
									</Link>
								</Button>
								<Button
									size={"icon-lg"}
									asChild
									variant="default"
								>
									<Link to="/register">
										<IconUserPlus />
									</Link>
								</Button>
							</div>
						</>
					)}

					{/* --- DROPDOWN MÓVIL (HAMBURGUESA) --- */}
					<div className="lg:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" size="icon-lg">
									<IconMenu2 />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-40" align="end">
								<DropdownMenuGroup>
									<DropdownMenuItem asChild>
										<Link
											to="/"
											className="flex flex-row items-center gap-2"
										>
											<IconHome />
											Inicio
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											to="/carreras"
											className="flex flex-row items-center gap-2"
										>
											<IconBook />
											Carreras
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											to="/calendario"
											className="flex flex-row items-center gap-2"
										>
											<IconCalendar />
											Calendario
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								{!user && (
									<>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem asChild>
												<Link
													to="/login"
													className="flex flex-row items-center gap-2"
												>
													<IconLogin />
													Iniciar Sesión
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													to="/register"
													className="flex flex-row items-center gap-2"
												>
													<IconUserPlus />
													Registrarte
												</Link>
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</>
								)}
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuLabel>
										Información
									</DropdownMenuLabel>
									{INTERNAL_LINKS.filter((link) =>
										["secondary", "legal"].includes(
											link.category,
										),
									).map(({ label, href, icon }) => {
										return (
											<DropdownMenuItem asChild>
												<Link
													to={href}
													className="flex flex-row items-center gap-2"
												>
													{icon}
													{label}
												</Link>
											</DropdownMenuItem>
										);
									})}
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem asChild>
										<Link
											to="/contacto?etiqueta=error"
											className="flex flex-row items-center gap-2"
										>
											<IconBug />
											Reportar error
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</article>
			</section>
		</header>
	);
}
