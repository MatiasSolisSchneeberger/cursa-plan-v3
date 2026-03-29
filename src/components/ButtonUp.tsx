import { IconChevronUp } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ScrollToTop from "@/components/ScrollToTop";

export default function ButtonUp() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShow(true);
			} else {
				setShow(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="fixed right-4 bottom-4 z-50"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.1 }}
				>
					<Button
						size="icon-lg"
						className="hover:cursor-pointer"
						onClick={ScrollToTop}
					>
						<IconChevronUp />
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
