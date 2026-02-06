import {useEffect, useState} from "react"
import type {Session} from "@supabase/supabase-js"
import supabase from "../utils/supabase"
import {AuthContext} from "./AuthContextData"

export function AuthProvider({children}: {children: React.ReactNode}) {
	const [session, setSession] = useState<Session | null>(null)
	const [role, setRole] = useState<string | null>(null) // <--- 2. Estado para el rol
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Cargar sesión inicial
		supabase.auth.getSession().then(({data: {session}}) => {
			setSession(session)
			if (session)
				fetchRole(session.user.id) // Buscar rol si hay sesión
			else setLoading(false)
		})

		// Escuchar cambios (login, logout)
		const {
			data: {subscription},
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
			if (session) {
				fetchRole(session.user.id)
			} else {
				setRole(null)
				setLoading(false)
			}
		})

		return () => subscription.unsubscribe()
	}, [])

	// Función auxiliar para buscar el rol en la DB
	const fetchRole = async (userId: string) => {
		try {
			const {data, error} = await supabase.from("usuarios").select("role").eq("id", userId).single()

			if (!error && data) {
				setRole(data.role)
			} else {
				setRole("user") // Default si falla
			}
		} catch (error) {
			console.error("Error buscando rol:", error)
		} finally {
			setLoading(false) // Terminamos de cargar
		}
	}

	const signOut = async () => {
		await supabase.auth.signOut()
		setRole(null)
	}

	return <AuthContext.Provider value={{session, loading, role, signOut}}>{children}</AuthContext.Provider>
}
