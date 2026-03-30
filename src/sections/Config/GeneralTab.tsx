import { useEffect, useState } from "react";
import IconAvatar from "@/components/IconAvatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContextData";
import supabase from "@/utils/supabase";
import {
	IconDeviceFloppy,
	IconLoader2,
	IconCheck,
	IconAlertCircle,
} from "@tabler/icons-react";

const AVATAR_ICONS = [
	{ value: "mood-nerd", label: "Nerd" },
	{ value: "mood-smile", label: "Sonrisa" },
	{ value: "mood-happy", label: "Feliz" },
	{ value: "mood-crazy-happy", label: "Loco Feliz" },
	{ value: "ghost", label: "Fantasma" },
	{ value: "robot", label: "Robot" },
	{ value: "alien", label: "Alien" },
	{ value: "code", label: "Código" },
	{ value: "flask", label: "Matraz" },
	{ value: "calculator", label: "Calculadora" },
	{ value: "dna", label: "ADN" },
	{ value: "atom", label: "Átomo" },
	{ value: "cpu", label: "Procesador" },
	{ value: "briefcase", label: "Maletín" },
	{ value: "bulb", label: "Bombilla" },
	{ value: "book", label: "Libro" },
	{ value: "coffee", label: "Café" },
	{ value: "headphones", label: "Auriculares" },
	{ value: "rocket", label: "Cohete" },
	{ value: "trophy", label: "Trofeo" },
	{ value: "flame", label: "Fuego" },
	{ value: "planet", label: "Planeta" },
];

export default function GeneralTab() {
	const { session, userProfile, refreshProfile } = useAuth();
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState<{
		type: "success" | "danger";
		text: string;
	} | null>(null);

	const [formData, setFormData] = useState({
		full_name: "",
		username: "",
		icon: "",
	});

	useEffect(() => {
		if (userProfile) {
			setFormData((prev) => ({
				...prev,
				full_name: userProfile.full_name || "",
				username: userProfile.username || "",
				icon: userProfile.icon || "",
			}));
		}
	}, [userProfile]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleIconSelect = (iconName: string) => {
		setFormData({ ...formData, icon: iconName });
	};

	const updateProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMsg(null);

		try {
			const { error } = await supabase
				.from("usuarios")
				.update({
					full_name: formData.full_name,
					username: formData.username,
					icon: formData.icon,
				})
				.eq("id", session?.user.id);

			if (error) throw error;
			await refreshProfile();
			setMsg({
				type: "success",
				text: "La información se ha actualizado correctamente.",
			});
		} catch (error: any) {
			console.error("Error al actualizar", error);
			setMsg({
				type: "danger",
				text: "No se pudo actualizar la información. Intenta de nuevo.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<TabsContent value="general">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Información Personal
					</CardTitle>
				</CardHeader>
				<CardContent>
					{msg && (
						<Alert
							variant={
								msg.type === "danger"
									? "destructive"
									: "default"
							}
							className="mb-6"
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
					<form onSubmit={updateProfile} className="space-y-8">
						{/* --- SECCIÓN DE AVATAR REDISEÑADA --- */}
						<Field>
							<FieldLabel>Tu Avatar</FieldLabel>

							{/* Vista Previa Gigante */}
							{/*<div className="relative">
									<Avatar className="size-min">
										{formData.icon ? (
											<AvatarIcon>
												<IconAvatar
													icon={formData.icon}
													className="size-12 p-3"
												/>
											</AvatarIcon>
										) : (
											<AvatarLetter>
												{formData.full_name?.charAt(
													0,
												) || "U"}
											</AvatarLetter>
										)}
									</Avatar>
									<div className="bg-background absolute -right-1 -bottom-1 rounded-full border p-1.5 shadow-sm">
										<IconUser
											size={14}
											className="text-muted-foreground"
										/>
									</div>
								</div>*/}

							{/* Selector */}
							<Select
								value={formData.icon}
								onValueChange={handleIconSelect}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Seleccionar icono" />
								</SelectTrigger>
								<SelectContent>
									{AVATAR_ICONS.map((icon) => (
										<SelectItem
											key={icon.value}
											value={icon.value}
										>
											<IconAvatar
												icon={icon.value}
												size={16}
											/>{" "}
											{icon.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FieldDescription>
								Selecciona el icono que mas te represente para
								que sea tu nuevo avatar
							</FieldDescription>
						</Field>

						{/* --- RESTO DE LOS INPUTS --- */}
						<FieldGroup className="grid gap-4 sm:grid-cols-2">
							<Field>
								<FieldLabel htmlFor="full_name">
									Nombre Completo
								</FieldLabel>
								<Input
									id="full_name"
									name="full_name"
									value={formData.full_name}
									onChange={handleChange}
									placeholder="Ej. Juan Perez"
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="username">
									Username
								</FieldLabel>
								<Input
									id="username"
									name="username"
									value={formData.username}
									onChange={handleChange}
									placeholder="@JuanPerez3000"
								/>
							</Field>
						</FieldGroup>

						<Button
							type="submit"
							className="w-full gap-2 md:w-fit"
							disabled={loading}
						>
							{loading ? (
								<IconLoader2 className="h-4 w-4 animate-spin" />
							) : (
								<IconDeviceFloppy size={18} />
							)}
							Guardar Perfil
						</Button>
					</form>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
