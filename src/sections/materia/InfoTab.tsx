import WorkInProgress from "@/components/WorkInProgress";
import { TypographyH3 } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const InfoTab = () => {
	return (
		<section className="flex flex-col gap-3 md:flex-row">
			<Card className="w-full">
				<CardHeader>
					<TypographyH3>Resumen del Programa</TypographyH3>
				</CardHeader>
				<CardContent>
					<WorkInProgress />
				</CardContent>
			</Card>
			<Card className="w-full">
				<CardHeader>
					<TypographyH3>Profesores</TypographyH3>
				</CardHeader>
				<CardContent>
					<WorkInProgress />
				</CardContent>
			</Card>
		</section>
	);
};
