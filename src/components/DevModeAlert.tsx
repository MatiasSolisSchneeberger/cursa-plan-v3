import { useEffect, useState } from "react";
import Alert from "@/components/Alert";
import { IconCode } from "@tabler/icons-react";

export default function DevModeAlert() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const hasSeenAlert = localStorage.getItem("hasSeenDevAlert");
		if (!hasSeenAlert) {
			setIsVisible(true);
		}
	}, []);

	const handleClose = () => {
		localStorage.setItem("hasSeenDevAlert", "true");
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div className="pointer-events-none fixed right-0 bottom-4 left-0 z-50 flex justify-center px-4 md:right-4 md:left-auto md:justify-end md:px-0">
			<Alert
				color="warning"
				icon={<IconCode />}
				title="Sitio en Desarrollo"
				description="Bienvenido a Cursa Plan. Tené en cuenta que algunas secciones están en construcción y pueden no funcionar correctamente."
				onClose={handleClose}
				className="pointer-events-auto w-full max-w-sm shadow-xl"
			/>
		</div>
	);
}
