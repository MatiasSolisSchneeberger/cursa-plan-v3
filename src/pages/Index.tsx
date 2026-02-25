import BentoGrid from "@/sections/BentoGrid";
import CarruselCarreras from "@/sections/CarruselCarreras";
import HeroSection from "@/sections/HeroSection";

export function Index() {
	return (
		<section className="flex min-h-screen w-full flex-col items-center gap-12">
			<HeroSection />
			<BentoGrid />
			<CarruselCarreras />
		</section>
	);
}
