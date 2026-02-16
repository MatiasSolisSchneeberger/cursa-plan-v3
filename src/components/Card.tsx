import {cn} from "../utils/cn"

export default function Card({
	id,
	children,
	color,
	className = "",
}: {
	id?: string
	children: React.ReactNode
	color?: "primary" | "secondary" | "tertiary" | "danger" | "warning" | "success" | "info"
	className?: string
}) {
	let classColor = ""
	switch (color) {
		default:
			classColor = "bg-background-100 dark:bg-background-900"
			break
		case "primary":
			classColor = "bg-primary-100 dark:bg-primary-900 outline-primary-300 dark:outline-primary-700"
			break
		case "secondary":
			classColor = "bg-secondary-100 dark:bg-secondary-900 outline-secondary-300 dark:outline-secondary-700"
			break
		case "tertiary":
			classColor = "bg-tertiary-100 dark:bg-tertiary-900 outline-tertiary-300 dark:outline-tertiary-700"
			break
		case "danger":
			classColor = "bg-danger-100 dark:bg-danger-900 outline-danger-300 dark:outline-danger-700"
			break
		case "warning":
			classColor = "bg-warning-100 dark:bg-warning-900 outline-warning-300 dark:outline-warning-700"
			break
		case "success":
			classColor = "bg-success-100 dark:bg-success-900 outline-success-300 dark:outline-success-700"
			break
		case "info":
			classColor = "bg-info-100 dark:bg-info-900 outline-info-300 dark:outline-info-700"
			break
	}
	return (
		<section
			id={id}
			className={cn(
				"rounded-3xl p-3 shadow-md hover:shadow-lg transition-all outline-2 outline-background-300 dark:outline-background-700 flex flex-col gap-4",
				classColor,
				className,
			)}>
			{children}
		</section>
	)
}
