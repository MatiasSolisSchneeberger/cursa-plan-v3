/* --- Imports --- */
// react
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// supabase
import supabase from "@/utils/supabase";

// Iconos
import { IconEye, IconEyeOff, IconLoader2 } from "@tabler/icons-react";

// context
import { useAuth } from "@/context/AuthContextData";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/* --- Componente --- */
export default function Login() {
	/* --- Estados --- */
	const [email, setEmail] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string | null>("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);

	/* --- Contexto --- */
	const { session } = useAuth();

	/* --- Navegación --- */
	const navigate = useNavigate();

	/* --- Efectos --- */
	useEffect(() => {
		if (session) {
			navigate("/", {
				replace: true,
				state: { showAlreadyLoggedInAlert: true },
			});
		}
	}, [session, navigate]);

	/**
	 * Maneja el envío del formulario
	 * @param e Evento del formulario
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMsg(null);
		setFieldErrors({});

		let hasError = false;
		const newFieldErrors: Record<string, string> = {};

		if (!email) {
			newFieldErrors.email = "Requerido";
			hasError = true;
		}
		if (!password) {
			newFieldErrors.password = "Requerido";
			hasError = true;
		}

		if (hasError) {
			setFieldErrors(newFieldErrors);
			setErrorMsg("Por favor, completa todos los campos");
			return;
		}

		setLoading(true);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		setLoading(false);

		if (error) {
			console.error(error);
			setErrorMsg("Credenciales incorrectas. Intenta de nuevo.");
			if (
				error.message.toLowerCase().includes("email") ||
				error.message.toLowerCase().includes("correo")
			) {
				setFieldErrors({ email: error.message });
			} else if (
				error.message.toLowerCase().includes("password") ||
				error.message.toLowerCase().includes("contraseña")
			) {
				setFieldErrors({ password: error.message });
			}
		} else {
			console.log("Login exitoso:", data);
			navigate("/", {
				replace: true,
				state: { showSuccessAlert: true },
			});
		}
	};

	return (
		<section className="flex flex-col items-center justify-center">
			<Card className="w-full max-w-2xl">
				<CardContent>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4"
					>
						<div className="flex flex-col">
							<FieldLegend>Iniciar sesión</FieldLegend>
							<FieldDescription>
								Ingresá a tu cuenta con tu correo electrónico y
								contraseña
							</FieldDescription>
						</div>
						<FieldSet>
							<FieldGroup>
								<Field data-invalid={!!fieldErrors.email}>
									<FieldLabel htmlFor="email">
										Correo electrónico
									</FieldLabel>
									<Input
										id="email"
										type="email"
										autoComplete="email"
										placeholder="tu@email.com"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										aria-invalid={!!fieldErrors.email}
										required={true}
									/>
									{fieldErrors.email && (
										<FieldError>
											{fieldErrors.email}
										</FieldError>
									)}
								</Field>
							</FieldGroup>
							<FieldGroup>
								<Field data-invalid={!!fieldErrors.password}>
									<FieldLabel htmlFor="password">
										Contraseña
									</FieldLabel>
									<div className="flex flex-row gap-2">
										<Input
											id="password"
											type={
												showPassword
													? "text"
													: "password"
											}
											autoComplete="current-password"
											placeholder="************"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											aria-invalid={
												!!fieldErrors.password
											}
											required={true}
										/>
										<Button
											type="button"
											variant={
												fieldErrors.password
													? "destructive"
													: "outline"
											}
											size="icon"
											onClick={() =>
												setShowPassword(!showPassword)
											}
										>
											{showPassword ? (
												<IconEyeOff size={18} />
											) : (
												<IconEye size={18} />
											)}
										</Button>
									</div>
									{fieldErrors.password && (
										<FieldError>
											{fieldErrors.password}
										</FieldError>
									)}
								</Field>
							</FieldGroup>
							{errorMsg && <FieldError>{errorMsg}</FieldError>}
						</FieldSet>
						<Button
							type="submit"
							disabled={loading}
							className="mt-2 w-full gap-2"
						>
							{loading && (
								<IconLoader2
									className="animate-spin"
									size={20}
								/>
							)}
							{loading ? "Iniciando sesión..." : "Iniciar sesión"}
						</Button>
					</form>
				</CardContent>

				<CardFooter>
					<div className="flex w-full flex-col gap-2 md:flex-row">
						{/* TODO: Implementar flujo de recuperación de contraseña */}
						<Button
							type="button"
							variant="outline"
							className="flex-1"
							asChild
						>
							<Link to="/contraseña-olvidada">
								¿Te olvidaste la contraseña?
							</Link>
						</Button>
						<Button
							type="button"
							variant="outline"
							className="flex-1"
							onClick={() => navigate("/register")}
						>
							¿No tienes cuenta?
						</Button>
					</div>
				</CardFooter>
			</Card>
		</section>
	);
}
