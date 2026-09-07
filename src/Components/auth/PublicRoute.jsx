import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth.js";
const PublicRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
