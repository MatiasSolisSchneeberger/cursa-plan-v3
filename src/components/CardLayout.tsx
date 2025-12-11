export default function CardLayout({
	children,
	title,
	endContent,
}: {
	children: React.ReactNode
	title: string
	endContent?: React.ReactNode
}) {
	return (
		<section className="bg-background-100 dark:bg-background-900 min-w-sm rounded-3xl p-3 shadow-sm border border-background-300 dark:border-background-700 flex flex-col gap-3">
			<header className="h-min w-full bg-primary-600 dark:bg-primary-400 text-primary-50 dark:text-primary-950 p-2 rounded-xl">
				<h3 className="texto-headline text-center">{title}</h3>
			</header>
			<main className="flex-1 texto-label text-text-900">{children}</main>
			<footer className="h-min w-full">{endContent}</footer>
		</section>
	)
}
