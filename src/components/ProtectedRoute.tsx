import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContextData";
import { IconLoader2 } from "@tabler/icons-react";

// Definimos las props que puede recibir
interface ProtectedRouteProps {
	allowedRoles?: string[]; // Array de roles permitidos (opcional)
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
	// Ahora sacamos también 'role' del contexto
	const { session, loading, role } = useAuth();
	const location = useLocation();

	// 1. Cargando...
	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<IconLoader2
					className="text-primary-600 animate-spin"
					size={40}
				/>
			</div>
		);
	}

	// 2. No hay sesión -> Login
	if (!session) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// 3. (NUEVO) Verificación de Rol
	// Si se especificaron roles permitidos Y el rol del usuario no está en esa lista...
	if (allowedRoles && role && !allowedRoles.includes(role)) {
		// ...lo mandamos al Home (o a una página de "No Autorizado")
		return <Navigate to="/" replace />;
	}

	// 4. Todo OK -> Mostrar ruta
	return <Outlet />;
}
