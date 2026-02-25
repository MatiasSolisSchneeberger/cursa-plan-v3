import { IconArrowLeft } from "@tabler/icons-react";
import Button from "@/components/Button";
import type { ReactNode } from "react";

interface PageHeaderProps {
	title: string | ReactNode;
	backUrl: string;
	children?: ReactNode;
}

export default function PageHeader({
	title,
	backUrl,
	children,
}: PageHeaderProps) {
	return (
		<header className="bg-primary-100 dark:bg-primary-900 outline-primary-300 dark:outline-primary-700 flex w-full items-center gap-3 rounded-3xl p-3 outline-2">
			{/* Bloque Izquierdo: Botón Volver */}
			<div className="shrink-0">
				<Button
					isIconOnly
					variant="solid"
					color="primary"
					href={backUrl}
				>
					<IconArrowLeft />
				</Button>
			</div>

			{/* Bloque Derecho: Contenido */}
			<div className="border-primary-300 dark:border-primary-700 texto-headline text-primary-600 dark:text-primary-400 flex w-full flex-wrap justify-between gap-3 pl-3 text-center md:border-l-2">
				{/* Título */}
				<div className="flex flex-1 items-center">{title}</div>
				{/* Controles (Chips, Dropdowns, etc) */}
				{children && (
					<div className="border-primary-300 dark:border-primary-700 flex w-full flex-wrap items-center gap-3 border-t-2 pt-3 md:w-auto md:border-t-0 md:border-l-2 md:pt-0 md:pl-3">
						{children}
					</div>
				)}
			</div>
		</header>
	);
}
