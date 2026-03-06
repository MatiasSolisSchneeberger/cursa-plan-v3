import {cn} from "../lib/utils"

export default function CardHeader({
	children,
	color = "primary",
	className,
}: {
	children: React.ReactNode
	color?: "primary" | "secondary" | "tertiary" | "danger" | "warning" | "success" | "info"
	className?: string
}) {
	let classColor = ""
	switch (color) {
		default:
		case "primary":
			classColor =
				"bg-primary-300 dark:bg-primary-700 text-primary-800 dark:text-primary-200 outline-2 outline-primary-700 dark:outline-primary-300"
			break
		case "secondary":
			classColor =
				"bg-secondary-300 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200 outline-2 outline-secondary-700 dark:outline-secondary-300"
			break
		case "tertiary":
			classColor =
				"bg-tertiary-300 dark:bg-tertiary-700 text-tertiary-800 dark:text-tertiary-200 outline-2 outline-tertiary-700 dark:outline-tertiary-300"
			break
		case "danger":
			classColor =
				"bg-danger-300 dark:bg-danger-700 text-danger-800 dark:text-danger-200 outline-2 outline-danger-700 dark:outline-danger-300"
			break
		case "warning":
			classColor =
				"bg-warning-300 dark:bg-warning-700 text-warning-800 dark:text-warning-200 outline-2 outline-warning-700 dark:outline-warning-300"
			break
		case "success":
			classColor =
				"bg-success-300 dark:bg-success-700 text-success-800 dark:text-success-200 outline-2 outline-success-700 dark:outline-success-300"
			break
		case "info":
			classColor =
				"bg-info-300 dark:bg-info-700 text-info-800 dark:text-info-200 outline-2 outline-info-700 dark:outline-info-300"
			break
	}

	return (
		<header
			className={cn(
				"h-min w-full font-title text-3xl leading-9 font-bold text-center p-2 rounded-xl",
				classColor,
				className,
			)}>
			{children}
		</header>
	)
}
