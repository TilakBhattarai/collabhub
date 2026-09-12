import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back, User
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Here's what's happening with your work.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/project/create")}
                    className="rounded-md bg-violet-600 px-4 py-2.5 cursor-pointer text-sm font-medium text-white hover:bg-violet-700 transition"
                >
                    Create Project
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                    ["Projects", 2],
                    ["Teams", 1],
                    ["Connections", 8],
                    ["Pending Requests", 3],
                ].map(([label, val]) => (
                    <div
                        key={label}
                        className="border border-gray-200 rounded-lg p-5"
                    >
                        <p className="text-2xl font-semibold text-gray-900">
                            {val}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Activity
                </h2>

                <ul className="text-sm text-gray-600 space-y-3">
                    <li>
                        You joined "CampusMart" project team.
                    </li>

                    <li>
                        Priya Rai sent you a collaboration request.
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;