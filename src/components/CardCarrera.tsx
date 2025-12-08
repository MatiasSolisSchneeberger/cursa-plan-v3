export default function CardCarrera(icon: React.ReactNode, carrera: string, slug: string) {
	return (
		<span
			className={`flex flex-row gap-2 items-center p-2 bg-primary-200 dark:bg-primary-950 rounded-3xl hover:bg-primary-100 dark:hover:bg-primary-900 outline-1 outline-primary-300 dark:outline-primary-700 theme-${slug}`}>
			<div className="justify-items-center bg-primary-600 dark:bg-primary-400 rounded-full p-2">{icon}</div>
			<h2 className="texto-title text-text-900 dark:text-text-100">{carrera}</h2>
		</span>
	)
}
