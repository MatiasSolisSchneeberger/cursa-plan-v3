import type {ReactNode} from "react"
import {Link} from "react-router-dom"
import {cn} from "../utils/cn"

interface MenuItemInterface {
	children: ReactNode
	iconLeft?: ReactNode
	iconRight?: ReactNode
	avatar?: ReactNode
	chip?: ReactNode
	button?: ReactNode
	switchComponent?: ReactNode
	textHelp?: string
	tooltip?: ReactNode
	href?: string
	onClick?: () => void
	className?: string
	canHover?: boolean
	isActive?: boolean
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
	tooltip,
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
		{tooltip && <span className="pr-2 shrink-0 flex items-center">{tooltip}</span>}
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
	tooltip,
	className,
	canHover,
	isActive,
	onClick,
}: MenuItemInterface) {
	const activeClass =
		isActive ? "bg-primary-100 font-bold text-primary-800 dark:text-primary-200 dark:bg-primary-900" : ""
	return (
		<>
			{href ?
				<Link
					to={href}
					onClick={() => {
						window.scrollTo({top: 0, behavior: "smooth"})
						if (onClick) onClick()
					}}
					className={cn(
						`relative flex-1 flex flex-row w-full h-min px-2 py-1 min-h-12 text-text-900 dark:text-text-100 items-center hover:bg-background-50/75 dark:hover:bg-background-950/75 hover:shadow-sm transition-all ease-in-out rounded-xl hover:cursor-pointer`,
						className,
						activeClass,
					)}>
					{content({children, iconLeft, iconRight, avatar, chip, button, switchComponent, textHelp, tooltip})}
				</Link>
			:	<li
					onClick={onClick}
					className={cn(
						`relative flex-1 flex flex-row w-full h-min px-2 py-1 min-h-12 text-text-900 dark:text-text-100 rounded-xl items-center ${
							canHover ?
								"hover:bg-background-50/75 dark:hover:bg-background-950/75 hover:shadow-sm transition-all ease-in-out hover:cursor-pointer"
							:	""
						} ${className} ${activeClass}`,
					)}>
					{content({children, iconLeft, iconRight, avatar, chip, button, switchComponent, textHelp, tooltip})}
				</li>
			}
		</>
	)
}
