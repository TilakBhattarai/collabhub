import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Navbar() {
    const [open, setOpen] = useState(false);
    const { showToast } = useToast();
    const { isLoggedIn, logout } = useAuth();

    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        showToast("Logged out successfully");
        navigate("/login");
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between ">
                <Link to="/" className="text-lg font-bold text-gray-900">CollabHub</Link>

                {/* <div className="hidden md:flex gap-6">
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
                </div> */}

                <div className="hidden md:flex gap-4 items-center">
                    {isLoggedIn ? (
                        <div className="flex gap-4">
                            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
                            <Link
                                to="/discover"
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Discover
                            </Link>
                            <Link
                                to="/connection"
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Connections
                            </Link>
                            <Link to="/profile" className="text-sm text-gray-600 hover:text-gray-900">Profile</Link>
                            <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">Logout</button>

                        </div>
                    ) : (
                        <div className="flex gap-4 justify-between items-center">
                            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
                            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
                            <Link to="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
                        </div>
                    )}
                </div>

                <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
            </div>

            {open && (
                <div className="md:hidden flex flex-col border-t bg-white">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/discover"
                                onClick={() => setOpen(false)}
                                className="text-sm px-4 py-3 text-gray-600 hover:text-gray-900"
                            >
                                Discover
                            </Link>

                            <Link
                                to="/connection"
                                onClick={() => setOpen(false)}
                                className="text-sm px-4 py-3 text-gray-600 hover:text-gray-900"
                            >
                                Connections
                            </Link>
                            <Link
                                to="/profile"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => { setOpen(false); handleLogout(); }}
                                className="px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                Home
                            </Link>
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-sm font-medium text-blue-600 hover:bg-gray-50"
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