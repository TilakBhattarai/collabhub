import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Bell } from "lucide-react";
import HandleApiError from "../utils/HandleApiError";
import api from "../api/axios";

function Navbar() {
    const [open, setOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const { showToast } = useToast();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        const success = logout();
        if (!success) return;

        showToast("Logged out successfully");
        navigate("/login");
    };

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

    useEffect(() => {
        fetchNotifications()
    }, [])

    const totalUnreadNotifications = notifications.filter((notification) =>
        notification.is_read === false
    ).length;



    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                <Link
                    to="/"
                    className="text-lg font-semibold text-gray-900"
                >
                    CollabHub
                </Link>

                <div className="hidden md:flex gap-5 items-center">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-5">

                            <Link
                                to="/notifications"
                                className="relative text-gray-600 hover:text-violet-700 transition"
                            >
                                <Bell size={20} />
                                {!loading && totalUnreadNotifications > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-medium text-white">
                                        {totalUnreadNotifications}
                                    </span>
                                )}
                            </Link>

                            <Link
                                to="/dashboard"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/discover"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                Discover
                            </Link>

                            <Link
                                to="/projects"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                Projects
                            </Link>

                            <Link
                                to="/myprojects"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                My Projects
                            </Link>

                            <Link
                                to="/connection"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                Connections
                            </Link>

                            <Link
                                to="/profile"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="text-sm text-gray-600 hover:text-violet-700 transition cursor-pointer"
                            >
                                Logout
                            </button>

                        </div>
                    ) : (
                        <div className="flex items-center gap-5">

                            <Link
                                to="/"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/about"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                About
                            </Link>

                            <Link
                                to="/login"
                                className="text-sm text-gray-600 hover:text-violet-700 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-sm font-medium bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
                            >
                                Register
                            </Link>

                        </div>
                    )}
                </div>

                <button
                    className="md:hidden text-gray-700 hover:text-violet-700 transition cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {open && (
                <div className="md:hidden flex flex-col border-t border-gray-200 bg-white">

                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/discover"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                Discover
                            </Link>

                            <Link
                                to="/projects"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                Projects
                            </Link>

                            <Link
                                to="/myprojects"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                My Projects
                            </Link>

                            <Link
                                to="/connection"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                Connections
                            </Link>

                            <Link
                                to="/profile"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    handleLogout();
                                }}
                                className="px-4 py-3 text-left text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/about"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                About
                            </Link>

                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm font-medium text-violet-700 hover:bg-violet-50 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>
            )}
        </nav>
    );
}

export default Navbar;