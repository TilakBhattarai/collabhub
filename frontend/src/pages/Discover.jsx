import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

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
    }, []);

    const handleConnect = async (receiver_id) => {
        setConnectingId(receiver_id);

        try {
            await api.post(
                "connection/",
                {
                    receiver: receiver_id
                }
            );

            setUser((prev) =>
                prev.filter((user) => user.user.id !== receiver_id)
            );

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
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUser();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-500">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Discover
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Find people to build with.
                    </p>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="mb-10">
                    <div className="flex flex-col gap-3 lg:flex-row">

                        <input
                            type="search"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Search by username"
                            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                        />

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
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
                            className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                        >
                            <option value="">Location</option>
                            <option value="Nepal">Nepal</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                        </select>

                        <select
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                        >
                            <option value="">Skills</option>
                            <option value="React">React</option>
                            <option value="Django">Django</option>
                            <option value="Flutter">Flutter</option>
                            <option value="Figma">Figma</option>
                        </select>

                        <select
                            value={lookingFor}
                            onChange={(e) => setLookingFor(e.target.value)}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                        >
                            <option value="">Looking for</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="">Any Collaborator</option>
                        </select>

                        <button
                            type="submit"
                            className="rounded-md bg-violet-600 px-6 py-2.5 cursor-pointer text-sm font-medium text-white hover:bg-violet-700 transition"
                        >
                            Search
                        </button>

                    </div>
                </form>

                {/* Users */}
                {users.length === 0 ? (
                    <div className="border-t border-gray-200 py-16 text-center">
                        <h3 className="text-base font-semibold text-gray-900">
                            No people found
                        </h3>

                        <p className="mt-2 mx-auto max-w-sm text-sm leading-6 text-gray-500">
                            Try changing your search or filters to find more
                            people to collaborate with.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {users.map((user) => (
                            <div
                                key={user.user.id}
                                className="flex flex-col border border-gray-200 bg-white p-5 rounded-md"
                            >

                                {/* User Header */}
                                <div className="flex items-center gap-4">

                                    {user.profile_picture ? (
                                        <img
                                            src={`http://127.0.0.1:8000${user.profile_picture}`}
                                            alt={user.user.username}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-base font-semibold">
                                            {user.user.username
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <h2 className="text-sm font-semibold text-gray-900 truncate">
                                            {user.user.username}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500 truncate">
                                            {user.role || "No role specified"}
                                        </p>
                                    </div>

                                </div>

                                {/* Bio */}
                                <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                                    {user.bio || "No bio available."}
                                </p>

                                {/* Information */}
                                <div className="mt-5 space-y-2 text-sm">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500">
                                            Location
                                        </span>

                                        <span className="text-gray-700 text-right">
                                            {user.location || "Not specified"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500">
                                            Availability
                                        </span>

                                        <span className="text-gray-700 text-right">
                                            {user.availability || "Not specified"}
                                        </span>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mt-5">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Skills
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {user.skills ? (
                                            user.skills
                                                .split(",")
                                                .map((skill) => skill.trim())
                                                .filter(Boolean)
                                                .map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2.5 py-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))
                                        ) : (
                                            <p className="text-sm text-gray-400">
                                                No skills listed
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/my-connections/profile/${user.user.id}`
                                            )
                                        }
                                        type="button"
                                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                                    >
                                        View Profile
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleConnect(user.user.id)
                                        }
                                        disabled={
                                            connectingId === user.user.id
                                        }
                                        type="button"
                                        className="flex-1 rounded-md bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 transition cursor-pointer disabled:opacity-60"
                                    >
                                        {connectingId === user.user.id
                                            ? "Connecting..."
                                            : "Connect"}
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