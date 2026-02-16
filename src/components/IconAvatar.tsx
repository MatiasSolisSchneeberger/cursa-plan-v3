import {
	IconAlien,
	IconAtom,
	IconBook,
	IconBriefcase,
	IconBulb,
	IconCalculator,
	IconCode,
	IconCoffee,
	IconCpu,
	IconDna,
	IconFlame,
	IconFlask,
	IconGhost,
	IconHeadphones,
	IconMoodCrazyHappy,
	IconMoodHappy,
	IconMoodNerd,
	IconMoodSmile,
	IconPlanet,
	IconRobot,
	IconRocket,
	IconTrophy,
} from "@tabler/icons-react"

export default function IconAvatar({icon}: {icon: string}) {
	switch (icon) {
		case "mood-nerd":
			return <IconMoodNerd />
		case "mood-smile":
			return <IconMoodSmile />
		case "mood-happy":
			return <IconMoodHappy />
		case "mood-crazy-happy":
			return <IconMoodCrazyHappy />
		case "ghost":
			return <IconGhost />
		case "robot":
			return <IconRobot />
		case "alien":
			return <IconAlien />
		case "code":
			return <IconCode />
		case "flask":
			return <IconFlask />
		case "calculator":
			return <IconCalculator />
		case "dna":
			return <IconDna />
		case "atom":
			return <IconAtom />
		case "cpu":
			return <IconCpu />
		case "briefcase":
			return <IconBriefcase />
		case "bulb":
			return <IconBulb />
		case "book":
			return <IconBook />
		case "coffee":
			return <IconCoffee />
		case "headphones":
			return <IconHeadphones />
		case "rocket":
			return <IconRocket />
		case "trophy":
			return <IconTrophy />
		case "flame":
			return <IconFlame />
		case "planet":
			return <IconPlanet />
		default:
			throw new ErrorEvent("Icono no encontrado")
	}
}
