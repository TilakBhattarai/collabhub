import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.user_id);
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, [])

    const login = (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        const decoded = jwtDecode(accessToken);
        setUserId(decoded.user_id);
        setIsLoggedIn(true);
    }

    const logout = () => {
        const confirm = window.confirm("Are u sure want to logout?");

        if (!confirm) {
            return false;
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, loading, setLoading, userId }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}