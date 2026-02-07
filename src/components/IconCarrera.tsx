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
	IconRuler,
	IconTestPipe,
	IconPrismLight,
	IconFlask2Filled,
	IconBook2,
} from "@tabler/icons-react"

export default function IconCarrera({icon, className, size}: {icon: string; className?: string; size?: number}) {
	switch (icon) {
		case "microscope":
			return <IconMicroscope size={size} className={className} />
		case "ruler-2":
			return <IconRuler2 size={size} className={className} />
		case "bolt":
			return <IconBolt size={size} className={className} />
		case "robot":
			return <IconRobot size={size} className={className} />
		case "seedling":
			return <IconSeedling size={size} className={className} />
		case "atom":
			return <IconAtom size={size} className={className} />
		case "flask":
			return <IconFlask size={size} className={className} />
		case "math":
			return <IconMath size={size} className={className} />
		case "device-imac":
			return <IconDeviceImac size={size} className={className} />
		case "butterfly":
			return <IconButterfly size={size} className={className} />
		case "telescope":
			return <IconPrismLight size={size} className={className} />
		case "ruler":
			return <IconRuler size={size} className={className} />
		case "test-pipe":
			return <IconTestPipe size={size} className={className} />
		case "flask-2-filled":
			return <IconFlask2Filled size={size} className={className} />
		default:
			return <IconBook2 size={size} className={className} />
	}
}
