import {Link} from "react-router-dom"
import Card from "../../../components/Card"
import CardBody from "../../../components/CardBody"
import CardHeader from "../../../components/CardHeader"
import WorkInProgress from "../../../components/WorkInProgress"

export default function Practicos() {
	return (
		<section className="grid grid-cols-4 md:grid-cols-12 gap-3">
			<span className="col-span-full">
				<WorkInProgress moreDescription="Los usuarios podran enviar modelos de parciales" />
			</span>
			<Card className="col-span-4 md:col-span-6">
				<CardHeader>Imagenes</CardHeader>
				<CardBody>
					<p className="texto-body text-text-700 dark:text-text-300">
						Estos son los parciales practicos enviado por los usuarios. Si tenes parciales practicos podes enviarlos
						para que otros usuarios puedan verlos.
					</p>
				</CardBody>
			</Card>
			<Card className="col-span-4 md:col-span-6">
				<CardHeader>Version Doc</CardHeader>
				<CardBody>
					<p className="texto-body text-text-700 dark:text-text-300">
						Estos parciales fueron pasado a texto más para que sea mas legible. Si ves que hay errores podes avisar.
					</p>
					<p className="texto-body text-text-700 dark:text-text-300">
						Los parciales están escrito con en Markdown. Si querés podés colaborar con la transcripción de los
						parciales, mandá un mensaje en{" "}
						<Link to="/contacto" className="text-primary-700 dark:text-primary-300">
							Contacto
						</Link>
						.
					</p>
				</CardBody>
			</Card>
		</section>
	)
}
