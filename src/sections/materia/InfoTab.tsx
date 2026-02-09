import CorrelativasList from "../../components/CorrelativasList"
import Card from "../../components/Card"
import CardBody from "../../components/CardBody"
import CardHeader from "../../components/CardHeader"
import WorkInProgress from "../../components/WorkInProgress"

interface Props {
	materiaData: any
}

export const InfoTab = ({materiaData}: Props) => {
	return (
		<section className="grid grid-cols-4  lg:grid-cols-12 gap-3">
			<Card className="col-span-4">
				<CardHeader color="primary">Resumen del Programa</CardHeader>
				<CardBody>
					<WorkInProgress />
				</CardBody>
			</Card>
			<Card className="col-span-4">
				<CardHeader color="primary">Profesores</CardHeader>
				<CardBody>
					<WorkInProgress />
				</CardBody>
			</Card>
			<Card className="col-span-4">
				<CardHeader color="primary">Correlativas</CardHeader>
				<CardBody>
					{materiaData.correlativas && materiaData.correlativas.length > 0 ?
						<CorrelativasList correlativas={materiaData.correlativas} />
					:	<span className="texto-label w-full text-center text-text-700 dark:text-text-300">
							Esta materia no tiene correlativas
						</span>
					}
				</CardBody>
			</Card>
		</section>
	)
}
