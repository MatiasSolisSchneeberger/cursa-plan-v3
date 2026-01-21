import Card from "../../../components/Card"
import CardBody from "../../../components/CardBody"
import CardHeader from "../../../components/CardHeader"
import CardInfoList from "../../../components/CardInfoList"
import MenuGroup from "../../../components/MenuGroup"
import MenuItem from "../../../components/MenuItem"

interface Props {
	materiaData: any
}

export const InfoTab = ({materiaData}: Props) => {
	return (
		<Card className="grid grid-cols-subgrid col-span-4 md:col-span-5 xl:col-span-9">
			<CardHeader color="secondary" className="col-span-full h-min">
				Información
			</CardHeader>
			<CardBody className="grid grid-cols-subgrid gap-3 col-span-4 md:col-span-5 xl:col-span-9">
				<CardInfoList title="Información" className="col-span-4 md:col-span-5 xl:col-span-3" color="secondary">
					<MenuGroup>
						<MenuItem>{materiaData.materias.nombre}</MenuItem>
						<MenuItem>{materiaData.plan_estudio.anio_inicio}</MenuItem>
						<MenuItem>{materiaData.plan_estudio.carreras.nombre}</MenuItem>
					</MenuGroup>
				</CardInfoList>
				<CardInfoList title="Información" className="col-span-4 md:col-span-5 xl:col-span-3" color="secondary">
					<MenuGroup>
						<MenuItem>{materiaData.materias.nombre}</MenuItem>
						<MenuItem>{materiaData.plan_estudio.anio_inicio}</MenuItem>
						<MenuItem>{materiaData.plan_estudio.carreras.nombre}</MenuItem>
					</MenuGroup>
				</CardInfoList>
				<CardInfoList title="Información" className="col-span-4 md:col-span-5 xl:col-span-3" color="secondary">
					<MenuGroup>
						<MenuItem>{materiaData.materias.nombre}</MenuItem>
						<MenuItem>{materiaData.plan_estudio.anio_inicio}</MenuItem>
						<MenuItem>{materiaData.plan_estudio.carreras.nombre}</MenuItem>
					</MenuGroup>
				</CardInfoList>
			</CardBody>
		</Card>
	)
}
