import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
	IconBug,
	IconBook,
	IconQuestionMark,
	IconUsers,
	IconBulb,
	IconSend,
	IconCheck,
	IconAlertCircle,
	IconLoader2,
	IconCopy,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

import supabase from "@/utils/supabase";
import { SOCIAL_LINKS } from "@/utils/links";
import PageLayout from "@/layout/PageLayout";
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const ETIQUETAS = [
	{ value: "error", label: "Reportar un Error", icon: <IconBug size={16} /> },
	{
		value: "datos",
		label: "Error en Plan/Correlativas",
		icon: <IconBook size={16} />,
	},
	{ value: "sugerencia", label: "Sugerencia", icon: <IconBulb size={16} /> },
	{
		value: "colaboracion",
		label: "Colaboración",
		icon: <IconUsers size={16} />,
	},
	{
		value: "consulta",
		label: "Consulta General",
		icon: <IconQuestionMark size={16} />,
	},
];

function CopyEmailButton({ email }: { email: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<Tooltip>
			<TooltipTrigger>
				<Button
					variant="outline"
					size="icon-lg"
					className="shrink-0"
					onClick={handleCopy}
				>
					{copied ? (
						<IconCheck className="text-emerald-500" size={18} />
					) : (
						<IconCopy size={18} />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				{copied ? "Copiado" : "Copiar Correo"}
			</TooltipContent>
		</Tooltip>
	);
}

export default function Contact() {
	const [searchParams] = useSearchParams();

	const etiquetaParam =
		searchParams.get("categoria") || searchParams.get("etiqueta");
	const validTag =
		etiquetaParam && ETIQUETAS.some((e) => e.value === etiquetaParam)
			? etiquetaParam
			: "consulta";

	const [formData, setFormData] = useState({
		nombre: searchParams.get("usuario") || "",
		email: searchParams.get("email") || "",
		mensaje: searchParams.get("mensaje") || "",
		etiqueta: validTag,
	});
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setStatus("loading");
			const { error } = await supabase.from("mensajes").insert({
				nombre: formData.nombre,
				email: formData.email,
				mensaje: formData.mensaje,
				etiqueta: formData.etiqueta,
			});
			if (error) throw error;
			setStatus("success");
			setFormData({
				nombre: "",
				email: "",
				mensaje: "",
				etiqueta: validTag,
			});
			setTimeout(() => setStatus("idle"), 5000);
		} catch (error) {
			console.error("Error enviando mensaje:", error);
			setStatus("error");
			setTimeout(() => setStatus("idle"), 5000);
		}
	};

	return (
		<PageLayout
			breadcrumbs={[
				{ url: "/", isHome: true },
				{ label: "Contacto", url: "/contacto", isCurrentPage: true },
			]}
		>
			<div className="mb-6 flex flex-col items-center">
				<TypographyH1>Contacto</TypographyH1>
				<TypographyP className="text-muted-foreground mt-2 max-w-2xl text-center">
					¿Tenés alguna duda sobre el plan de estudios? ¿Encontraste
					un error en la plataforma? ¡Escribinos! Tu feedback nos
					ayuda a mejorar CursaPlan.
				</TypographyP>
			</div>

			<section className="flex flex-col gap-6 md:flex-row">
				{/* Columna Izquierda: Accesos Directos */}
				<Card className="h-fit w-full md:w-1/3">
					<CardHeader>
						<CardTitle className="text-lg">
							Más Formas de Conectar
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-3">
						{SOCIAL_LINKS.map(({ href, icon, label }) => {
							const isEmail = href.startsWith("mailto:");
							return (
								<div
									key={label}
									className="flex w-full shrink-0 flex-row items-center gap-2"
								>
									<Button
										variant="outline"
										className="w-full shrink justify-start gap-2"
										asChild
									>
										<Link
											to={href}
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="flex items-center justify-center *:size-5">
												{icon}
											</div>
											<span className="truncate">
												{label}
											</span>
										</Link>
									</Button>
									{isEmail && (
										<CopyEmailButton email={label} />
									)}
								</div>
							);
						})}
					</CardContent>
				</Card>

				{/* Columna Derecha: Formulario */}
				<Card className="w-full md:w-2/3">
					<CardHeader>
						<CardTitle className="text-2xl font-bold">
							Envíanos un mensaje
						</CardTitle>
					</CardHeader>
					<CardContent>
						{status === "success" && (
							<Alert className="mb-6">
								<IconCheck className="text-emerald-500" />
								<AlertTitle>¡Mensaje Enviado!</AlertTitle>
								<AlertDescription>
									Recibimos tu mensaje correctamente y nos
									contactaremos pronto.
								</AlertDescription>
							</Alert>
						)}
						{status === "error" && (
							<Alert variant="destructive" className="mb-6">
								<IconAlertCircle />
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>
									Hubo un problema al enviar tu mensaje. Por
									favor, intenta nuevamente más tarde.
								</AlertDescription>
							</Alert>
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<Field>
									<FieldLabel htmlFor="nombre">
										Tu Nombre
									</FieldLabel>
									<Input
										id="nombre"
										placeholder="Ej. Juan Perez"
										value={formData.nombre}
										onChange={(e) =>
											setFormData({
												...formData,
												nombre: e.target.value,
											})
										}
										required
										disabled={status === "loading"}
									/>
								</Field>
								<Field>
									<FieldLabel htmlFor="email">
										Correo Electrónico
									</FieldLabel>
									<Input
										id="email"
										type="email"
										placeholder="tu@email.com"
										value={formData.email}
										onChange={(e) =>
											setFormData({
												...formData,
												email: e.target.value,
											})
										}
										required
										disabled={status === "loading"}
									/>
								</Field>
							</div>

							<Field>
								<FieldLabel>Motivo de Contacto</FieldLabel>
								<Select
									value={formData.etiqueta}
									onValueChange={(val) =>
										setFormData({
											...formData,
											etiqueta: val,
										})
									}
									disabled={status === "loading"}
								>
									<SelectTrigger className="h-10 w-full">
										<SelectValue placeholder="Selecciona un motivo" />
									</SelectTrigger>
									<SelectContent>
										{ETIQUETAS.map((etiqueta) => (
											<SelectItem
												key={etiqueta.value}
												value={etiqueta.value}
											>
												<div className="flex items-center gap-2">
													{etiqueta.icon}
													{etiqueta.label}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>

							<Field>
								<FieldLabel htmlFor="mensaje">
									Mensaje
								</FieldLabel>
								<textarea
									id="mensaje"
									className="border-input focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 min-h-[120px] w-full min-w-0 resize-y rounded-lg border bg-transparent px-3 py-2 text-base transition-colors outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm"
									placeholder="¿En qué podemos ayudarte?"
									value={formData.mensaje}
									onChange={(e) =>
										setFormData({
											...formData,
											mensaje: e.target.value,
										})
									}
									required
									disabled={status === "loading"}
								/>
							</Field>

							<div className="flex justify-end">
								<Button
									type="submit"
									className="w-full gap-2 sm:w-auto"
									disabled={status === "loading"}
								>
									{status === "loading" ? (
										<IconLoader2 className="h-4 w-4 animate-spin" />
									) : (
										<IconSend size={18} />
									)}
									{status === "loading"
										? "Enviando..."
										: "Enviar Mensaje"}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</section>
		</PageLayout>
	);
}
