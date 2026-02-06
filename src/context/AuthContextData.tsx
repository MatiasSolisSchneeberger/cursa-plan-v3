import {createContext, useContext} from "react"
import type {Session} from "@supabase/supabase-js"

export interface AuthContextProps {
	session: Session | null
	loading: boolean
	role: string | null
	signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth debe usarse dentro de un AuthProvider")
	}
	return context
}
