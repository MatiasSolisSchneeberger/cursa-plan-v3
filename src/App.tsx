import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Layout from "./layout/Layout"
import PaginaCarrera from "./pages/PaginaCarrera" // Tu componente de página
import {Index} from "./pages/Index"
import NotFound from "./pages/NotFound"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Profile from "./pages/Profile"
import Calendar from "./pages/Calendar"
import MesasExamenes from "./pages/MesasExamenes"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Rutas generales (Home, Contacto) sin tema específico */}
				<Route path="/" element={<Layout />}>
					<Route index element={<Index />} />
					{/* --- AQUÍ ESTÁ LA MAGIA --- */}
					<Route path="/carreras/:carreraSlug" element={<PaginaCarrera />} />

					<Route path="/mesas-examenes" element={<MesasExamenes />} />
					<Route path="/calendario" element={<Calendar />} />

					<Route path="*" element={<Navigate to="/404" />} />
					<Route path="/404" element={<NotFound />} />

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Rutas privadas */}
					<Route path="/perfil" element={<Profile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
