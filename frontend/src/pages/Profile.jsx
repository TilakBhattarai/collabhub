import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                showToast("An error has occurred");
                navigate("/login");
                return;
            }

            try {
                const response = await api.get("profile/");
                setProfile(response.data);
            } catch (error) {
                if (error.response?.status == 404) {
                    setError("Your profile hasn't been created yet!");
                    showToast("Your profile hasn't been created yet!");
                } else if (error.response?.status == 401) {
                    setError("You are not authenticated");
                    showToast("You are not authenticated");
                } else {
                    setError("Something went wrong while loading your profile");
                    showToast("Something went wrong while loading your profile");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-sm text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    const username = profile.user?.username || "User";
    const email = profile.user?.email || "No email";
    const firstChar = username.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="mx-auto max-w-5xl px-5 sm:px-8">

                {/* Header */}
                <div className="flex flex-col gap-6 border-b border-gray-200 pb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-5">

                        {profile.profile_picture ? (
                            <img
                                src={`http://127.0.0.1:8000${profile.profile_picture}`}
                                alt="Profile"
                                className="h-20 w-20 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-2xl font-semibold text-violet-700">
                                {firstChar}
                            </div>
                        )}

                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {username}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {profile.role || "No role set"}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                {profile.location || "Location not set"}
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/edit"
                        className="inline-flex w-fit items-center rounded-md bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
                    >
                        Edit Profile
                    </Link>
                </div>


                {/* About */}
                <section className="border-b border-gray-200 py-8">
                    <h2 className="text-sm font-semibold text-gray-900">
                        About
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
                        {profile.bio || "No bio set"}
                    </p>
                </section>


                {/* Details */}
                <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">

                    {/* Availability */}
                    <section className="border-b border-gray-200 py-7">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Availability
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            {profile.availability || "No availability set"}
                        </p>
                    </section>


                    {/* Experience */}
                    <section className="border-b border-gray-200 py-7">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Experience
                        </h2>

                        <p className="mt-2 text-sm leading-7 text-gray-600">
                            {profile.experience || "No experience set"}
                        </p>
                    </section>


                    {/* Looking For */}
                    <section className="border-b border-gray-200 py-7 md:col-span-2">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Looking For
                        </h2>

                        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
                            {profile.looking_for || "Not set"}
                        </p>
                    </section>


                    {/* Skills */}
                    <section className="border-b border-gray-200 py-7 md:col-span-2">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Skills
                        </h2>

                        {profile.skills ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {profile.skills
                                    .split(",")
                                    .map((skill, index) => (
                                        <span
                                            key={index}
                                            className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600"
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))}
                            </div>
                        ) : (
                            <p className="mt-2 text-sm text-gray-500">
                                No skills added
                            </p>
                        )}
                    </section>


                    {/* Links */}
                    <section className="border-b border-gray-200 py-7 md:col-span-2">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Links
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-3">

                            {profile.portfolio ? (
                                <a
                                    href={profile.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    Portfolio
                                </a>
                            ) : null}

                            {profile.github ? (
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    GitHub
                                </a>
                            ) : null}

                            {!profile.portfolio && !profile.github && (
                                <p className="text-sm text-gray-500">
                                    No links added
                                </p>
                            )}

                        </div>
                    </section>


                    {/* Account Information */}
                    <section className="py-7 md:col-span-2">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Account Information
                        </h2>

                        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Username
                                </p>

                                <p className="mt-2 text-sm font-medium text-gray-900">
                                    {username}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Email
                                </p>

                                <p className="mt-2 text-sm font-medium text-gray-900">
                                    {email}
                                </p>
                            </div>

                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

export default Profile;