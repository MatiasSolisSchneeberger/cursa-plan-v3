/* --- Imports --- */
// react
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// supabase
import supabase from "@/utils/supabase";

// Iconos
import { IconCheck, IconEye, IconEyeOff } from "@tabler/icons-react";

// context
import { useAuth } from "@/context/AuthContextData";

// components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
export default function Register() {
	/* --- Estados --- */
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string | null>("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [full_name, setFullName] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [successMsg, setSuccessMsg] = useState<string | null>("");
	const [username, setUsername] = useState<string>("");

	/* --- Contexto --- */
	const { session } = useAuth();

	/* --- Navegación --- */
	const navigate = useNavigate();

	/* --- Funciones --- */
	/**
	 * Verifica la fortaleza de la contraseña
	 * @param pass Contraseña a verificar
	 * @returns Mensaje de error si la contraseña no es fuerte, null si lo es
	 */
	const checkPasswordStrength = (pass: string) => {
		const rules = [
			{
				regex: /.{8,}/,
				message: "La contraseña debe tener al menos 8 caracteres.",
			},
			{
				regex: /[A-Z]/,
				message:
					"La contraseña debe tener al menos una letra mayúscula.",
			},
			{
				regex: /[0-9]/,
				message: "La contraseña debe tener al menos un número.",
			},
			{
				regex: /[!@#$%^&*(),.?":{}|<>_]/,
				message:
					"La contraseña debe tener al menos un carácter especial (!@#$...).",
			},
		];

		for (const rule of rules) {
			if (!rule.regex.test(pass)) {
				return rule.message;
			}
		}
		return null;
	};

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
		setSuccessMsg(null);
		setFieldErrors({});

		let hasError = false;
		const newFieldErrors: Record<string, string> = {};

		if (!full_name) {
			newFieldErrors.name = "Requerido";
			hasError = true;
		}
		if (!username) {
			newFieldErrors.username = "Requerido";
			hasError = true;
		}
		if (!email) {
			newFieldErrors.email = "Requerido";
			hasError = true;
		}
		if (!password) {
			newFieldErrors.password = "Requerido";
			hasError = true;
		}
		if (!confirmPassword) {
			newFieldErrors.confirmPassword = "Requerido";
			hasError = true;
		}

		if (hasError) {
			setFieldErrors(newFieldErrors);
			setErrorMsg("Por favor, completa todos los campos");
			return;
		}

		const passwordError = checkPasswordStrength(password);
		if (passwordError) {
			setFieldErrors({ password: passwordError });
			setErrorMsg(passwordError);
			return;
		}

		if (password !== confirmPassword) {
			setFieldErrors({
				password: "Las contraseñas no coinciden",
				confirmPassword: "Las contraseñas no coinciden",
			});
			setErrorMsg("Las contraseñas no coinciden");
			return;
		}

		setLoading(true);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}`,
				data: {
					username: username,
					full_name: full_name,
				},
			},
		});

		setLoading(false);

		if (error) {
			console.error(error);
			setErrorMsg(error.message);
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
			setSuccessMsg(
				"Verifica tu correo electrónico para confirmar tu cuenta",
			);
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
							<FieldLegend>Crear cuenta</FieldLegend>
							<FieldDescription>
								Ingresa tus datos personales y una contraseña
								para crear tu cuenta (los campos marcados con{" "}
								<span className="text-destructive">*</span> son
								requeridos)
							</FieldDescription>
						</div>
						<FieldSet>
							<FieldGroup>
								<Field data-invalid={!!fieldErrors.name}>
									<FieldLabel htmlFor="name">
										Nombre y apellido completo{" "}
										<span className="text-destructive">
											*
										</span>
									</FieldLabel>
									<Input
										id="name"
										autoComplete="name"
										placeholder="Juan Perez"
										value={full_name}
										onChange={(e) =>
											setFullName(e.target.value)
										}
										aria-invalid={!!fieldErrors.name}
										required={true}
									/>
									{fieldErrors.name && (
										<FieldError>
											{fieldErrors.name}
										</FieldError>
									)}
								</Field>
								<Field data-invalid={!!fieldErrors.username}>
									<FieldLabel htmlFor="username">
										Nombre de usuario{" "}
										<span className="text-destructive">
											*
										</span>
									</FieldLabel>
									<Input
										id="username"
										autoComplete="username"
										placeholder="JuanPerez3000"
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
										aria-invalid={!!fieldErrors.username}
										required={true}
									/>
									{fieldErrors.username && (
										<FieldError>
											{fieldErrors.username}
										</FieldError>
									)}
								</Field>
							</FieldGroup>
							<FieldGroup>
								<Field data-invalid={!!fieldErrors.email}>
									<FieldLabel htmlFor="email">
										Correo electrónico{" "}
										<span className="text-destructive">
											*
										</span>
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
										Contraseña{" "}
										<span className="text-destructive">
											*
										</span>
									</FieldLabel>
									<div className="flex flex-row gap-2">
										<Input
											id="password"
											type={
												showPassword
													? "text"
													: "password"
											}
											autoComplete="new-password"
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
								<Field
									data-invalid={!!fieldErrors.confirmPassword}
								>
									<FieldLabel htmlFor="confirmPassword">
										Confirmar contraseña{" "}
										<span className="text-destructive">
											*
										</span>
									</FieldLabel>
									<div className="flex flex-row gap-2">
										<Input
											id="confirmPassword"
											type={
												showConfirmPassword
													? "text"
													: "password"
											}
											autoComplete="new-password"
											placeholder="************"
											value={confirmPassword}
											onChange={(e) =>
												setConfirmPassword(
													e.target.value,
												)
											}
											aria-invalid={
												!!fieldErrors.confirmPassword
											}
											required={true}
										/>
										<Button
											type="button"
											variant={
												fieldErrors.confirmPassword
													? "destructive"
													: "outline"
											}
											size="icon"
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword,
												)
											}
										>
											{showConfirmPassword ? (
												<IconEyeOff size={18} />
											) : (
												<IconEye size={18} />
											)}
										</Button>
									</div>
									{fieldErrors.confirmPassword && (
										<FieldError>
											{fieldErrors.confirmPassword}
										</FieldError>
									)}
								</Field>
							</FieldGroup>
							{errorMsg && <FieldError>{errorMsg}</FieldError>}
							{successMsg && (
								<Alert>
									<IconCheck className="size-5 stroke-green-500" />
									<AlertTitle>¡Éxito!</AlertTitle>
									<AlertDescription>
										{successMsg}
									</AlertDescription>
								</Alert>
							)}
						</FieldSet>
						<Button
							type="submit"
							disabled={loading}
							className="mt-2 w-full"
						>
							{loading ? "Registrando..." : "Registrarse"}
						</Button>
					</form>
				</CardContent>

				<CardFooter>
					<div className="flex w-full flex-col gap-2 md:flex-row">
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={() => navigate("/login")}
						>
							¿Ya tienes cuenta?
						</Button>
					</div>
				</CardFooter>
			</Card>
		</section>
	);
}
