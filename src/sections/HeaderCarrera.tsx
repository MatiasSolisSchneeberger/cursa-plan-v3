import PlanSelector from "./PlanSelector";
import OrientacionSelector from "./OrientacionSelector";
import LikeButton from "../components/LikeButton";
import type { PlanJSON } from "../types/db";
import PageHeader from "../components/PageHeader";

interface HeaderCarreraProps {
	name: string;
	icon: string;
	planes: PlanJSON[];
	currentPlanAnio: number;
	onPlanSelect: (anio: number) => void;
	plan: PlanJSON;
	currentOrientacionSlug: string | null;
	onOrientacionSelect: (slug: string) => void;
	planId: number;
}

export default function HeaderCarrera({
	name,
	planes,
	currentPlanAnio,
	onPlanSelect,
	plan,
	currentOrientacionSlug,
	onOrientacionSelect,
	planId,
}: HeaderCarreraProps) {
	return (
		<PageHeader
			backUrl="/"
			title={
				<>
					<h1 className="texto-title block md:hidden">
						{name
							.replace("Licenciatura", "Lic.")
							.replace("Ingeniería", "Ing.")
							.replace("Profesorado", "Prof.")}
					</h1>
					<h1 className="texto-headline hidden md:block">{name}</h1>
				</>
			}
		>
			<PlanSelector
				planes={planes}
				currentPlanAnio={currentPlanAnio}
				onSelect={onPlanSelect}
				showTitle={true}
			/>

			<OrientacionSelector
				plan={plan}
				currentOrientacionSlug={currentOrientacionSlug}
				onSelect={onOrientacionSelect}
				showTitle={false}
			/>

			{/* boton de like */}
			<LikeButton planId={planId} />
		</PageHeader>
	);
}
