import Button from "../components/Button"

export default function NotFound() {
	return (
		<section className="flex h-screen w-screen items-center justify-center">
			<h1 className="texto-headline">404</h1>
			<p className="texto-label">Página no encontrada</p>
			<Button variant="solid" color="primary" href="/">
				Volver al inicio
			</Button>
		</section>
	)
}
