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

export default function IconCarrera({icon}: {icon: string}) {
	switch (icon) {
		case "microscope":
			return <IconMicroscope />
		case "ruler-2":
			return <IconRuler2 />
		case "bolt":
			return <IconBolt />
		case "robot":
			return <IconRobot />
		case "seedling":
			return <IconSeedling />
		case "atom":
			return <IconAtom />
		case "flask":
			return <IconFlask />
		case "math":
			return <IconMath />
		case "device-imac":
			return <IconDeviceImac />
		case "butterfly":
			return <IconButterfly />
		case "telescope":
			return <IconTelescope />
		case "ruler":
			return <IconRuler />
		case "test-pipe":
			return <IconTestPipe />
		default:
			return <IconMicroscope />
	}
}
