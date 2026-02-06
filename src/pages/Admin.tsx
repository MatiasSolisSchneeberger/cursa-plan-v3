import {useSearchParams} from "react-router-dom"
import ConfigLayout from "../layout/ConfigLayout"
import {useAuth} from "../context/AuthContextData"
import {getAdminTabs} from "../sections/admin/adminConfig"

export default function Admin() {
	const {loading} = useAuth()
	const [searchParams, setSearchParams] = useSearchParams()
	const tabParam = searchParams.get("tab")

	if (loading) {
		return <div>Cargando...</div>
	}
	const activeTab = tabParam || "main"

	const handleTabChange = (id: string) => {
		setSearchParams({tab: id}, {replace: true})
	}

	const renderContent = () => {
		const tabsConfig = getAdminTabs({})
		const parentTab = tabsConfig.find((t) => t.id === activeTab)
		if (parentTab) return parentTab.component

		for (const tab of tabsConfig) {
			const subItem = tab.subItems?.find((sub) => sub.id === activeTab)
			if (subItem?.component) {
				return subItem.component
			}
		}
		return <div>Sección no encontrada</div>
	}

	return (
		<ConfigLayout title="Admin" tabs={getAdminTabs({})} activeTab={activeTab} onTabChange={handleTabChange}>
			{renderContent()}
		</ConfigLayout>
	)
}
