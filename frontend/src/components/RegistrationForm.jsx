import { useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password1 != password2) {
            showToast("passwords do not match!")
            return;
        }

        if (password1.length < 8) {
            showToast("Password must be at least 8 characters.");
            return;
        }

        if (username.length < 3) {
            showToast("username must be atleast 3 characters.");
            return;
        }

        try {
            const url = "http://127.0.0.1:8000/accounts/auth/register/";
            const response = await axios.post(
                url,
                {
                    username: username,
                    email: email,
                    password1: password1,
                    password2: password2,
                }

            )
            console.log(response);
            navigate("/login");
            showToast("Registration successful! You can now login.");

            setUsername("");
            setEmail("");
            setPassword1("");
            setPassword2("");
        } catch (error) {
            console.log(error.response?.data);

            const data = error.response?.data;

            if (data) {
                const messages = Object.values(data).flat();
                showToast(messages.join(" "));
            } else {
                showToast("Something went wrong. Please try again.");
            }
        }

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block mb-1 text-sm font-medium">
                    Username
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">
                    Password
                </label>

                <input
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">
                    Confirm Password
                </label>

                <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Confirm password"
                    required
                    className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full mt-3 rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
