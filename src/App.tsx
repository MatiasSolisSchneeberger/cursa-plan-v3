import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Layout from "./layout/Layout"
import Carrera from "./pages/Carrera"
import {Index} from "./pages/Index"
import NotFound from "./pages/NotFound"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Profile from "./pages/Profile"
import Calendar from "./pages/Calendar"
import MesasExamenes from "./pages/MesasExamenes"
import Materia from "./pages/Materia"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Rutas generales (Home, Contacto) sin tema específico */}
				<Route path="/" element={<Layout />}>
					<Route index element={<Index />} />

					<Route path="/carreras/:carreraSlug" element={<Carrera />} />
					<Route path="/carreras/:carreraSlug/:planSlug/:materiaSlug" element={<Materia />} />

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
