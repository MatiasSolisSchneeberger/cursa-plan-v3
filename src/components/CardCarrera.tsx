import { Link } from "react-router-dom";
import IconCarrera from "./IconCarrera";
import { cn } from "@/utils/cn";

export default function CardCarrera({
	icon,
	carrera,
	slug,
	link,
	className,
	onClick,
}: {
	icon: string;
	carrera: string;
	slug: string;
	link?: string;
	className?: string;
	onClick?: () => void;
}) {
	return (
		<Link
			to={link || `/carreras/${slug}`}
			onClick={
				onClick &&
				(() => {
					window.scrollTo({ top: 0, behavior: "smooth" });
				})
			}
			className={cn(
				"hover:shadow-1 bg-primary-200 dark:bg-primary-950 focus:outline-primary-600 outline-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900 relative flex h-min flex-row items-center gap-3 overflow-hidden rounded-4xl py-3 pr-9 pl-3 outline-2 transition-all duration-100 ease-in-out hover:scale-[1.01] hover:shadow-md",
				slug && `theme-${slug}`,
				className,
			)}
		>
			{/* Icono */}
			<div className="bg-primary-600 dark:bg-primary-400 relative flex h-10 w-10 shrink-0 flex-row items-center justify-center gap-2.5 rounded-full p-3">
				<label className="text-primary-50 dark:text-primary-950 relative flex items-center justify-center text-center">
					<IconCarrera icon={icon} />
				</label>
			</div>

			{/* Nombre de carrera */}
			<h2 className="texto-headline text-primary-700 dark:text-primary-300 relative flex w-full items-center justify-center self-stretch text-center">
				{carrera
					.replace("Licenciatura", "Lic.")
					.replace("Ingeniería", "Ing.")
					.replace("Profesorado", "Prof.")}
			</h2>
		</Link>
	);
}

// Skeleton
export function CardCarreraSkeleton() {
	return (
		<div className="bg-primary-200 dark:bg-primary-950 outline-primary-400 relative flex h-min w-full flex-1 animate-pulse flex-row items-center justify-between gap-3 overflow-hidden rounded-4xl py-3 pr-9 pl-3 outline-2 transition-all duration-100 ease-in-out">
			{/* Círculo del icono (simulado) */}
			<div className="bg-primary-300 dark:bg-primary-800 h-10 w-10 shrink-0 rounded-full" />

			{/* Barra de texto (simulada) */}
			<div className="flex w-full items-center justify-center">
				<div className="bg-primary-300 dark:bg-primary-800 h-4 rounded" />
			</div>
		</div>
	);
}
