import { useEffect, useState } from "react";
import { IconHeart, IconHeartFilled, IconLoader } from "@tabler/icons-react";

// Supabase
import supabase from "@/utils/supabase";

// hooks
import { useAuth } from "@/context/AuthContextData";

// Componentes
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// INTERFAZ
interface LikeButtonProps {
	planId: number;
	className?: string;
}

export default function LikeButton({ planId, className }: LikeButtonProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [isLiked, setIsLiked] = useState(false);
	const [fetching, setFetching] = useState(false); // Estado de carga interno del botón

	// 2. EXTRAEMOS LA SESIÓN DEL CONTEXTO
	const { session, loading: authLoading } = useAuth();

	// 3. EFECTO PARA VERIFICAR SI YA DIÓ LIKE
	useEffect(() => {
		const checkLikeStatus = async (userId: string) => {
			try {
				const { data, error } = await supabase
					.from("carreras_fav")
					.select("id")
					.eq("user_id", userId) // Usamos el ID seguro que recibimos
					.eq("plan_id", planId)
					.maybeSingle();

				if (!error && data) {
					setIsLiked(true);
				} else {
					setIsLiked(false);
				}
			} catch (error) {
				console.error("Error verificando like:", error);
			} finally {
				setIsLoading(false);
			}
		};

		// Si la autenticación aún está cargando, no hacemos nada
		if (authLoading) return;

		// Si no hay sesión (usuario no logueado), no podemos buscar sus likes
		if (!session) {
			setIsLiked(false);
			return;
		}

		// Si ya tenemos usuario, buscamos
		checkLikeStatus(session.user.id);
	}, [planId, session, authLoading]);

	// 4. MANEJAR EL CLICK
	const toggleLike = async () => {
		if (authLoading) return; // Protección extra

		if (!session) {
			alert("Debes iniciar sesión para guardar favoritos");
			return;
		}

		setFetching(true);
		const userId = session.user.id;

		if (isLiked) {
			// --- BORRAR ---
			const { error } = await supabase
				.from("carreras_fav")
				.delete()
				.eq("user_id", userId) // ¡IMPORTANTE! Usar userId de la sesión
				.eq("plan_id", planId);

			if (!error) setIsLiked(false);
			else console.error("Error al borrar:", error);
		} else {
			// --- GUARDAR ---
			const { error } = await supabase.from("carreras_fav").insert({
				user_id: userId, // Aquí es donde antes te daba NULL
				plan_id: planId,
			});

			if (error) {
				console.error("Error al guardar:", error);
				// Si el error es 23505 (Unique violation) es que ya le había dado like, lo marcamos visualmente
				if (error.code === "23505") setIsLiked(true);
			} else {
				setIsLiked(true);
			}
		}
		setFetching(false);
	};

	// Renderizado
	if (authLoading) return null; // O un skeleton pequeño si prefieres

	return (
		<Button
			variant={isLiked ? "default" : "outline"}
			className={cn(
				isLiked &&
					"bg-red-200 text-red-600 dark:bg-red-800 dark:text-red-200",
				className,
			)}
			onClick={toggleLike}
			size="icon-lg"
		>
			{isLoading || fetching ? (
				<>
					<IconLoader className="animate-spin" />
				</>
			) : isLiked ? (
				<>
					<IconHeartFilled className="text-danger-600 dark:text-danger-400" />
				</>
			) : (
				<>
					<IconHeart />
				</>
			)}
		</Button>
	);
}
