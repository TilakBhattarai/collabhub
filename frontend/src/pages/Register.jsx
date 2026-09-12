import RegisterForm from "../components/RegistrationForm";

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24 pb-20">
            <div className="w-full max-w-md">

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Create account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Sign up to get started with CollabHub.
                    </p>
                </div>

                <div className="border-t border-gray-200 pt-7">
                    <RegisterForm />
                </div>

            </div>
        </div>
    );
};

export default Register;