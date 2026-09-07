import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const ProfileView = () => {
    const [connectionProfile, setConnectionProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const { userId } = useParams();

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await api.get(`connection/my-connections/profile/${userId}/`);
            setConnectionProfile(response.data);
            console.log("USER ID:", userId);
            console.log("PROFILE RESPONSE:", response.data);
            console.log(connectionProfile);

        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Something went wrong on fetching connection's profile");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [userId])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Loading...
                </p>
            </div>
        );
    }

    if (!connectionProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="mx-auto max-w-5xl px-5 sm:px-8">

                <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Discover
                    </span>
                </div>

                <div className="grid gap-6 lg:grid-cols-[320px_1fr] items-start">

                    {/* Left column — profile card */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">

                            {connectionProfile?.profile_picture ? (
                                <img
                                    src={`http://127.0.0.1:8000${connectionProfile.profile_picture}`}
                                    alt={connectionProfile?.name || "Profile"}
                                    className="w-24 h-24 rounded-full object-cover border border-gray-200 mx-auto"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full border border-gray-200 mx-auto flex items-center justify-center text-2xl font-semibold">
                                    {connectionProfile.user.username.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className="mt-4 text-center">
                                {/* <h1 className="text-lg font-semibold text-gray-900">
                                    {profile.name}
                                </h1> */}
                                <p className="mt-1 text-sm text-gray-500">
                                    {connectionProfile.role || "No role set"}
                                </p>

                                <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    {connectionProfile.location || "Location not set"}
                                </div>
                            </div>

                            <p className="mt-5 text-sm leading-6 text-gray-600 text-center">
                                {connectionProfile.bio}
                            </p>

                            {/* Connection status */}
                            <div className="mt-6 flex items-center justify-center gap-1.5 rounded-lg bg-green-50 border border-green-100 px-4 py-2.5">
                                <svg
                                    className="w-4 h-4 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-green-700">
                                    Connected
                                </span>
                            </div>

                            <button
                                type="button"
                                className="mt-2.5 w-full rounded-lg px-4 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                            >
                                Message
                            </button>

                            {/* Social links */}
                            {/* <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                                {profile.links.map((link) => (
                                    <div
                                        key={link.label}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="text-gray-500">
                                            {link.label}
                                        </span>
                                        <span className="font-medium text-gray-700">
                                            {link.handle}
                                        </span>
                                    </div>
                                ))}
                            </div> */}

                        </div>
                    </div>

                    {/* Right column — details */}
                    <div className="space-y-6">

                        {/* About */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                About
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                {connectionProfile.bio || "Bio not set"}
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Skills
                            </h2>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {connectionProfile.skills ? (
                                    connectionProfile.skills.split(",").map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md"
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500">
                                        No skills added yet
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Collaboration interests */}
                        {/* <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Collaboration interests
                            </h2>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {profile.interests.map((interest) => (
                                    <span
                                        key={interest}
                                        className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-md"
                                    >
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div> */}

                        {/* Experience */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Experience
                            </h2>

                            <div className="mt-4">
                                {connectionProfile?.experience ? (
                                    <p className="text-sm leading-6 text-gray-600 whitespace-pre-line">
                                        {connectionProfile.experience || "Experience not set"}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No experience added yet
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProfileView;