// src/pages/Profile.tsx
import { IconBook, IconInfoCircle, IconSettings } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContextData";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsTrigger, TabsContent } from "@/components/Tabs";
import ButtonGroup from "@/components/ButtonGroup";
import { PerfilTab } from "@/sections/perfil/PerfilTab";
import Button from "@/components/Button";
import Cursos from "@/sections/perfil/Cursos";
import Avatar from "@/components/Avatar";
import Cargando from "@/sections/Cargando";

export default function Profile() {
	const { loading, userProfile } = useAuth();

	if (loading) {
		return <Cargando />;
	}

	// Obtener el nombre del usuario
	const fullName = userProfile?.full_name;
	const userName = userProfile?.username;
	const icon = userProfile?.icon;

	interface TabItem {
		id: string;
		label: string;
		icon: React.ReactNode;
		content: React.ReactNode;
		default?: boolean;
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
	];

	return (
		<section className="flex flex-col gap-3">
			<PageHeader
				title={
					<div className="flex items-center gap-3">
						<Avatar
							color="primary"
							name={fullName}
							icon={icon}
							size="lg"
							className="text-2xl"
						/>
						<div>
							<h1 className="texto-title text-primary-600 dark:text-primary-400 block w-full text-start md:hidden">
								{fullName} | @{userName}
							</h1>
							<h1 className="texto-headline text-primary-600 dark:text-primary-400 hidden w-full text-start md:block">
								{fullName} | @{userName}
							</h1>
						</div>
					</div>
				}
				backUrl="/"
			>
				<Button
					variant="outlined"
					color="secondary"
					iconLeft={<IconSettings />}
					href="/config"
				>
					Configuración
				</Button>
			</PageHeader>

			{/* CONTENIDO PRINCIPAL: Sistema de Pestañas */}
			<Tabs
				defaultValue={
					tabsConfig.find((t) => t.default)?.id || tabsConfig[0].id
				}
			>
				<ButtonGroup>
					{tabsConfig.map((tab) => (
						<TabsTrigger
							key={tab.id}
							value={tab.id}
							iconLeft={tab.icon}
						>
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
	);
}
