import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconLoader2, IconEye, IconEyeOff, IconAlertCircle } from "@tabler/icons-react";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";

export default function UpdatePassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	// --- Hook ---
	const { updatePassword, loading, error, setError } = useUpdatePassword();

	useEffect(() => {
		const hash = window.location.hash;
		if (hash && hash.includes("error=")) {
			const params = new URLSearchParams(hash.substring(1));
			const errDesc = params.get("error_description")?.replace(/\+/g, " ");
			const code = params.get("error_code");

			if (code === "otp_expired" || errDesc?.toLowerCase().includes("expired")) {
				setError("El enlace de recuperación ha expirado o es inválido. Por favor, solicita uno nuevo en 'Recuperar contraseña'.");
			} else if (errDesc) {
				setError(decodeURIComponent(errDesc));
			}

			// Limpiar la URL
			window.history.replaceState(null, "", window.location.pathname);
		}
	}, [setError]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// El hook ya valida igualdad y fortaleza
		const result = await updatePassword(password, confirmPassword);

		if (result.success) {
			navigate("/", { replace: true });
		}
	};

	return (
		<section className="flex flex-col items-center justify-center">
			<Card className="w-full max-w-2xl">
				<CardContent>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div className="flex flex-col">
							<FieldLegend>Nueva contraseña</FieldLegend>
							<FieldDescription>
								Ingresá tu nueva contraseña y confírmala para actualizar tu acceso.
							</FieldDescription>
						</div>
						
						<FieldSet>
							{error && (
								<Alert variant="destructive">
									<IconAlertCircle className="size-5" />
									<AlertTitle>Error al actualizar</AlertTitle>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}
							<FieldGroup>
								<Field data-invalid={!!error}>
									<FieldLabel htmlFor="password">
										Nueva contraseña
									</FieldLabel>
									<div className="flex flex-row gap-2">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="********"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											aria-invalid={!!error}
										/>
										<Button
											type="button"
											variant={error ? "destructive" : "outline"}
											size="icon"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
										</Button>
									</div>
								</Field>
								<Field data-invalid={!!error}>
									<FieldLabel htmlFor="confirmPassword">
										Confirmar contraseña
									</FieldLabel>
									<div className="flex flex-row gap-2">
										<Input
											id="confirmPassword"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="********"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
											aria-invalid={!!error}
										/>
										<Button
											type="button"
											variant={error ? "destructive" : "outline"}
											size="icon"
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										>
											{showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
										</Button>
									</div>
								</Field>
							</FieldGroup>
						</FieldSet>

						<Button
							type="submit"
							className="mt-2 w-full gap-2"
							disabled={loading}
						>
							{loading && <IconLoader2 className="animate-spin" size={20} />}
							{loading ? "Actualizando..." : "Cambiar contraseña"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
