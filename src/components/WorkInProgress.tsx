import { IconAlertTriangle } from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Separator } from "./ui/separator";

export default function WorkInProgress({
	description = "Estoy trabajando duro para traerte esta funcionalidad pronto. ¡Gracias por la paciencia!",
	moreDescription,
}: {
	description?: string;
	moreDescription?: string;
}) {
	return (
		<Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
			<IconAlertTriangle />
			<AlertTitle>Sección en Construcción</AlertTitle>
			<AlertDescription>
				{description}
				{moreDescription && <Separator />}
				{moreDescription}
			</AlertDescription>
		</Alert>
	);
}
