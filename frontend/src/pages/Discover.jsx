
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import HandleApiError from "../utils/HandleApiError";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";
import { Users } from "lucide-react";

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
            console.log(response.data)
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load data. Please refresh or try again.")
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
            HandleApiError(error, showToast, "Unable to complete request. Please try again.")
        } finally {
            setConnectingId(null);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUser();
    };

    if (loading) {
        return <Loading />;
    }


    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-600">
                        <Users className="h-4 w-4" />
                        Find collaborators
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Discover
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
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
                <section>
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                People
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Find developers to collaborate with.
                            </p>
                        </div>

                        <span className="shrink-0 rounded-lg bg-violet-100 px-2.5 py-1.5 text-xs font-semibold text-violet-700">
                            {users.length} people
                        </span>
                    </div>

                    {users.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center">
                            <h3 className="text-base font-semibold text-gray-900">
                                No people found
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                Try changing your search or filters to find more
                                people to collaborate with.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {users.map((user) => (
                                <div
                                    key={user.user.id}
                                    className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-sm"
                                >

                                    {/* User Header */}
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            src={user.profile_picture}
                                            name={user.user.username}
                                            size="h-12 w-12"
                                        />

                                        <div className="min-w-0">
                                            <h2 className="truncate text-base font-semibold text-gray-900">
                                                {user.user.username}
                                            </h2>

                                            <p className="mt-0.5 truncate text-sm text-gray-500">
                                                {user.role || "No role specified"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="mt-4 text-sm leading-6 text-gray-600 line-clamp-2">
                                        {user.bio || "No bio available."}
                                    </p>

                                    {/* Information */}
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between gap-3 text-sm">
                                            <span className="text-gray-500">
                                                Location
                                            </span>

                                            <span className="text-right text-gray-700">
                                                {user.location || "Not specified"}
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-3 text-sm">
                                            <span className="text-gray-500">
                                                Availability
                                            </span>

                                            <span className="text-right text-gray-700">
                                                {user.availability || "Not specified"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mt-4 flex-1">
                                        <p className="mb-2 text-xs font-semibold text-gray-500">
                                            Skills
                                        </p>

                                        <div className="flex flex-wrap gap-1.5">
                                            {user.skills ? (
                                                user.skills
                                                    .split(",")
                                                    .map((skill) => skill.trim())
                                                    .filter(Boolean)
                                                    .map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
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
                                    <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/profile/${user.user.id}`
                                                )
                                            }
                                            type="button"
                                            className="flex-1 cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
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
                                            className="flex-1 cursor-pointer rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
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
                </section>

            </div>
        </div>
    );
};

export default Discover;
