import Card from "../../../components/Card"
import CardBody from "../../../components/CardBody"
import CardHeader from "../../../components/CardHeader"

export default function RecursosTab({titulo, filtroActivo}: {titulo: string; filtroActivo?: string}) {
	return (
		<Card className="grid grid-cols-subgrid col-span-4 md:col-span-5 xl:col-span-9">
			<CardHeader color="secondary" className="col-span-full h-min">
				{titulo} - {filtroActivo}
			</CardHeader>
			<CardBody className="grid grid-cols-subgrid gap-3 col-span-4 md:col-span-5 xl:col-span-9">
				{Array.from({length: 5}).map((_, index) => (
					<span key={index} className="aspect-video col-span-2 md:col-span-5 xl:col-span-3 bg-gray-200">
						Imagen
					</span>
				))}
			</CardBody>
		</Card>
	)
}
