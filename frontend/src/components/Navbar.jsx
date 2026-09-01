import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [open, setOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();

    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <nav className="border-b bg-white ">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-lg font-bold text-gray-900">CollabHub</Link>

                {/* <div className="hidden md:flex gap-6">
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
                </div> */}

                <div className="hidden md:flex gap-4 items-center">
                    {isLoggedIn ? (
                        <div className="flex gap-4">
                            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
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
                <div className="md:hidden flex flex-col gap-3 px-4 pb-4">
                    {isLoggedIn ? (
                        <div>
                            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
                            <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/" className="text-sm text-gray-600">Home</Link>
                            <Link to="/login" className="text-sm text-gray-600">Login</Link>
                            <Link to="/register" className="text-sm text-gray-600">Register</Link>
                        </div>
                    )}

                </div>
            )}
        </nav>
    );
}

export default Navbar;