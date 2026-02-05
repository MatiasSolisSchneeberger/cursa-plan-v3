import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import App from "./App.tsx"
import {AuthProvider} from "./context/AuthContext.tsx"
import {SimuladorProvider} from "./context/SimuladorContext.tsx"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {ThemeProvider} from "./context/ThemeContext.tsx"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<SimuladorProvider>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</QueryClientProvider>
			</SimuladorProvider>
		</AuthProvider>
	</StrictMode>,
)
