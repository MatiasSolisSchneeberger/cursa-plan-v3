import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import WorkInProgress from "@/components/WorkInProgress";

export default function Finales() {
	return (
		<section className="grid grid-cols-4 gap-3 md:grid-cols-12">
			<span className="col-span-full">
				<WorkInProgress moreDescription="Los usuarios podran enviar modelos de parciales" />
			</span>
			<Card className="col-span-4 md:col-span-6">
				<CardHeader>Imagenes</CardHeader>
				<CardBody>
					<p className="texto-body text-text-700 dark:text-text-300">
						Estos son los parciales finales enviado por los
						usuarios. Si tenes parciales finales podes enviarlos
						para que otros usuarios puedan verlos.
					</p>
				</CardBody>
			</Card>
			<Card className="col-span-4 md:col-span-6">
				<CardHeader>Version Doc</CardHeader>
				<CardBody>
					<p className="texto-body text-text-700 dark:text-text-300">
						Estos parciales fueron pasado a texto más para que sea
						mas legible. Si ves que hay errores podes avisar.
					</p>
					<p className="texto-body text-text-700 dark:text-text-300">
						Los parciales están escrito con en Markdown, si sabés y
						querés, podés transcribir de las imagenes a Markdown
						para que sea más fácil de leer.
					</p>
				</CardBody>
			</Card>
		</section>
	);
}
