import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import supabase from "@/utils/supabase";
import { AuthContext } from "./AuthContextData";

import type { UserProfile } from "@/types/User";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [role, setRole] = useState<string | null>(null); // Mantenemos por compatibilidad, aunque ya está en userProfile
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Cargar sesión inicial
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			if (session)
				fetchProfile(session.user.id); // Buscar perfil si hay sesión
			else setLoading(false);
		});

		// Escuchar cambios (login, logout)
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			if (session) {
				fetchProfile(session.user.id);
			} else {
				setUserProfile(null);
				setRole(null);
				setLoading(false);
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	// Función para buscar el perfil completo en la DB
	const fetchProfile = async (userId: string) => {
		try {
			const { data, error } = await supabase
				.from("usuarios")
				.select("id, username, full_name, avatar_url, role, icon")
				.eq("id", userId)
				.single();

			if (!error && data) {
				setUserProfile({
					id: data.id,
					username: data.username,
					full_name: data.full_name,
					avatar_url: data.avatar_url,
					role: data.role,
					icon: data.icon,
				});
				setRole(data.role);
			} else {
				// Fallback básico si no existe perfil aún (raro si el trigger funciona)
				setUserProfile(null);
				setRole("user");
			}
		} catch (error) {
			console.error("Error buscando perfil:", error);
		} finally {
			setLoading(false); // Terminamos de cargar
		}
	};

	const refreshProfile = async () => {
		if (session?.user) {
			await fetchProfile(session.user.id);
		}
	};

	const signOut = async () => {
		await supabase.auth.signOut();
		setRole(null);
		setUserProfile(null);
	};

	return (
		<AuthContext.Provider
			value={{
				session,
				userProfile,
				loading,
				role,
				signOut,
				refreshProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
