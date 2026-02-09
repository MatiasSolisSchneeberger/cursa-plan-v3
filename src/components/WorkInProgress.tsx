import {IconCrane} from "@tabler/icons-react"
import Alert from "./Alert"

export default function WorkInProgress({moreDescription}: {moreDescription?: string}) {
	return (
		<Alert
			color="warning"
			icon={<IconCrane />}
			title="Sección en Construcción"
			description={
				<span>
					Estoy trabajando duro para traerte esta funcionalidad pronto. ¡Gracias por la paciencia!
					{moreDescription && <br />}
					{moreDescription}
				</span>
			}
			canClose={false}
		/>
	)
}
