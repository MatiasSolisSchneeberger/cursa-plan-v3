import {IconLoader} from "@tabler/icons-react"

export default function Cargando() {
	return (
		<section className="flex gap-4 items-center justify-center h-[calc(100vh-12rem)]">
			<IconLoader className="animate-spin text-primary-400 dark:text-primary-600" size={32} />
			<span className="texto-title text-text-900 dark:text-text-100">Cargando...</span>
		</section>
	)
}
