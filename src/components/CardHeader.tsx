export default function CardHeader({
	children,
	color,
}: {
	children: React.ReactNode
	color: "primary" | "secondary" | "tertiary" | "danger" | "warning" | "success" | "info"
}) {
	let classColor = ""
	switch (color) {
		default:
		case "primary":
			classColor = "bg-primary-600 dark:bg-primary-400 text-primary-50 dark:text-primary-950"
			break
		case "secondary":
			classColor = "bg-secondary-600 dark:bg-secondary-400 text-secondary-50 dark:text-secondary-950"
			break
		case "tertiary":
			classColor = "bg-tertiary-600 dark:bg-tertiary-400 text-tertiary-50 dark:text-tertiary-950"
			break
		case "danger":
			classColor = "bg-danger-600 dark:bg-danger-400 text-danger-50 dark:text-danger-950"
			break
		case "warning":
			classColor = "bg-warning-600 dark:bg-warning-400 text-warning-50 dark:text-warning-950"
			break
		case "success":
			classColor = "bg-success-600 dark:bg-success-400 text-success-50 dark:text-success-950"
			break
		case "info":
			classColor = "bg-info-600 dark:bg-info-400 text-info-50 dark:text-info-950"
			break
	}

	return <header className={`h-min w-full texto-headline text-center  p-2 rounded-xl ${classColor}`}>{children}</header>
}
