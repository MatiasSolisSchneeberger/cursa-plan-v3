import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Carrera from "./pages/Carrera";
import { Index } from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Materia from "./pages/Materia";
import { Analytics } from "@vercel/analytics/react";
import MdxPage from "./pages/MdxPage";
import Contact from "./pages/Contacto";
import ContraseñaOlvidada from "./pages/auth/ContraseñaOlvidada";
import ActualizarContraseña from "./pages/auth/ActualizarContraseña";
import Novedades from "./pages/Novedades";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";

import "@fontsource-variable/montserrat";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import Config from "./pages/Config";
import Carreras from "./pages/Carreras";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Analytics />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Index />} />

					{/* Carreras */}
					<Route path="/carreras" element={<Carreras />} />
					<Route
						path="/carreras/:carreraSlug"
						element={<Carrera />}
					/>
					<Route
						path="/carreras/:carreraSlug/:planAnioParam"
						element={<Carrera />}
					/>
					<Route
						path="/carreras/:carreraSlug/:planSlug/:materiaSlug"
						element={<Materia />}
					/>

					{/* Calendario */}
					<Route path="/calendario" element={<Calendar />} />

					{/* Auth */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/contraseña-olvidada"
						element={<ContraseñaOlvidada />}
					/>
					<Route
						path="/actualizar-contraseña"
						element={<ActualizarContraseña />}
					/>

					{/* Novedades */}
					<Route path="/novedades" element={<Novedades />} />

					{/* MDX */}
					<Route path="/:filename" element={<MdxPage />} />

					{/* Contactos */}
					<Route path="/contacto" element={<Contact />} />

					{/* Rutas privadas | Usuarios */}
					<Route element={<ProtectedRoute />}>
						<Route path="/perfil" element={<Profile />} />
						<Route path="/config" element={<Config />} />
					</Route>

					{/* Rutas privadas | Administradores */}
					<Route
						element={<ProtectedRoute allowedRoles={["admin"]} />}
					>
						<Route path="/admin" element={<Admin />} />
					</Route>

					{/* 404 */}
					<Route path="*" element={<Navigate to="/404" />} />
					<Route path="/404" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
