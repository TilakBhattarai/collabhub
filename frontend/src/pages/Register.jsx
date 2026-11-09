import { Link } from "react-router-dom";
import RegisterForm from "../components/RegistrationForm";

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24 pb-16">
            <div className="w-full max-w-md">

                <div className="mb-6 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-900"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
                            C
                        </span>
                        <span className="text-lg font-semibold">CollabHub</span>
                    </Link>

                    <h1 className="mt-6 text-2xl font-semibold text-gray-900">
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Find collaborators and start building together.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <RegisterForm />
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-violet-600 hover:text-violet-700"
                    >
                        Sign in
                    </Link>
                </p>

                <p className="mt-4 text-center text-xs text-gray-400">
                    By creating an account, you agree to use CollabHub
                    respectfully and responsibly.
                </p>

            </div>
        </div>
    );
};

export default Register;