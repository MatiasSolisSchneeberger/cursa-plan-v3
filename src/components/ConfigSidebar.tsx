import { useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import MenuGroup from "@/components/MenuGroup";
import MenuItem from "@/components/MenuItem";
import Menu from "@/components/Menu";
import Dropdown from "@/components/Dropdown";
import DropdownTrigger from "@/components/DropdownTrigger";
import DropdownContent from "@/components/DropdownContent";
import type { TabConfig } from "@/types/config";
import {
	IconArrowLeft,
	IconChevronDown,
	IconChevronRight,
} from "@tabler/icons-react";
import Button from "@/components/Button";

interface Props {
	title: string;
	tabs: TabConfig[];
	activeTab: string;
	onTabChange: (id: string) => void;
	backLink?: string; // Made optional effectively, though primarily we use history back
}

export default function ConfigSidebar({
	title,
	tabs,
	activeTab,
	onTabChange,
}: Props) {
	const navigate = useNavigate();

	const SidebarContent = (
		<>
			{/* Botón Volver (Dinámico) */}
			<MenuGroup>
				<MenuItem
					onClick={() => navigate(-1)}
					iconLeft={
						<IconArrowLeft className="text-primary-600 dark:text-primary-400" />
					}
					canHover
				>
					<span className="text-primary-600 dark:text-primary-400">
						Volver
					</span>
				</MenuItem>
			</MenuGroup>

			{/* Lista de Pestañas Dinámicas */}
			<MenuGroup>
				{tabs.map((tab) => (
					<SidebarItem
						key={tab.id}
						tab={tab}
						isActive={activeTab === tab.id}
						onTabChange={onTabChange}
						activeTab={activeTab} // Pasamos el ID activo global para resaltar hijos
					/>
				))}
			</MenuGroup>
		</>
	);

	return (
		<>
			{/* Renderizado Movil (Dropdown) */}
			<Dropdown
				className="mb-4 w-full md:hidden"
				key={`mobile-menu-${activeTab}`}
			>
				<DropdownTrigger>
					<CardHeader
						color="secondary"
						className="flex items-center justify-between gap-2"
					>
						<Button color="secondary" variant="outlined" isIconOnly>
							<IconChevronDown size={20} />
						</Button>
						<span className="flex w-full items-center justify-center">
							{title}
						</span>
					</CardHeader>
				</DropdownTrigger>
				<DropdownContent>
					<Menu className="w-[90vw] max-w-sm">{SidebarContent}</Menu>
				</DropdownContent>
			</Dropdown>

			{/* Renderizado Desktop (Sidebar normal) */}
			<Card className="relative z-20 hidden h-full md:block">
				<CardHeader color="secondary">{title}</CardHeader>

				{/* overflow-visible es CRUCIAL para que el menú flotante no se corte */}
				<CardBody className="h-full overflow-visible p-0">
					{SidebarContent}
				</CardBody>
			</Card>
		</>
	);
}

// --- SUB-COMPONENTE PARA CADA ITEM ---
function SidebarItem({
	tab,
	isActive,
	onTabChange,
	activeTab,
}: {
	tab: TabConfig;
	isActive: boolean;
	onTabChange: (id: string) => void;
	activeTab: string;
}) {
	// Si NO tiene subitems, renderizamos un item normal
	if (!tab.subItems) {
		return (
			<MenuItem
				onClick={() => onTabChange(tab.id)}
				iconLeft={tab.icon}
				isActive={isActive}
				canHover={!isActive}
			>
				{tab.label}
			</MenuItem>
		);
	}

	// Si TIENE subitems, usamos Dropdown para que funcionen como menús anidados
	// Tanto en mobile como desktop
	const isChildActive = tab.subItems.some((sub) => sub.id === activeTab);
	const isParentActive = isActive || isChildActive;

	return (
		<Dropdown
			className="block w-full"
			key={`item-menu-${tab.id}-${activeTab}`}
		>
			<DropdownTrigger>
				<MenuItem
					iconLeft={tab.icon}
					iconRight={<IconChevronRight />}
					isActive={isParentActive}
					canHover={!isParentActive}
				>
					{tab.label}
				</MenuItem>
			</DropdownTrigger>

			<DropdownContent>
				<Menu>
					<MenuGroup title={`Opciones de ${tab.label}`}>
						{tab.subItems.map((sub) => {
							const isSubActive = activeTab === sub.id;
							return (
								<MenuItem
									key={sub.id}
									onClick={() => onTabChange(sub.id)}
									isActive={isSubActive}
									canHover={!isSubActive}
								>
									{sub.label}
								</MenuItem>
							);
						})}
					</MenuGroup>
				</Menu>
			</DropdownContent>
		</Dropdown>
	);
}
