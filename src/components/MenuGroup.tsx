import {cn} from "../lib/utils"

export default function MenuGroup({
	children,
	title,
	className,
}: {
	children: React.ReactNode
	title?: string
	className?: string
}) {
	return (
		<li
			className={cn(
				`flex flex-col gap-2 p-2 border-b-2 pb-2 last:pb-0 border-background-300 dark:border-background-700 last:border-b-0 ${className}`,
			)}>
			{title && <span className=" texto-body text-text-700 dark:text-text-300 px-1">{title}</span>}
			<ul className="flex flex-col gap-2">{children}</ul>
		</li>
	)
}
