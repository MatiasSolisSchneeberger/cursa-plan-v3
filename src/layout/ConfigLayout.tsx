import ConfigSidebar from "../components/ConfigSidebar"
import type {TabConfig} from "../types/config"

interface Props {
	title: string
	tabs: TabConfig[]
	activeTab: string
	onTabChange: (id: string) => void
	backLink: string
	children: React.ReactNode
}

export default function ConfigLayout({title, tabs, activeTab, onTabChange, backLink, children}: Props) {
	return (
		<section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-6 relative ">
			{/* Izquierda */}
			<div className="col-span-4 md:col-span-3">
				<ConfigSidebar title={title} tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} backLink={backLink} />
			</div>

			{/* Derecha */}
			<div className="col-span-4 md:col-span-5 xl:col-span-9 grid grid-cols-subgrid gap-4">{children}</div>
		</section>
	)
}
