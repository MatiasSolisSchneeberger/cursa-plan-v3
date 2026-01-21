import Button from "../components/Button"

export default function NotFound() {
	return (
		<section className="flex h-[calc(100vh-12rem)] items-center justify-center flex-col gap-4">
			<h1 className="texto-display">404</h1>
			<p className="texto-headline">Parece que no existe la pagina, prueva volviendo al inicio.</p>
			<Button variant="solid" color="primary" href="/">
				Volver al inicio
			</Button>
		</section>
	)
}
