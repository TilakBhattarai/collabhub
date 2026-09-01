import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { showToast } = useToast();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://127.0.0.1:8000/accounts/auth/login/"
      const response = await axios.post(
        url,
        {
          username: username,
          password: password
        }
      )

      login(response.data.access_token, response.data.refresh_token);

      showToast("Successfully Logged in.");
      navigate("/dashboard");

    } catch (error) {
      showToast(error.response?.data?.error || "Login Failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Sign in to your account
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div className="flex justify-end mt-2">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full mt-6 rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-gray-900 hover:underline"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;