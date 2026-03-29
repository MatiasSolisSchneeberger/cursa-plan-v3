import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconLock, IconUser } from "@tabler/icons-react";
import GeneralTab from "@/sections/Config/GeneralTab";
import SeguridadTab from "@/sections/Config/SeguridadTab";
import PageLayout from "@/layout/PageLayout";
import { TypographyH1 } from "@/components/ui/Typography";

export default function Config() {
	return (
		<PageLayout
			breadcrumbs={[
				{ url: "/", isHome: true },
				{ label: "Configuración", url: "/config", isCurrentPage: true },
			]}
		>
			<TypographyH1>Configuración</TypographyH1>

			<Tabs defaultValue="general">
				{/* --- NAVEGACIÓN DE TABS --- */}
				<div className="mb-6 flex justify-start md:justify-center">
					<TabsList className="grid w-full max-w-[400px] grid-cols-2">
						<TabsTrigger value="general" className="gap-2">
							<IconUser size={18} /> General
						</TabsTrigger>
						<TabsTrigger value="seguridad" className="gap-2">
							<IconLock size={18} /> Seguridad
						</TabsTrigger>
					</TabsList>
				</div>

				<GeneralTab />
				<SeguridadTab />
			</Tabs>
		</PageLayout>
	);
}
