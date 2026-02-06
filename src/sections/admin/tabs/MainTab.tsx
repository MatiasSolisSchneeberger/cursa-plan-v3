import Card from "../../../components/Card"
import CardBody from "../../../components/CardBody"
import CardHeader from "../../../components/CardHeader"
import CardInfoList from "../../../components/CardInfoList"
import Chip from "../../../components/Chip"
import MenuGroup from "../../../components/MenuGroup"
import MenuItem from "../../../components/MenuItem"
import type {AdminData} from "../../../types/admin"

interface Props {
	adminData: AdminData
}

export default function MainTab({adminData}: Props) {
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
