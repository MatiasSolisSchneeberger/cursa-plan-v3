import { Button } from "../components/ui/button";

export default function NotFound() {
	return (
		<section className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center gap-4">
			<h1 className="texto-display">404</h1>
			<p className="texto-headline">
				Parece que no existe la pagina, prueva volviendo al inicio.
			</p>
			<Button>Volver al inicio</Button>
		</section>
	);
}
