import ButtonGroup from "../components/ButtonGroup"
import PageHeader from "../components/PageHeader"
import {Tabs, TabsContent, TabsTrigger} from "../components/Tabs"
import CarrerasFav from "../sections/CarrerasFav"
import ListadoCarreras from "../sections/ListadoCarreras"

export default function Explorar() {
	return (
		<section className="flex flex-col gap-6">
			<PageHeader title="Carreras" backUrl="/" />
			<Tabs>
				<ButtonGroup>
					<TabsTrigger value="favoritas">Favoritas</TabsTrigger>
					<TabsTrigger value="todas">Todas</TabsTrigger>
				</ButtonGroup>
				<TabsContent value="favoritas">
					<CarrerasFav />
				</TabsContent>
				<TabsContent value="todas">
					<ListadoCarreras />
				</TabsContent>
			</Tabs>
		</section>
	)
}
