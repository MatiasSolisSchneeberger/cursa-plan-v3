export default function CardInfoList({
	title,
	children,
	color,
}: {
	title: string
	children: React.ReactNode
	color?: "primary" | "secondary" | "tertiary" | "danger" | "warning" | "success" | "info"
}) {
	let bgColor = ""
	let hederColor = ""
	switch (color) {
		default:
		case "primary":
			bgColor = "bg-primary-50 dark:bg-primary-800"
			hederColor = "bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-100"
			break
		case "secondary":
			bgColor = "bg-secondary-50 dark:bg-secondary-800"
			hederColor = "bg-secondary-200 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-100"
			break
		case "tertiary":
			bgColor = "bg-tertiary-50 dark:bg-tertiary-800"
			hederColor = "bg-tertiary-200 dark:bg-tertiary-800 text-tertiary-800 dark:text-tertiary-100"
			break
		case "danger":
			bgColor = "bg-danger-50 dark:bg-danger-800"
			hederColor = "bg-danger-200 dark:bg-danger-800 text-danger-800 dark:text-danger-100"
			break
		case "warning":
			bgColor = "bg-warning-50 dark:bg-warning-800"
			hederColor = "bg-warning-200 dark:bg-warning-800 text-warning-800 dark:text-warning-100"
			break
		case "success":
			bgColor = "bg-success-50 dark:bg-success-800"
			hederColor = "bg-success-200 dark:bg-success-800 text-success-800 dark:text-success-100"
			break
		case "info":
			bgColor = "bg-info-50 dark:bg-info-800"
			hederColor = "bg-info-200 dark:bg-info-800 text-info-800 dark:text-info-100"
			break
	}

	return (
		<section className={`rounded-xl flex-1 outline-2 outline-background-300 dark:outline-background-700`}>
			<h4
				className={`p-2 rounded-t-xl texto-title text-center ${hederColor} border-b-2 border-background-300 dark:border-background-700`}>
				{title}
			</h4>
			{children}
		</section>
	)
}
