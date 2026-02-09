import Card from "../../components/Card"
import CardBody from "../../components/CardBody"
import CardHeader from "../../components/CardHeader"
import WorkInProgress from "../../components/WorkInProgress"

export default function RecursosTab({titulo, filtroActivo}: {titulo: string; filtroActivo?: string}) {
	return (
		<Card>
			<CardHeader color="secondary" className="col-span-full h-min">
				{titulo} - {filtroActivo}
			</CardHeader>
			<CardBody>
				<WorkInProgress moreDescription="En esta sección van a ir todos los parciales que manden los usuarios." />
			</CardBody>
		</Card>
	)
}
