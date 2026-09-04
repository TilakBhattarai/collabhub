import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const [error, setError] = useState('');

    const navigate = useNavigate();



    useEffect(() => {
        const fetchProfile = async () => {

            const token = localStorage.getItem("accessToken");
            if (!token) {
                showToast("An error has occured");
                navigate("/login");
                return;
            }

            try {
                const response = await api.get("profile/")
                setProfile(response.data);
                console.log(response.data);
            } catch (error) {
                if (error.response?.status == 404) {
                    setError("Your profile hasn't been created yet!");
                    showToast("Your profile hasn't been created yet!");
                } else if (error.response?.status == 401) {
                    setError("You are not authenticated");
                    showToast("You are not authenticated");
                } else {
                    setError("Something went wrong while looading your profile");
                    showToast("Something went wrong while loading your profile");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    const username = profile.user?.username || 'User';
    const email = profile.user?.email || "No email";
    const firstChar = username.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto">

                {/* Profile Header */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                        <div className="flex items-center gap-5">
                            {/* Profile Image */}
                            {profile.profile_picture ? (
                                <img
                                    src={`http://127.0.0.1:8000${profile.profile_picture}`}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-semibold">
                                    {firstChar}
                                </div>
                            )}

                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    {profile.user.username || "Anonymous"}
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    {profile.role || "No role set"}
                                </p>
                            </div>
                        </div>

                        <Link to="/edit" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                            Edit Profile
                        </Link>
                    </div>
                </div>


                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                    {/* About */}
                    <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            About
                        </h2>

                        <p className="text-gray-600 mt-3 leading-7">
                            {profile.bio || "No bio set"}
                        </p>
                    </div>


                    {/* Availability */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Availability
                        </h2>

                        <p className="text-gray-600 mt-3">
                            {profile.availability || "No avaibility set"}
                        </p>
                    </div>


                    {/* Experience */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Experience
                        </h2>

                        <p className="text-gray-600 mt-3 leading-7">
                            {profile.experience || "No experience set"}
                        </p>
                    </div>


                    {/* Looking For */}
                    <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Looking For
                        </h2>

                        <p className="text-gray-600 mt-3 leading-7">
                            {profile.looking_for || "Not set"}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="md:col-span-3 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Skills
                        </h2>

                        {profile.skills ? (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {profile.skills.split(",").map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md"
                                    >
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-3">
                                No skills added
                            </p>
                        )}
                    </div>


                    {/* Links */}
                    <div className="md:col-span-3 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Links
                        </h2>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <a
                                href={profile.portfolio}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                {profile.portfolio || "No links added"}
                            </a>

                            <a
                                href={profile.github}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                {profile.github || "No links added"}
                            </a>

                        </div>
                    </div>


                    {/* Account Information */}
                    <div className="md:col-span-3 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Account Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Username
                                </p>

                                <p className="text-gray-900 mt-1 font-medium">
                                    {username}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="text-gray-900 mt-1 font-medium">
                                    {email}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default Profile;