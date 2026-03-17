import { createContext, useContext } from "react";
import type { Session } from "@supabase/supabase-js";

import type { UserProfile } from "@/types/user";

export interface AuthContextProps {
	session: Session | null;
	userProfile: UserProfile | null;
	loading: boolean;
	role: string | null;
	signOut: () => Promise<void>;
	refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined,
);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth debe usarse dentro de un AuthProvider");
	}
	return context;
};
