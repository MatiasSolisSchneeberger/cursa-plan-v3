import {createContext, useContext} from "react"

export type Theme = "dark" | "light"

export interface ThemeContextProps {
	theme: Theme
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
