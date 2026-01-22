import {cn} from "../utils/cn"

export default function Menu({children, className}: {children: React.ReactNode; className?: string}) {
	return (
		<ul
			className={cn(
				"bg-background-50 outline-2 outline-background-300 rounded-3xl shadow-2xl flex flex-col gap-2 dark:bg-background-800 dark:outline-background-700 py-2 min-w-xs",
				className,
			)}>
			{children}
		</ul>
	)
}
