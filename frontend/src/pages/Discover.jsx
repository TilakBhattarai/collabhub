import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";

const Discover = () => {
    const [users, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const [connectingId, setConnectingId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(
                    "profile/discover/",
                );
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    showToast("You are not authenticated");
                } else if (error.response?.data?.error) {
                    showToast(error.response.data.error);
                } else {
                    showToast("Something went wrong on fetching data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleConnect = async (receiver_id) => {
        setConnectingId(receiver_id);
        try {
            const response = await api.post(
                "connection/",
                {
                    receiver: receiver_id
                }
            )
            console.log(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("You have already sent a connection request");
            }
        } finally {
            setConnectingId(null);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Discover
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Find people to build with.
                    </p>
                </div>

                {/* Users */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {users.map((user) => (
                        <div
                            key={user.user.id}
                            className="flex flex-col bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition"
                        >

                            {/* User Header */}
                            <div className="flex items-center gap-4">

                                {user.profile_picture ? (
                                    <img
                                        src={`http://127.0.0.1:8000${user.profile_picture}`}
                                        alt={user.user.username}
                                        className="w-14 h-14 rounded-full object-cover border border-gray-200"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white text-lg font-semibold">
                                        {user.user.username
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <h2 className="text-base font-semibold text-gray-900 truncate">
                                        {user.user.username}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500 truncate">
                                        {user.role}
                                    </p>
                                </div>

                            </div>

                            {/* Bio */}
                            <div className="mt-5">
                                <p className="text-sm leading-6 text-gray-600 line-clamp-3">
                                    {user.bio || "No bio available."}
                                </p>
                            </div>

                            {/* Information */}
                            <div className="mt-5 space-y-2 text-sm text-gray-500">

                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">
                                        Location
                                    </span>

                                    <span>
                                        {user.location || "Not specified"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">
                                        Availability
                                    </span>

                                    <span>
                                        {user.availability || "Not specified"}
                                    </span>
                                </div>

                            </div>

                            {/* Skills - Dummy for now */}
                            <div className="mt-5">
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                    Skills
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {user.skills.split(",").map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md"
                                        >
                                            {skill.trim() || "No skills yet"}
                                        </span>
                                    ))}

                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

                                <button
                                    type="button"
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    View Profile
                                </button>

                                <button
                                    onClick={() => handleConnect(user.user.id)}
                                    disabled={connectingId === user.user.id}
                                    type="button"
                                    className="flex-1 bg-blue-600 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                                >
                                    {connectingId === user.user.id ? "Connecting..." : "Connect"}
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default Discover;