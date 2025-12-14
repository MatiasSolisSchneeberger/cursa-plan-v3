export default function CardBody({children, className}: {children: React.ReactNode; className?: string}) {
	return <main className={`h-min w-full ${className}`}>{children}</main>
}
