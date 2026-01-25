import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import App from "./App.tsx"
import {AuthProvider} from "./context/AuthContext.tsx"
import {SimuladorProvider} from "./context/SimuladorContext.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<SimuladorProvider>
				<App />
			</SimuladorProvider>
		</AuthProvider>
	</StrictMode>,
)
