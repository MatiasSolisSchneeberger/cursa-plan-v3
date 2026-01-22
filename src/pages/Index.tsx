import CarrerasFav from "../sections/CarrerasFav"
import HeroSection from "../sections/HeroSection"
import ListadoCarreras from "../sections/ListadoCarreras"

export function Index() {
	return (
		<section className="w-full min-h-screen flex flex-col items-center gap-12">
			<HeroSection />
			<CarrerasFav />
			<ListadoCarreras />
		</section>
	)
}
