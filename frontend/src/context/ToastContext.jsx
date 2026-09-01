import { useState, createContext, useContext } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [message, setMessage] = useState('');

    const showToast = (message) => {
        setMessage(message);
    }
    return (
        <ToastContext.Provider value={{ message, showToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    return useContext(ToastContext);
}