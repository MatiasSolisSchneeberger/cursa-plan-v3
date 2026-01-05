export default function CardHeader({
	children,
	color,
	className,
}: {
	children: React.ReactNode
	color: "primary" | "secondary" | "tertiary" | "danger" | "warning" | "success" | "info"
	className?: string
}) {
	let classColor = ""
	switch (color) {
		default:
		case "primary":
			classColor =
				"bg-primary-400 dark:bg-primary-600 text-primary-800 dark:text-primary-200 outline-2 outline-primary-700 dark:outline-primary-300"
			break
		case "secondary":
			classColor =
				"bg-secondary-400 dark:bg-secondary-600 text-secondary-800 dark:text-secondary-200 outline-2 outline-secondary-700 dark:outline-secondary-300"
			break
		case "tertiary":
			classColor =
				"bg-tertiary-400 dark:bg-tertiary-600 text-tertiary-800 dark:text-tertiary-200 outline-2 outline-tertiary-700 dark:outline-tertiary-300"
			break
		case "danger":
			classColor =
				"bg-danger-400 dark:bg-danger-600 text-danger-800 dark:text-danger-200 outline-2 outline-danger-700 dark:outline-danger-300"
			break
		case "warning":
			classColor =
				"bg-warning-400 dark:bg-warning-600 text-warning-800 dark:text-warning-200 outline-2 outline-warning-700 dark:outline-warning-300"
			break
		case "success":
			classColor =
				"bg-success-400 dark:bg-success-600 text-success-800 dark:text-success-200 outline-2 outline-success-700 dark:outline-success-300"
			break
		case "info":
			classColor =
				"bg-info-400 dark:bg-info-600 text-info-800 dark:text-info-200 outline-2 outline-info-700 dark:outline-info-300"
			break
	}

	return (
		<header className={`h-min w-full texto-headline text-center p-2 rounded-xl ${classColor} ${className}`}>
			{children}
		</header>
	)
}
