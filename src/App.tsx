import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./layout/Layout"
import {PaginaCarrera} from "./pages/PaginaCarrera" // Tu componente de página

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Rutas generales (Home, Contacto) sin tema específico */}
				<Route path="/" element={<Layout />}>
					{/* --- AQUÍ ESTÁ LA MAGIA --- */}
					{/* Definimos la ruta padre con el parámetro :carrera */}
					<Route path="/carrera/:carrera" element={<PaginaCarrera />} />
					<Route path="/mesas-examenes" element={<div> mesa de examenes</div>} />
					<Route path="/calendario-academico" element={<div> calendario academico</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
