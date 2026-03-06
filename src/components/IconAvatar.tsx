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
} from "@tabler/icons-react";

export default function IconAvatar({
	icon,
	className,
	size = 20,
}: {
	icon: string;
	className?: string;
	size?: number;
}) {
	switch (icon) {
		case "mood-nerd":
			return <IconMoodNerd className={className} size={size} />;
		case "mood-smile":
			return <IconMoodSmile className={className} size={size} />;
		case "mood-happy":
			return <IconMoodHappy className={className} size={size} />;
		case "mood-crazy-happy":
			return <IconMoodCrazyHappy className={className} size={size} />;
		case "ghost":
			return <IconGhost className={className} size={size} />;
		case "robot":
			return <IconRobot className={className} size={size} />;
		case "alien":
			return <IconAlien className={className} size={size} />;
		case "code":
			return <IconCode className={className} size={size} />;
		case "flask":
			return <IconFlask className={className} size={size} />;
		case "calculator":
			return <IconCalculator className={className} size={size} />;
		case "dna":
			return <IconDna className={className} size={size} />;
		case "atom":
			return <IconAtom className={className} size={size} />;
		case "cpu":
			return <IconCpu className={className} size={size} />;
		case "briefcase":
			return <IconBriefcase className={className} size={size} />;
		case "bulb":
			return <IconBulb className={className} size={size} />;
		case "book":
			return <IconBook className={className} size={size} />;
		case "coffee":
			return <IconCoffee className={className} size={size} />;
		case "headphones":
			return <IconHeadphones className={className} size={size} />;
		case "rocket":
			return <IconRocket className={className} size={size} />;
		case "trophy":
			return <IconTrophy className={className} size={size} />;
		case "flame":
			return <IconFlame className={className} size={size} />;
		case "planet":
			return <IconPlanet className={className} size={size} />;
		default:
			throw new ErrorEvent("Icono no encontrado");
	}
}
