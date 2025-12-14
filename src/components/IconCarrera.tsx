import {
	IconMicroscope,
	IconRuler2,
	IconBolt,
	IconRobot,
	IconSeedling,
	IconAtom,
	IconFlask,
	IconMath,
	IconDeviceImac,
	IconButterfly,
	IconTelescope,
	IconRuler,
	IconTestPipe,
} from "@tabler/icons-react"

export default function IconCarrera({icon, className}: {icon: string; className?: string}) {
	switch (icon) {
		case "microscope":
			return <IconMicroscope className={className} />
		case "ruler-2":
			return <IconRuler2 className={className} />
		case "bolt":
			return <IconBolt className={className} />
		case "robot":
			return <IconRobot className={className} />
		case "seedling":
			return <IconSeedling className={className} />
		case "atom":
			return <IconAtom className={className} />
		case "flask":
			return <IconFlask className={className} />
		case "math":
			return <IconMath className={className} />
		case "device-imac":
			return <IconDeviceImac className={className} />
		case "butterfly":
			return <IconButterfly className={className} />
		case "telescope":
			return <IconTelescope className={className} />
		case "ruler":
			return <IconRuler className={className} />
		case "test-pipe":
			return <IconTestPipe className={className} />
		default:
			return <IconMicroscope className={className} />
	}
}
