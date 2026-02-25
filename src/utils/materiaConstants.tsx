import {
	IconCircleDashed,
	IconHourglass,
	IconCircleDashedCheck,
	IconCircleCheck,
	IconXboxX,
	IconLock,
	IconLockOpen,
} from "@tabler/icons-react";
import type { EstadoMateria } from "@/types/materiaTypes";

export type EstadoMateriaConfig = {
	texto: EstadoMateria;
	color:
		| "tertiary"
		| "info"
		| "warning"
		| "success"
		| "primary"
		| "secondary"
		| "danger";
	icon: React.ReactNode;
};

export const estados: EstadoMateriaConfig[] = [
	{
		texto: "Sin cursar",
		color: "tertiary",
		icon: <IconCircleDashed size={20} />,
	},
	{ texto: "Cursando", color: "info", icon: <IconHourglass size={20} /> },
	{
		texto: "Regular",
		color: "warning",
		icon: <IconCircleDashedCheck size={20} />,
	},
	{
		texto: "Aprobado",
		color: "success",
		icon: <IconCircleCheck size={20} />,
	},
	{ texto: "Libre", color: "primary", icon: <IconXboxX size={20} /> },
];

export const disponibilidadMaterias: {
	texto: string;
	color:
		| "tertiary"
		| "info"
		| "warning"
		| "success"
		| "primary"
		| "secondary"
		| "danger";
	icon: React.ReactNode;
}[] = [
	{ texto: "Bloqueado", color: "danger", icon: <IconLock size={20} /> },
	{
		texto: "Solo Cursar",
		color: "warning",
		icon: <IconLockOpen size={20} />,
	},
	{
		texto: "Desbloqueado",
		color: "success",
		icon: <IconCircleCheck size={20} />,
	},
];
