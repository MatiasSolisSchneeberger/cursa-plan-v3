import {cn} from "../lib/utils"

export default function Menu({children, className}: {children: React.ReactNode; className?: string}) {
	return (
		<ul
			className={cn(
				"bg-background-100 outline-2 outline-background-300 rounded-3xl shadow-2xl flex flex-col gap-2 dark:bg-background-900 dark:outline-background-700 py-2 min-w-xs",
				className,
			)}>
			{children}
		</ul>
	)
}
