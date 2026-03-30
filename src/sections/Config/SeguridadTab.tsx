import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContextData";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import supabase from "@/utils/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertCircle, IconCheck, IconTrash, IconKey } from "@tabler/icons-react";

export default function SeguridadTab() {
	const { session, userProfile } = useAuth();

	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState<{
		type: "success" | "danger";
		text: string;
	} | null>(null);

	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});

	// 3. Cambiar Contraseña - Refactorizado con hook
	const { updatePassword: updatePasswordHook, loading: loadingPassword } =
		useUpdatePassword();

	const updatePassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setMsg(null); // Limpiar mensajes globales si los hubiera

		const result = await updatePasswordHook(
			formData.password,
			formData.confirmPassword,
		);

		if (result.success) {
			setMsg({ type: "success", text: result.message });
			setFormData({ password: "", confirmPassword: "" });
		} else {
			setMsg({ type: "danger", text: result.message });
		}
	};

	// 4. Eliminar Cuenta
	const [deleteConfirmation, setDeleteConfirmation] = useState("");

	const handleDeleteAccount = async () => {
		// 1. Validación: Si no escribió bien el nombre O no hay ID de usuario, cancelamos.
		if (deleteConfirmation !== userProfile?.full_name || !session?.user.id)
			return;

		setLoading(true);
		setMsg(null);

		try {
			const { error } = await supabase.rpc("delete_user");

			if (error) throw error;

			setMsg({
				type: "success",
				text: "Cuenta eliminada. Te extrañaremos...",
			});

			setTimeout(async () => {
				await supabase.auth.signOut();
				window.location.href = "/";
			}, 1500);
		} catch (error: unknown) {
			console.error("Error eliminando cuenta:", error);
			const errorMessage = error instanceof Error ? error.message : "No se pudo eliminar la cuenta.";
			setMsg({
				type: "danger",
				text: errorMessage,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<TabsContent value="seguridad" className="space-y-6">
			{msg && (
				<Alert
					variant={msg.type === "danger" ? "destructive" : "default"}
				>
					{msg.type === "success" ? (
						<IconCheck className="text-emerald-500" />
					) : (
						<IconAlertCircle />
					)}
					<AlertTitle>
						{msg.type === "success" ? "¡Éxito!" : "Error"}
					</AlertTitle>
					<AlertDescription>{msg.text}</AlertDescription>
				</Alert>
			)}

			<Card>
				<CardHeader>
					<CardTitle>Cambiar Contraseña</CardTitle>
					<CardDescription>
						Asegúrate de usar una contraseña segura.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={updatePassword} className="space-y-4">
						<FieldGroup className="grid gap-4 sm:grid-cols-2">
							<Field>
								<FieldLabel htmlFor="password">
									Nueva Contraseña
								</FieldLabel>
								<Input
									id="password"
									type="password"
									placeholder="••••••••"
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="confirmPassword">
									Confirmar Contraseña
								</FieldLabel>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="••••••••"
									value={formData.confirmPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword: e.target.value,
										})
									}
								/>
							</Field>
						</FieldGroup>
						<Button type="submit" disabled={loadingPassword}>
							<IconKey size={18} className="mr-2" />
							Actualizar Contraseña
						</Button>
					</form>
				</CardContent>
			</Card>

			<Card className="border-destructive/50 border bg-destructive/10">
				<CardHeader>
					<CardTitle className="text-destructive">
						Zona de Peligro
					</CardTitle>
					<CardDescription className="text-destructive/80">
						Una vez que elimines tu cuenta, no hay vuelta atrás. Por
						favor, asegúrate.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<Field>
							<FieldLabel htmlFor="deleteConfirm">
								Escribe{" "}
								<span className="font-bold">
									{userProfile?.full_name}
								</span>{" "}
								para confirmar
							</FieldLabel>
							<Input
								id="deleteConfirm"
								value={deleteConfirmation}
								onChange={(e) =>
									setDeleteConfirmation(e.target.value)
								}
								placeholder="Escribe tu nombre completo"
							/>
						</Field>
						<Button
							variant="destructive"
							onClick={handleDeleteAccount}
							disabled={
								loading ||
								deleteConfirmation !== userProfile?.full_name
							}
						>
							<IconTrash size={18} className="mr-2" />
							Eliminar Cuenta
						</Button>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
