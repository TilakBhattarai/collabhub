import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";

const Discover = () => {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const [connectingId, setConnectingId] = useState(null);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState("");
    const [lookingFor, setLookingFor] = useState("");

    const fetchUser = async () => {
        try {
            const response = await api.get(
                "profile/discover/",
                {
                    params: {
                        username: username,
                        role: role,
                        location: location,
                        looking_for: lookingFor,
                        skills: skills
                    }
                }
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

    useEffect(() => {
        fetchUser();
    }, [])

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

            setUser((prev) =>
                prev.filter((user) => user.user.id !== receiver_id)
            )

            showToast("Connection sent successfully");
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Something went wrong");
            }
        } finally {
            setConnectingId(null);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUser();

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

                <form onSubmit={handleSearch} className="mb-10">

                    {/* Search */}
                    <div className="relative mb-5">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <input
                            type="search"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Search by name"
                            className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm"
                        >
                            <option value="">Role</option>
                            <option value="Full-Stack Developer">Full-Stack Developer</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                        </select>

                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20">
                            <option value="">Location</option>
                            <option value="Nepal">Nepal</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                        </select>

                        <select
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20">
                            <option value="">Skills</option>
                            <option value="React">React</option>
                            <option value="Django">Django</option>
                            <option value="Flutter">Flutter</option>
                            <option value="Figma">Figma</option>
                        </select>

                        <select
                            value={lookingFor}
                            onChange={(e) => setLookingFor(e.target.value)}
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20">
                            <option value="">Looking for</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Develper</option>
                            <option value="Designer">Designer</option>
                            <option value="">Any Collaborator</option>
                        </select>

                        <button
                            type="submit"
                            className="rounded-lg bg-gray-900 px-5 py-2 cursor-pointer text-sm font-medium text-white hover:bg-gray-800 transition"
                        >
                            Search
                        </button>

                    </div>
                </form>

                {/* Users */}
                {users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <span className="text-2xl">🔍</span>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">
                            No one to discover yet
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 max-w-sm">
                            There aren't any profiles matching right now. Check back later or update your own profile to get noticed.
                        </p>
                    </div>
                ) : (
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

                                <div className="mt-5">
                                    {user.skills && (
                                        <p className="text-sm font-medium text-gray-700 mb-2">Skill</p>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {user.skills ? (
                                            user.skills
                                                .split(",")
                                                .map((skill) => skill.trim())
                                                .filter(Boolean)
                                                .map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))
                                        ) : (
                                            <p>No skills</p>
                                        )}

                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

                                    <button
                                        type="button"
                                        className="flex-1 border border-gray-300 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        View Profile
                                    </button>

                                    <button
                                        onClick={() => handleConnect(user.user.id)}
                                        disabled={connectingId === user.user.id}
                                        type="button"
                                        className="flex-1 bg-blue-600 rounded-lg px-3 py-2 cursor-pointer text-sm font-medium text-white hover:bg-blue-700 transition"
                                    >
                                        {connectingId === user.user.id ? "Connecting..." : "Connect"}
                                    </button>

                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Discover;