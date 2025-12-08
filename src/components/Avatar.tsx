import {IconUser} from "@tabler/icons-react"

interface AvatarProps {
	img?: string
	name: string
	notification?: boolean
	status?: boolean
	color: "primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info" | "background"
}

export default function Avatar({img, name, notification, status, color}: AvatarProps) {
	return (
		<div className="relative inline-flex shrink-0">
			{img || name ? (
				img ? (
					<img
						src={img}
						className={`size-10 rounded-full outline-2 outline-${color}-100 object-cover dark:outline-${color}-800`}
					/>
				) : (
					<span
						className={`texto-title flex h-10 w-10 items-center justify-center rounded-full outline-2 outline-${color}-100 bg-primary-400 text-center text-primary-800 dark:outline-${color}-800 dark:bg-primary-600 dark:text-primary-200 select-none`}>
						{name ? name[0].toUpperCase() : ""}
					</span>
				)
			) : (
				<span
					className={`texto-title flex h-10 w-10 items-center justify-center rounded-full outline-2 outline-${color}-100 bg-primary-400 text-center text-primary-800 dark:outline-${color}-800 dark:bg-primary-600 dark:text-primary-200`}>
					<IconUser />
				</span>
			)}

			{notification && (
				<span
					className={`absolute top-0 right-0 h-2.5 w-2.5 rounded-full outline-2 outline-${color}-100 bg-danger-600 dark:outline-${color}-800 dark:bg-danger-400`}
				/>
			)}
			{status && (
				<span
					className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full outline-2 outline-${color}-100 bg-success-600 dark:outline-${color}-800 dark:bg-success-400`}
				/>
			)}
		</div>
	)
}
