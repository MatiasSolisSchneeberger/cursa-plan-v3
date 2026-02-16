export default function CardBody({children, className, ...props}: {children: React.ReactNode; className?: string}) {
	return (
		<main
			className={`h-min w-full texto-body text-text-800 dark:text-text-200 flex flex-col gap-2 ${className}`}
			{...props}>
			{children}
		</main>
	)
}
