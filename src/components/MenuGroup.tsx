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
		<li className={`flex flex-col gap-2 border-b-2 pb-2 border-background-300 last:border-b-0 ${className}`}>
			{title && <span className="px-3 py-1 texto-body text-text-700 dark:text-text-300">{title}</span>}
			<ul className="flex flex-col gap-2">{children}</ul>
		</li>
	)
}
