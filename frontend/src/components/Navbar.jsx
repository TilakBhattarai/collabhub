import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Navbar() {
    const [open, setOpen] = useState(false);
    const { showToast } = useToast();
    const { isLoggedIn, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        showToast("Logged out successfully");
        navigate("/login");
    };

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