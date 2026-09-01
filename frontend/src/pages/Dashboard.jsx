function Dashboard() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold">Welcome back, User</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[["Projects", 2], ["Teams", 1], ["Connections", 8], ["Pending Requests", 3]].map(([label, val]) => (
                    <div key={label} className="border rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold">{val}</p>
                        <p className="text-sm text-gray-600">{label}</p>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <h2 className="font-semibold mb-3">Recent Activity</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                    <li>You joined "CampusMart" project team.</li>
                    <li>Priya Rai sent you a collaboration request.</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;