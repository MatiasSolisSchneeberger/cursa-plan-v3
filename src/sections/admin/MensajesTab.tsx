import type {AdminData} from "../../types/admin"

interface Props {
	adminData: AdminData
}

export default function MensajesTab({adminData: _adminData}: Props) {
	return (
		<div>
			<h1>Mensajes Tab</h1>
		</div>
	)
}
