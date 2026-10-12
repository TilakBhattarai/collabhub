import { useContext, createContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";
import HandleApiError from "../utils/HandleApiError";
import api from "../api/axios";
import { useAuth } from "./AuthContext";


const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const [notifications, setNotifications] = useState([]);
    const { isLoggedIn } = useAuth()


    const fetchNotifications = async () => {
        setLoading(true);

        try {
            const response = await api.get(
                "notifications/",
            )
            setNotifications(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load notifications. Please refresh or try again.")
        } finally {
            setLoading(false);
        }
    }

    const totalUnreadNotifications = notifications.filter((notification) =>
        notification.is_read === false
    ).length;

    useEffect(() => {
        if (isLoggedIn) {
            fetchNotifications()
        }
    }, [])

    return (
        <NotificationContext.Provider value={{ fetchNotifications, totalUnreadNotifications, loading, notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}