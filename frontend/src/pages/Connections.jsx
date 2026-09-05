import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";

export default function Connections() {
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchConnections = async () => {
            setLoading(true);
            try {
                const response = await api.get(
                    "connection/requests/",
                );
                setConnections(response.data);
                console.log(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    showToast("You are not authenticated");
                } else if (error.response?.data?.error) {
                    showToast(error.response.data.error);
                } else {
                    showToast("Something went wrong on fetching connections");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, []);

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
        <div className="min-h-screen bg-gray-50 px-4 pb-12 pt-24">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Connections
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your connection requests and network.
                    </p>
                </div>

                {/* Connection Requests */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Connection Requests
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                People who want to connect with you.
                            </p>
                        </div>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                            {connections.length} pending
                        </span>
                    </div>

                    <div className="space-y-4">

                        {connections.map((user) => (
                            <div
                                key={user.id}
                                className="rounded-xl border border-gray-200 bg-white p-5"
                            >
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                    {/* User Info */}
                                    <div className="flex min-w-0 gap-4">

                                        {/* Avatar */}
                                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-900">
                                            {user.sender.profile.profile_picture ? (
                                                <img
                                                    src={`http://127.0.0.1:8000${user.sender.profile.profile_picture}`}
                                                    alt={user.sender.username}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                                                    {user.sender.username.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="min-w-0">

                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <h3 className="font-semibold text-gray-900">
                                                    {user.sender.username}
                                                </h3>
                                            </div>

                                            <p className="mt-1 text-sm text-gray-600">
                                                {user.sender.profile.role || "No role set"}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {user.sender.profile.location || "No location set"}
                                            </p>

                                            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                                                {user.sender.profile.bio || "No bio set"}
                                            </p>

                                            {/* Skills */}
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {user.sender.profile.skills ? (
                                                    user.sender.profile.skills
                                                        .split(",")
                                                        .map((skill) => skill.trim())
                                                        .filter(Boolean)
                                                        .map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))
                                                ) : (
                                                    null
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex shrink-0 gap-2 sm:pt-1">
                                        <button
                                            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                                        >
                                            Accept
                                        </button>

                                        <button
                                            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {connections.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
                                <p className="text-sm font-medium text-gray-700">
                                    No connection requests
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    You don't have any pending requests right now.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* existing map */}
                            </div>
                        )}

                    </div>
                </section>

                {/* Your Connections - UI only for now */}
                {/* <section className="mt-12">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Your Connections
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            People you are already connected with.
                        </p>
                    </div>

                    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
                        <p className="text-sm font-medium text-gray-700">
                            No connections to display yet.
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Accepted connections will appear here.
                        </p>
                    </div>
                </section> */}

            </div>
        </div>
    );
}