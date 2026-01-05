export default function CardBody({children, className, ...props}: {children: React.ReactNode; className?: string}) {
	return (
		<main className={`h-min w-full ${className}`} {...props}>
			{children}
		</main>
	)
}
