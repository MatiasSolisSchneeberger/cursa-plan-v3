// src/pages/Profile.tsx
import {IconBook, IconInfoCircle, IconSettings} from "@tabler/icons-react"
import {useAuth} from "../context/AuthContextData"
import PageHeader from "../components/PageHeader"
import {Tabs, TabsTrigger, TabsContent} from "../components/Tabs"
import ButtonGroup from "../components/ButtonGroup"
import {PerfilTab} from "../sections/perfil/PerfilTab"
import Button from "../components/Button"
import ToolTip from "../components/ToolTip"
import Cursos from "../sections/perfil/Cursos"

export default function Profile() {
	const {loading, session} = useAuth()

	if (loading) {
		return <div>Cargando...</div>
	}

	const user = session?.user?.user_metadata

	// Obtener el nombre del usuario
	const fullName = user?.full_name
	const userName = user?.username

	interface TabItem {
		id: string
		label: string
		icon: React.ReactNode
		content: React.ReactNode
		default?: boolean
	}

	const tabsConfig: TabItem[] = [
		{
			id: "info",
			label: "Información",
			icon: <IconInfoCircle />,
			content: <PerfilTab />,
			default: true,
		},
		{
			id: "cursos",
			label: "Cursos",
			icon: <IconBook />,
			content: <Cursos />,
		},
	]

	return (
		<section className="flex flex-col gap-3">
			<PageHeader
				title={
					<>
						<h1 className="texto-title block md:hidden text-primary-600 dark:text-primary-400 w-full text-start">
							{fullName} | @{userName}
						</h1>
						<h1 className="texto-headline hidden md:block text-primary-600 dark:text-primary-400 w-full text-start">
							{fullName} | @{userName}
						</h1>
					</>
				}
				backUrl="/">
				<ToolTip tooltip="En construcción">
					<Button variant="outlined" color="secondary" disabled iconLeft={<IconSettings />}>
						Configuración
					</Button>
				</ToolTip>
			</PageHeader>

			{/* CONTENIDO PRINCIPAL: Sistema de Pestañas */}
			<Tabs defaultValue={tabsConfig.find((t) => t.default)?.id || tabsConfig[0].id}>
				<ButtonGroup>
					{tabsConfig.map((tab) => (
						<TabsTrigger key={tab.id} value={tab.id} iconLeft={tab.icon}>
							{tab.label}
						</TabsTrigger>
					))}
				</ButtonGroup>

				{tabsConfig.map((tab) => (
					<TabsContent key={tab.id} value={tab.id}>
						{tab.content}
					</TabsContent>
				))}
			</Tabs>
		</section>
	)
}
