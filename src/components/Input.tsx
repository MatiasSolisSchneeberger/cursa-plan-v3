interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	showPassword?: boolean
}

export default function Input({label, className, ...props}: Props) {
	return (
		<div className="flex flex-col gap-1 w-full">
			{label && <label className="texto-body text-text-800 dark:text-text-200">{label}</label>}
			<input
				className={`p-3 rounded-xl texto-label border-2 border-background-300 dark:border-background-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed autofill:bg-primary-200 dark:autofill:bg-primary-800 ${
					className || ""
				}`}
				{...props}
			/>
		</div>
	)
}
