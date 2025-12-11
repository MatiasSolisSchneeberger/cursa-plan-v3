import {Link} from "react-router-dom"
import IconCarrera from "./IconCarrera"

export default function CardCarrera({icon, carrera, slug}: {icon: string; carrera: string; slug: string}) {
	return (
		<Link
			to={`/carreras/${slug}`}
			className={`theme-${slug} hover:shadow-1 bg-primary-200 dark:bg-primary-950 relative flex h-min w-full flex-1 flex-row items-center justify-between overflow-hidden rounded-4xl py-3 pl-3 pr-9 outline-2 focus:outline-primary-600 transition-all hover:shadow-md duration-100 ease-in-out outline-primary-400 hover:scale-[1.01] gap-3 hover:bg-primary-100 dark:hover:bg-primary-900`}>
			<div className="relative flex h-10 w-10 shrink-0 flex-row items-center justify-center gap-2.5 rounded-full bg-primary-600 dark:bg-primary-400 p-3">
				<label className="relative flex items-center justify-center text-center text-primary-50 dark:text-primary-950">
					<IconCarrera icon={icon} />
				</label>
			</div>

			<h2 className="texto-headline relative flex w-full items-center justify-center self-stretch text-center text-primary-700 dark:text-primary-300">
				{carrera.replace("Licenciatura", "Lic.").replace("Ingeniería", "Ing.").replace("Profesorado", "Prof.")}
			</h2>
		</Link>
	)
}

// Skeleton
export function CardCarreraSkeleton() {
	return (
		<div className="animate-pulse bg-primary-200 dark:bg-primary-950 relative flex h-min w-full flex-1 flex-row items-center justify-between overflow-hidden rounded-4xl py-3 pl-3 pr-9 outline-2 transition-all duration-100 ease-in-out outline-primary-400 gap-3">
			{/* Círculo del icono (simulado) */}
			<div className="h-10 w-10 shrink-0 rounded-full bg-primary-300 dark:bg-primary-800" />

			{/* Barra de texto (simulada) */}
			<div className="flex w-full items-center justify-center">
				<div className="h-4 rounded bg-primary-300 dark:bg-primary-800" />
			</div>
		</div>
	)
}
