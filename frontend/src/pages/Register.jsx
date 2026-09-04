import RegisterForm from "../components/RegistrationForm";

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-24 pb-20">
            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Create your account to get started
                </p>

                <RegisterForm />

            </div>
        </div>
    );
};

export default Register;