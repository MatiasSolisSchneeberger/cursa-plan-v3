import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- 1. CONTEXTO ---
interface ModalContextType {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	close: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useModal() {
	const context = useContext(ModalContext);
	if (!context)
		throw new Error("Modal components must be used within a <Modal>");
	return context;
}

// --- 2. COMPONENTE PADRE (Wrapper) ---
interface ModalProps {
	children: ReactNode;
	defaultOpen?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}

export function Modal({
	children,
	defaultOpen = false,
	onOpenChange,
}: ModalProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const handleOpenChange = (value: boolean) => {
		setIsOpen(value);
		onOpenChange?.(value);
	};

	return (
		<ModalContext.Provider
			value={{
				isOpen,
				setIsOpen: handleOpenChange,
				close: () => handleOpenChange(false),
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}

// --- 3. TRIGGER (El botón que abre) ---
export function ModalOpen({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const { setIsOpen } = useModal();

	return (
		<div
			onClick={() => setIsOpen(true)}
			className={cn("inline-block cursor-pointer", className)}
		>
			{children}
		</div>
	);
}

// --- 3.5. CLOSE (El botón que cierra) ---
export function ModalClose({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const { close } = useModal();

	return (
		<div
			onClick={close}
			className={cn("inline-block cursor-pointer", className)}
		>
			{children}
		</div>
	);
}

// --- 4. CONTENT (El overlay y la ventana) ---
interface ModalContentProps {
	children: ReactNode;
	className?: string;
	size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function ModalContent({
	children,
	className,
	size = "md",
}: ModalContentProps) {
	const { isOpen, close } = useModal();

	// Cerrar con tecla ESC
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		if (isOpen) window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, close]);

	// Prevenir scroll del body cuando está abierto
	useEffect(() => {
		if (isOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	const sizes = {
		sm: "max-w-sm",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
		full: "max-w-[95vw] h-[90vh]",
	};

	// Usamos Portal para renderizar fuera del flujo normal (evita problemas de z-index)
	// Esto asegura que el modal siempre esté "encima" de todo, incluso si el ModalOpen está dentro de un div con overflow:hidden
	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
					{/* BACKDROP (Fondo oscuro difuminado) */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={close} // Cierra al hacer clic fuera
						className="absolute inset-0 bg-black/40 backdrop-blur-sm"
					/>

					{/* VENTANA DEL MODAL */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{
							type: "spring",
							duration: 0.3,
							bounce: 0,
						}}
						className={cn(
							"relative max-h-[90vh] w-full",
							sizes[size],
							className,
						)}
					>
						{children}
					</motion.div>
				</div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
