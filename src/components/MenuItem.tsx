import type {ReactNode} from "react"
import {Link} from "react-router-dom"

interface MenuItemInterface {
	children: ReactNode
	iconLeft?: ReactNode
	iconRight?: ReactNode
	avatar?: ReactNode
	chip?: ReactNode
	button?: ReactNode
	switchComponent?: ReactNode
	textHelp?: string
	href?: string
	onClick?: () => void
	className?: string
	canHover?: boolean
}

const content = ({
	children,
	iconLeft,
	iconRight,
	avatar,
	chip,
	button,
	switchComponent,
	textHelp,
}: MenuItemInterface) => (
	<>
		{iconLeft && <span className="pl-1 shrink-0 flex items-center">{iconLeft}</span>}
		{avatar && <span className="px-1 shrink-0 flex items-center h-min">{avatar}</span>}
		<div className="flex flex-col pl-2 pr-4 texto-label w-full">
			<span>{children}</span>
			<span className="text-text-700 dark:text-text-300">{textHelp}</span>
		</div>

		{chip && <span className="pr-2 shrink-0 flex items-center">{chip}</span>}
		{button && <span className="pr-2 shrink-0 flex items-center">{button}</span>}
		{switchComponent && <span className="pr-2 shrink-0 flex items-center">{switchComponent}</span>}
		{iconRight && <span className="pr-1 shrink-0 flex items-center">{iconRight}</span>}
	</>
)
export default function MenuItem({
	children,
	iconLeft,
	iconRight,
	avatar,
	chip,
	button,
	switchComponent,
	href,
	textHelp,
	className,
	canHover,
	onClick,
}: MenuItemInterface) {
	return (
		<>
			{href ? (
				<Link
					to={href}
					onClick={onClick}
					className={`relative flex-1 flex flex-row w-full h-min px-2 py-1 min-h-12 text-text-900 dark:text-text-100 items-center hover:bg-background-50/75 dark:hover:bg-background-950/75 hover:shadow-sm transition-all ease-in-out rounded-xl hover:cursor-pointer ${className}`}>
					{content({children, iconLeft, iconRight, avatar, chip, button, switchComponent, textHelp})}
				</Link>
			) : (
				<li
					onClick={onClick}
					className={`relative flex-1 flex flex-row w-full h-min px-2 py-1 min-h-12 text-text-900 dark:text-text-100 items-center ${
						canHover
							? "hover:bg-background-50/75 dark:hover:bg-background-950/75 hover:shadow-sm transition-all ease-in-out rounded-xl hover:cursor-pointer"
							: ""
					} ${className}`}>
					{content({children, iconLeft, iconRight, avatar, chip, button, switchComponent, textHelp})}
				</li>
			)}
		</>
	)
}
