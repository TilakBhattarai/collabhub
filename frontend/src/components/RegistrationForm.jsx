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
            showToast("passwords do not match!");
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
            const url =
                "http://127.0.0.1:8000/accounts/auth/register/";

            const response = await axios.post(url, {
                username: username,
                email: email,
                password1: password1,
                password2: password2,
            });

            console.log(response);

            navigate("/login");

            showToast(
                "Registration successful! You can now login."
            );

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
                showToast(
                    "Something went wrong. Please try again."
                );
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
                <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    required
                    className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
            </div>


            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
            </div>


            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
            </div>


            {/* Confirm Password */}
            <div>
                <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Confirm password
                </label>

                <input
                    id="confirm-password"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Enter your password again"
                    required
                    className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
            </div>


            {/* Submit */}
            <button
                type="submit"
                className="mt-2 w-full cursor-pointer rounded-md bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
                Create account
            </button>

        </form>
    );
};

export default RegisterForm;