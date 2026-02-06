import {IconFile} from "@tabler/icons-react"
import type {TabConfig} from "../../types/config"
import type {AdminData} from "../../types/admin"
import MainTab from "./tabs/MainTab"
import MensajesTab from "./tabs/MensajesTab"

export const getAdminTabs = (adminData: AdminData): TabConfig[] => {
	return [
		{
			id: "main",
			label: "Principal",
			icon: <IconFile />,
			component: <MainTab adminData={adminData} />,
		},
		{
			id: "mensajes",
			label: "Mensajes",
			icon: <IconFile />,
			component: <MensajesTab adminData={adminData} />,
		},
	]
}
