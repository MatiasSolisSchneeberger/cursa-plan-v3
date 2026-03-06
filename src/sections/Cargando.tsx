import { IconLoader } from "@tabler/icons-react";
import { cn } from "../lib/utils";

export default function Cargando({
	className,
	text,
}: {
	className?: string;
	text?: string;
}) {
	return (
		<section
			className={cn(
				`flex h-[calc(100vh-12rem)] items-center justify-center gap-4`,
				className,
			)}
		>
			<IconLoader
				className="text-primary-400 dark:text-primary-600 animate-spin"
				size={32}
			/>
			<span className="texto-title text-text-900 dark:text-text-100">
				{text || "Cargando..."}
			</span>
		</section>
	);
}
