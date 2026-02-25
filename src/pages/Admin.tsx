import { useSearchParams } from "react-router-dom";
import { IconFile } from "@tabler/icons-react";
import ConfigLayout from "@/layout/ConfigLayout";
import { useAuth } from "@/context/AuthContextData";
import MainTab from "@/sections/admin/MainTab";
import MensajesTab from "@/sections/admin/MensajesTab";
import type { TabConfig } from "@/types/config";

export default function Admin() {
	const { loading } = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const tabParam = searchParams.get("tab");
	const activeTab = tabParam || "main";

	if (loading) {
		return <div>Cargando...</div>;
	}

	const handleTabChange = (id: string) => {
		setSearchParams({ tab: id }, { replace: true });
	};

	const adminTabs: TabConfig[] = [
		{
			id: "main",
			label: "Principal",
			icon: <IconFile />,
			component: <MainTab adminData={{}} />,
		},
		{
			id: "mensajes",
			label: "Mensajes",
			icon: <IconFile />,
			component: <MensajesTab adminData={{}} />,
		},
	];

	const renderContent = () => {
		const parentTab = adminTabs.find((t) => t.id === activeTab);
		if (parentTab) return parentTab.component;

		for (const tab of adminTabs) {
			const subItem = tab.subItems?.find((sub) => sub.id === activeTab);
			if (subItem?.component) {
				return subItem.component;
			}
		}
		return <div>Sección no encontrada</div>;
	};

	return (
		<ConfigLayout
			title="Admin"
			tabs={adminTabs}
			activeTab={activeTab}
			onTabChange={handleTabChange}
		>
			{renderContent()}
		</ConfigLayout>
	);
}
