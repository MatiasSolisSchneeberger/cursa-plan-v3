export default function CardFooter({children, className}: {children: React.ReactNode; className?: string}) {
	return <footer className={`h-min w-full rounded-xl ${className}`}>{children}</footer>
}
