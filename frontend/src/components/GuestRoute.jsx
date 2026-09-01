import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />
    }
    return children;
}

export default GuestRoute