import { useToast } from "../context/ToastContext";

const Toast = () => {
    const { message } = useToast();

    if (!message) return null;
    return (
        <div className="fixed top-17 right-5 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
            {message}
        </div>
    );
};

export default Toast;