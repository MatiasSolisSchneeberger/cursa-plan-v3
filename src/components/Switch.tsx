import {IconInfoCircleFilled} from "@tabler/icons-react"
import type {InputHTMLAttributes, ReactNode} from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode
	info?: string
	optional?: string
	HelpText?: string
	HelpTextDanger?: boolean
}

export default function Switch({
	children,
	disabled,
	required,
	info,
	optional,
	HelpText,
	HelpTextDanger,
	className,
	...props
}: Props) {
	return (
		<label
			className={`flex flex-row gap-4 items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${
				className || ""
			}`}>
			<input type="checkbox" className="peer sr-only" disabled={disabled} required={required} {...props} />
			<div className="relative h-6 w-11 rounded-full bg-background-400 peer-checked:bg-primary-600 after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:bg-background-100 after:transition-all after:duration-200 after:ease-in-out after:content-[''] peer-checked:after:translate-x-full peer-checked:after:bg-primary-100 peer-active:after:scale-110 rtl:peer-checked:after:-translate-x-full dark:bg-background-600 peer-checked:dark:bg-primary-400 dark:peer-checked:after:bg-primary-950"></div>
			<div>
				<span className="flex flex-row items-center gap-1">
					<span className="texto-label text-text-950 select-none dark:text-text-50">{children}</span>
					{optional && <span className="texto-label text-text-700 select-none dark:text-text-300">({optional})</span>}
					{required && <span className="texto-label text-danger-600 select-none dark:text-danger-400">*</span>}
					{info && (
						<span>
							<IconInfoCircleFilled data-tooltip-target="tooltip-no-arrow" />
							<div
								id="tooltip-no-arrow"
								role="tooltip"
								className="tooltip invisible absolute z-10 inline-block rounded-lg bg-background-800 px-3 py-2 text-sm font-medium text-text-50 opacity-0 shadow-xs transition-opacity duration-300 dark:bg-background-200 dark:text-text-950">
								{info}
							</div>
						</span>
					)}
				</span>
				{HelpText && (
					<span
						className={`texto-label font-bold select-none ${
							HelpTextDanger ? "text-danger-700 dark:text-danger-300" : "text-text-700 dark:text-text-300"
						}`}>
						{HelpText}
					</span>
				)}
			</div>
		</label>
	)
}
