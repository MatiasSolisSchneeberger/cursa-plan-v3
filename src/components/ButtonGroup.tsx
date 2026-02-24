import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn"; // Asumo que tienes esta utilidad, si no, quitala

export default function ButtonGroup({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const scrollRef = useRef<HTMLElement>(null);
	// Usamos un string para el estado para evitar combinaciones booleanas confusas
	const [scrollState, setScrollState] = useState<
		"start" | "middle" | "end" | "none"
	>("none");

	useEffect(() => {
		const element = scrollRef.current;
		if (!element) return;

		const checkScroll = () => {
			const { scrollLeft, scrollWidth, clientWidth } = element;

			// Margen de error de 1px para pantallas de alta densidad
			const isStart = scrollLeft <= 1;
			const isEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1;
			const hasScroll = scrollWidth > clientWidth;

			if (!hasScroll) {
				setScrollState("none");
			} else if (isStart) {
				setScrollState("start");
			} else if (isEnd) {
				setScrollState("end");
			} else {
				setScrollState("middle");
			}
		};

		// 1. Escuchar evento de scroll
		element.addEventListener("scroll", checkScroll);

		// 2. Escuchar cambios de tamaño del contenedor (más robusto que window resize)
		const resizeObserver = new ResizeObserver(() => checkScroll());
		resizeObserver.observe(element);

		// Chequeo inicial
		checkScroll();

		return () => {
			element.removeEventListener("scroll", checkScroll);
			resizeObserver.disconnect();
		};
	}, [children]);

	// Generamos la máscara CSS basada en el estado
	const getMaskStyle = () => {
		const fadeWidth = "40px"; // Ancho del difuminado

		switch (scrollState) {
			case "start":
				// Difuminado solo a la derecha
				return `linear-gradient(to right, black calc(100% - ${fadeWidth}), transparent 100%)`;
			case "end":
				// Difuminado solo a la izquierda
				return `linear-gradient(to right, transparent 0%, black ${fadeWidth})`;
			case "middle":
				// Difuminado a ambos lados
				return `linear-gradient(to right, transparent 0%, black ${fadeWidth}, black calc(100% - ${fadeWidth}), transparent 100%)`;
			default:
				// Sin difuminado
				return "none";
		}
	};

	return (
		<motion.section
			ref={scrollRef}
			className={cn(
				"button-group no-scrollbar relative flex h-min w-full flex-row overflow-x-auto scroll-smooth",
				"*:rounded-none",
				"*:first:rounded-l-xl *:first:not-disabled:hover:rounded-l-2xl",
				"*:last:rounded-r-xl *:not-disabled:hover:rounded-none *:last:not-disabled:hover:rounded-r-2xl",
				// Centrado en desktop si no hay scroll
				scrollState === "none" ? "md:justify-center" : "justify-start",
				className,
			)}
			style={{
				// Aplicamos la máscara directamente al estilo (Webkit para Chrome/Safari/Edge)
				maskImage: getMaskStyle(),
				WebkitMaskImage: getMaskStyle(),
				transition:
					"mask-image 0.2s ease-out, -webkit-mask-image 0.2s ease-out", // Transición suave de la máscara
			}}
		>
			{children}
		</motion.section>
	);
}
