import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { ArrowLeft } from "lucide-react";

const ProfileView = () => {
    const [connectionProfile, setConnectionProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();
    const { userId } = useParams();
    const navigate = useNavigate();

    const fetchProfile = async () => {
        setLoading(true);

        try {
            const response = await api.get(
                `connection/my-connections/profile/${userId}/`
            );

            setConnectionProfile(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast(
                    "Something went wrong on fetching connection's profile"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    if (loading || !connectionProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="mx-auto max-w-5xl px-5 sm:px-8">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                <div className="grid gap-10 lg:grid-cols-[280px_1fr]">

                    {/* Profile intro */}
                    <div>
                        <div className="flex items-center gap-4 lg:block">

                            {connectionProfile.profile_picture ? (
                                <img
                                    src={`http://127.0.0.1:8000${connectionProfile.profile_picture}`}
                                    alt={connectionProfile.user.username}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center text-2xl font-semibold text-violet-700">
                                    {connectionProfile.user.username
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}

                            <div className="mt-0 lg:mt-5">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {connectionProfile.user.username}
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    {connectionProfile.role || "No role set"}
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    {connectionProfile.location ||
                                        "Location not set"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm text-violet-700">
                            <span className="h-2 w-2 rounded-full bg-violet-600" />
                            Connected
                        </div>

                        <button
                            type="button"
                            className="mt-5 w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                        >
                            Message
                        </button>
                    </div>

                    {/* Details */}
                    <div className="space-y-10">

                        {/* About */}
                        <section>
                            <h2 className="text-sm font-semibold text-gray-900">
                                About
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-600">
                                {connectionProfile.bio ||
                                    "No bio added yet."}
                            </p>
                        </section>

                        <div className="border-t border-gray-200" />

                        {/* Skills */}
                        <section>
                            <h2 className="text-sm font-semibold text-gray-900">
                                Skills
                            </h2>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {connectionProfile.skills ? (
                                    connectionProfile.skills
                                        .split(",")
                                        .map((skill) => skill.trim())
                                        .filter(Boolean)
                                        .map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No skills added yet
                                    </p>
                                )}
                            </div>
                        </section>

                        <div className="border-t border-gray-200" />

                        {/* Experience */}
                        <section>
                            <h2 className="text-sm font-semibold text-gray-900">
                                Experience
                            </h2>

                            <div className="mt-3">
                                {connectionProfile.experience ? (
                                    <p className="text-sm leading-7 text-gray-600 whitespace-pre-line">
                                        {connectionProfile.experience}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No experience added yet
                                    </p>
                                )}
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;