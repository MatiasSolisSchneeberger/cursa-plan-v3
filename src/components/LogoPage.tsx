import { IconSchool } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoPage() {
	const [isExpanded, setIsExpanded] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			// 1. Aumentamos el umbral a 350px (antes 150)
			const scrollY = window.scrollY;
			const isMobile = window.innerWidth < 768; // Breakpoint 'md' de Tailwind

			// Si es escritorio, SIEMPRE expandido.
			// Si es móvil, depende del scroll.
			if (!isMobile) {
				setIsExpanded(true);
			} else {
				setIsExpanded(scrollY < 350);
			}
		};

		// Ejecutamos al inicio y al hacer scroll/resize
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	return (
		<Link
			to="/"
			id="logo"
			className="bg-primary text-primary-foreground dark:bg-primary-600 dark:text-primary-50 relative flex h-min shrink-0 flex-row items-center justify-center gap-2.5 self-stretch overflow-hidden rounded-2xl py-2.5 pr-3 pl-2.5"
		>
			{/* layout prop ayuda a que el icono se mueva suavemente cuando el texto desaparece */}
			<motion.div
				layout
				transition={{ type: "spring", stiffness: 700, damping: 30 }}
			>
				<IconSchool size="22" />
			</motion.div>

			<AnimatePresence>
				{isExpanded && (
					<motion.span
						initial={{ width: 0, opacity: 0, x: -10 }}
						animate={{
							width: "auto",
							opacity: 1,
							x: 0,
							transition: {
								type: "spring",
								stiffness: 500,
								damping: 30,
								mass: 1,
							},
						}}
						exit={{
							width: 0,
							opacity: 0,
							x: -10,
							transition: { duration: 0.2 }, // Salida rápida
						}}
						className="font-title origin-left overflow-hidden text-sm font-bold tracking-wide whitespace-nowrap"
					>
						CursaPlan
					</motion.span>
				)}
			</AnimatePresence>
		</Link>
	);
}
