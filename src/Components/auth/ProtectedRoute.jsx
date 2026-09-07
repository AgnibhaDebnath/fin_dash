import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth.js";
const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
