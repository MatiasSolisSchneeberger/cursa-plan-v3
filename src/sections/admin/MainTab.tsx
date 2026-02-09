import Card from "../../components/Card"
import CardBody from "../../components/CardBody"
import CardHeader from "../../components/CardHeader"
import Chip from "../../components/Chip"
import type {AdminData} from "../../types/admin"

interface Props {
	adminData: AdminData
}

export default function MainTab({adminData: _adminData}: Props) {
	return (
		<Card className="grid grid-cols-subgrid col-span-4 md:col-span-5 xl:col-span-9">
			<CardHeader color="warning" className="col-span-full h-min">
				Mensajes
			</CardHeader>
			<CardBody className="grid grid-cols-subgrid col-span-full">
				<Card className="col-span-4 md:col-span-5 xl:col-span-3">
					<CardHeader color="tertiary">Nombre</CardHeader>
					<CardBody>
						<Chip>Categoría</Chip>
					</CardBody>
				</Card>
			</CardBody>
		</Card>
	)
}
