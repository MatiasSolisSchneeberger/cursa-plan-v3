import type {Session} from "@supabase/supabase-js"
import {createContext, useContext, useEffect, useState} from "react"
import supabase from "../utils/supabase"

type AuthContextType = {
	session: Session | null
	loading: boolean
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children: React.ReactNode}) {
	const [session, setSession] = useState<Session | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		supabase.auth.getSession().then(({data: {session}}) => {
			setSession(session)
			setLoading(false)
		})

		const {
			data: {subscription},
		} = supabase.auth.onAuthStateChange((_, session) => {
			setSession(session)
			setLoading(false)
		})

		return () => subscription.unsubscribe()
	}, [])

	const signOut = async () => {
		await supabase.auth.signOut()
		window.location.reload()
	}

	const value = {
		session,
		loading,
		signOut,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth debe usarse dentro de un AuthProvider")
	}
	return context
}
