import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

const Toast = () => {
    const { message, clearToast } = useToast();

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            clearToast();
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, clearToast]);

    if (!message) return null;

    return (
        <div className="fixed right-5 top-20 z-50 max-w-sm rounded-md border border-gray-200 bg-white px-4 py-3 shadow-md">
            <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-600" />

                <p className="text-sm leading-5 text-gray-700">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Toast;