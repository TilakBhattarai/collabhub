import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />
    }
    return children;
}

export default GuestRoute