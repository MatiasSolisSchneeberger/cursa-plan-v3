export default function Menu({children}: {children: React.ReactNode}) {
	return (
		<ul className="bg-background-50 outline-2 outline-background-300 rounded-3xl shadow-2xl flex flex-col gap-2 dark:bg-background-900 dark:outline-background-700 py-2 min-w-xs">
			{children}
		</ul>
	)
}
