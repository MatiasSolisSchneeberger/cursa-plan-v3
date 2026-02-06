import {createContext, useContext} from "react"
import type {EstadoMateria, Avance} from "../types/materia"

export interface SimuladorContextType {
	avances: Avance[]
	loading: boolean
	actualizarAvance: (materiaId: number, nuevoEstado: EstadoMateria) => Promise<void>
	getEstado: (materiaId: number) => EstadoMateria | undefined
}

export const SimuladorContext = createContext<SimuladorContextType | undefined>(undefined)

export const useSimulador = () => {
	const context = useContext(SimuladorContext)
	if (!context) throw new Error("useSimulador debe usarse dentro de SimuladorProvider")
	return context
}
