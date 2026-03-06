import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import BentoGrid from "../sections/BentoGrid";
import CarruselCarreras from "../sections/CarruselCarreras";
import HeroSection from "../sections/HeroSection";

export function Index() {
	return (
		<section className="flex min-h-screen w-full flex-col items-center gap-12">
			<HeroSection />
			<BentoGrid />
			<CarruselCarreras />
		</section>
	);
}
