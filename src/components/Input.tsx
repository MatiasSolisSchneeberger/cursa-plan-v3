import {IconEye, IconEyeOff} from "@tabler/icons-react"
import {useState} from "react"
import Button from "./Button"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	showPassword?: boolean
}

export default function Input({label, className, showPassword, type, ...props}: Props) {
	const [isVisible, setIsVisible] = useState(false)

	const isPassword = type === "password"
	const inputType =
		isPassword ?
			isVisible ? "text"
			:	"password"
		:	type

	return (
		<div className="flex flex-col gap-1 w-full">
			{(label || props.required) && (
				<label className="texto-body text-text-800 dark:text-text-200">
					{label}
					{props.required && <span className="text-danger-600 dark:text-danger-400"> *</span>}
				</label>
			)}
			<div className="flex flex-row gap-3">
				<input
					type={inputType}
					className={`p-3 rounded-xl texto-label border-2 border-background-200 dark:border-background-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed autofill:bg-primary-200 dark:autofill:bg-primary-800 w-full ${
						isPassword && showPassword ? "pr-12" : ""
					} ${className || ""}`}
					{...props}
				/>

				{isPassword && showPassword && (
					<Button
						size="md"
						isIconOnly
						color="tertiary"
						variant={isVisible ? "flat" : "outlined"}
						className="aspect-square"
						type="button"
						onClick={() => setIsVisible(!isVisible)}
						aria-label={isVisible ? "Ocultar contraseña" : "Ver contraseña"}>
						{isVisible ?
							<IconEye size={20} />
						:	<IconEyeOff size={20} />}
					</Button>
				)}
			</div>
		</div>
	)
}
