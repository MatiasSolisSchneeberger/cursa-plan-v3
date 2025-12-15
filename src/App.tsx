import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Layout from "./layout/Layout"
import {PaginaCarrera} from "./pages/PaginaCarrera" // Tu componente de página
import {Index} from "./pages/Index"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Rutas generales (Home, Contacto) sin tema específico */}
				<Route path="/" element={<Layout />}>
					<Route index element={<Index />} />
					{/* --- AQUÍ ESTÁ LA MAGIA --- */}
					{/* Definimos la ruta padre con el parámetro :carrera */}
					<Route path="/carreras/:carreraSlug" element={<PaginaCarrera />} />
					<Route path="/mesas-examenes" element={<div> mesa de examenes</div>} />
					<Route path="/calendario-academico" element={<div> calendario academico</div>} />
					<Route path="*" element={<Navigate to="/404" />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
