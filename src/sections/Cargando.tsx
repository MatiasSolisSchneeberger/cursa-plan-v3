import {IconLoader} from "@tabler/icons-react"
import {cn} from "../utils/cn"

export default function Cargando({className, text}: {className?: string; text?: string}) {
	return (
		<section className={cn(`flex gap-4 items-center justify-center h-[calc(100vh-12rem)]`, className)}>
			<IconLoader className="animate-spin text-primary-400 dark:text-primary-600" size={32} />
			<span className="texto-title text-text-900 dark:text-text-100">{text || "Cargando..."}</span>
		</section>
	)
}
