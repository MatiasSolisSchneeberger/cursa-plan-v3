import {IconUser} from "@tabler/icons-react"
import IconAvatar from "./IconAvatar"

interface AvatarProps {
	img?: string
	name?: string
	icon?: string
	notification?: boolean
	status?: boolean
	color: "primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info" | "background"
	className?: string
	size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export default function Avatar({img, name, icon, notification, status, color, className, size = "md"}: AvatarProps) {
	const textColors = {
		primary: "text-primary-800 dark:text-primary-200",
		secondary: "text-secondary-800 dark:text-secondary-200",
		tertiary: "text-tertiary-800 dark:text-tertiary-200",
		success: "text-success-800 dark:text-success-200",
		danger: "text-danger-800 dark:text-danger-200",
		warning: "text-warning-800 dark:text-warning-200",
		info: "text-info-800 dark:text-info-200",
		background: "text-background-800 dark:text-background-200",
	}

	const outlineColors = {
		primary: "outline-primary-100 dark:outline-primary-800",
		secondary: "outline-secondary-100 dark:outline-secondary-800",
		tertiary: "outline-tertiary-100 dark:outline-tertiary-800",
		success: "outline-success-100 dark:outline-success-800",
		danger: "outline-danger-100 dark:outline-danger-800",
		warning: "outline-warning-100 dark:outline-warning-800",
		info: "outline-info-100 dark:outline-info-800",
		background: "outline-background-100 dark:outline-background-800",
	}

	const bgColors = {
		primary: "bg-primary-400 dark:bg-primary-600",
		secondary: "bg-secondary-400 dark:bg-secondary-600",
		tertiary: "bg-tertiary-400 dark:bg-tertiary-600",
		success: "bg-success-400 dark:bg-success-600",
		danger: "bg-danger-400 dark:bg-danger-600",
		warning: "bg-warning-400 dark:bg-warning-600",
		info: "bg-info-400 dark:bg-info-600",
		background: "bg-background-400 dark:bg-background-600",
	}

	const sizeClasses = {
		xs: "size-6 text-xs",
		sm: "size-8 text-sm",
		md: "size-10 text-base",
		lg: "size-12 text-lg",
		xl: "size-16 text-xl",
	}

	const outlineClass = outlineColors[color]
	const bgClass = bgColors[color]
	const textColor = textColors[color]
	const sizeClass = sizeClasses[size]

	return (
		<div className={`relative inline-flex shrink-0 ${className || ""}`}>
			{img ?
				<img src={img} className={`${sizeClass} rounded-full outline-2 object-cover ${outlineClass}`} />
			: icon ?
				<span
					className={`texto-title flex ${sizeClass} items-center justify-center rounded-full outline-2 text-center select-none ${textColor} ${bgClass} ${outlineClass}`}>
					<IconAvatar icon={icon} />
				</span>
			: name ?
				<span
					className={`texto-title flex ${sizeClass} items-center justify-center rounded-full outline-2 text-center select-none ${textColor} ${bgClass} ${outlineClass}`}>
					{name[0].toUpperCase()}
				</span>
			:	<span
					className={`texto-title flex ${sizeClass} items-center justify-center rounded-full outline-2 text-center ${textColor} ${bgClass} ${outlineClass}`}>
					<IconUser />
				</span>
			}

			{notification && (
				<span
					className={`absolute top-0 right-0 h-2.5 w-2.5 rounded-full outline-2 bg-danger-600 dark:bg-danger-400 ${outlineClass}`}
				/>
			)}
			{status && (
				<span
					className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full outline-2 bg-success-600 dark:bg-success-400 ${outlineClass}`}
				/>
			)}
		</div>
	)
}
