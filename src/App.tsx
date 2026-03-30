/* --- Fuentes --- */
import "@fontsource-variable/montserrat";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

/* --- Vercel --- */
import { Analytics } from "@vercel/analytics/react";

/* --- React Router --- */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* --- Páginas --- */
import { Index } from "@/pages/Index";
import ActualizarContraseña from "@/pages/auth/ActualizarContraseña";
import Calendar from "@/pages/Calendar";
import Carrera from "@/pages/Carrera";
import Carreras from "@/pages/Carreras";
import Config from "@/pages/Config";
import Contact from "@/pages/Contacto";
import ContraseñaOlvidada from "@/pages/auth/ContraseñaOlvidada";
import Login from "@/pages/auth/Login";
import Materia from "@/pages/Materia";
import NotFound from "@/pages/NotFound";
import PoliticaDePrivacidad from "@/pages/landing/PoliticaDePrivacidad";
import PreguntasFrecuentes from "@/pages/landing/PreguntasFrecuentes";
import Profile from "@/pages/Profile";
import Register from "@/pages/auth/Register";
import SobreNosotros from "@/pages/landing/SobreNosotros";
import TerminosYCondiciones from "@/pages/landing/TerminosYCondiciones";

/* --- Componentes --- */
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";

/* --- Layout --- */
import Layout from "@/layout/Layout";

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

					{/* Páginas Estáticas */}
					<Route
						path="/politica-de-privacidad"
						element={<PoliticaDePrivacidad />}
					/>
					<Route
						path="/preguntas-frecuentes"
						element={<PreguntasFrecuentes />}
					/>
					<Route path="/sobre-nosotros" element={<SobreNosotros />} />
					<Route
						path="/terminos-y-condiciones"
						element={<TerminosYCondiciones />}
					/>

					{/* Contactos */}
					<Route path="/contacto" element={<Contact />} />

					{/* Rutas privadas | Usuarios */}
					<Route element={<ProtectedRoute />}>
						<Route path="/perfil" element={<Profile />} />
						<Route path="/config" element={<Config />} />
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
