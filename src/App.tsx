import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Layout from "./layout/Layout"
import Carrera from "./pages/Carrera"
import {Index} from "./pages/Index"
import NotFound from "./pages/NotFound"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Profile from "./pages/Profile"
import Calendar from "./pages/Calendar"
import Materia from "./pages/Materia"
import {Analytics} from "@vercel/analytics/react"
import MdxPage from "./pages/MdxPage"
import Contact from "./pages/Contacto"
import ContraseñaOlvidada from "./pages/auth/ContraseñaOlvidada"
import ActualizarContraseña from "./pages/auth/ActualizarContraseña"
import Novedades from "./pages/Novedades"
import ProtectedRoute from "./components/ProtectedRoute"
import Admin from "./pages/Admin"

import "@fontsource-variable/montserrat"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import Config from "./pages/Config"

function App() {
	return (
		<BrowserRouter>
			<Analytics />
			<Routes>
				{/* Rutas generales (Home, Contacto) sin tema específico */}
				<Route path="/" element={<Layout />}>
					<Route index element={<Index />} />

					<Route path="/carreras/:carreraSlug" element={<Carrera />} />
					<Route path="/carreras/:carreraSlug/:planSlug/:materiaSlug" element={<Materia />} />

					<Route path="/calendario" element={<Calendar />} />

					<Route path="*" element={<Navigate to="/404" />} />
					<Route path="/404" element={<NotFound />} />

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/contraseña-olvidada" element={<ContraseñaOlvidada />} />
					<Route path="/actualizar-contraseña" element={<ActualizarContraseña />} />

					<Route path="/novedades" element={<Novedades />} />

					<Route path="/:filename" element={<MdxPage />} />
					<Route path="/contacto" element={<Contact />} />

					{/* Rutas privadas */}
					<Route element={<ProtectedRoute />}>
						<Route path="/perfil" element={<Profile />} />
						<Route path="/config" element={<Config />} />
					</Route>

					<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
						<Route path="/admin" element={<Admin />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
