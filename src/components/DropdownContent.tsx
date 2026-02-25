import { useDropdown } from "./Dropdown";
import { FloatingPortal } from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { cn } from "@/utils/cn";

export default function DropdownContent({
	children,
}: {
	children: React.ReactNode;
}) {
	const { open, x, y, strategy, refs, getFloatingProps } = useDropdown();
	const { carreraSlug } = useParams();
	const themeClass = carreraSlug ? `theme-${carreraSlug}` : "";

	return (
		<FloatingPortal>
			<AnimatePresence>
				{open && (
					<motion.div
						ref={refs.setFloating}
						style={{
							position: strategy,
							top: y ?? 0, // Fallback to 0 if null
							left: x ?? 0,
						}}
						{...getFloatingProps()}
						initial={{ opacity: 0, scale: 0.95, y: -5 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -5 }}
						transition={{ duration: 0.15, ease: "easeOut" }}
						className={cn("z-50 min-w-max", themeClass)}
					>
						<article>{children}</article>
					</motion.div>
				)}
			</AnimatePresence>
		</FloatingPortal>
	);
}
