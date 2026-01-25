import {createContext, useContext, useEffect, useState} from "react"
import supabase from "../utils/supabase"
import {useAuth} from "./AuthContext"

import type {EstadoMateria, Avance} from "../types/materia"

interface SimuladorContextType {
	avances: Avance[]
	loading: boolean
	actualizarAvance: (materiaId: number, nuevoEstado: EstadoMateria) => Promise<void>
	getEstado: (materiaId: number) => EstadoMateria
}

const SimuladorContext = createContext<SimuladorContextType | undefined>(undefined)

export function SimuladorProvider({children}: {children: React.ReactNode}) {
	const {session} = useAuth()
	const [avances, setAvances] = useState<Avance[]>([])
	const [loading, setLoading] = useState(true)

	// 1. Cargar todos los avances al inicio (O cuando cambia la sesión)
	useEffect(() => {
		// Definimos la función ADENTRO del efecto para evitar errores de declaración
		const cargarAvances = async () => {
			if (!session) {
				setAvances([])
				setLoading(false)
				return
			}

			try {
				const {data, error} = await supabase.from("avances").select("materia_plan_id, estado")

				if (error) throw error

				if (data) setAvances(data as Avance[])
			} catch (error) {
				console.error("Error cargando avances:", error)
			} finally {
				setLoading(false)
			}
		}

		cargarAvances()
	}, [session]) // Se ejecuta cada vez que cambia 'session'

	// 2. Función para guardar (Upsert)
	const actualizarAvance = async (materiaId: number, nuevoEstado: EstadoMateria) => {
		if (!session) return

		// Actualizamos optimísticamente el UI (para que se sienta instantáneo)
		setAvances((prev) => {
			const filtrado = prev.filter((a) => a.materia_plan_id !== materiaId)
			return [...filtrado, {materia_plan_id: materiaId, estado: nuevoEstado}]
		})

		// Guardamos en BD
		const {error} = await supabase.from("avances").upsert(
			{
				user_id: session.user.id,
				materia_plan_id: materiaId,
				estado: nuevoEstado,
				updated_at: new Date().toISOString(),
			},
			{onConflict: "user_id, materia_plan_id"},
		)

		if (error) console.error("Error guardando avance:", error)
	}

	const getEstado = (materiaId: number) => {
		return avances.find((a) => a.materia_plan_id === materiaId)?.estado || "Sin cursar"
	}

	return (
		<SimuladorContext.Provider value={{avances, loading, actualizarAvance, getEstado}}>
			{children}
		</SimuladorContext.Provider>
	)
}

export const useSimulador = () => {
	const context = useContext(SimuladorContext)
	if (!context) throw new Error("useSimulador debe usarse dentro de SimuladorProvider")
	return context
}
