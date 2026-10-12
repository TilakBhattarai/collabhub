import { useNavigate } from "react-router-dom";
import { Bell, FolderOpen, UserPlus, Users, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import HandleApiError from "../utils/HandleApiError";
import Loading from "../components/Loading";
import api from "../api/axios";
import { useNotification } from "../context/NotificationContext";
import { formatTime } from "../utils/formatTime";

const statusStyles = {
    "LOOKING FOR CONTRIBUTORS": "bg-violet-50 text-violet-700",
    "IN PROGRESS": "bg-amber-50 text-amber-800",
    COMPLETED: "bg-green-50 text-green-800",
};

function Dashboard() {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myProjects, setMyProjects] = useState([]);
    const [connectionRequests, setConnectionRequests] = useState([]);
    const [myConnections, setMyConnections] = useState([]);
    const [acceptConnectionID, setAcceptConnectionID] = useState("");
    const [rejectConnectionID, setRejectConnectionID] = useState("");
    const [initialLoading, setInitialLoading] = useState(false);
    const [joinRequests, setJoinRequests] = useState([]);
    const [processingId, setProcessingId] = useState(null);
    const { fetchNotifications, notifications } = useNotification();

    const fetchProfile = async () => {
        try {
            const response = await api.get("profile/");
            setProfile(response.data);
        } catch (error) {
            HandleApiError(
                error,
                showToast,
                "Couldn't load profile. Please try again.",
                {
                    401: "Please log in to view your profile.",
                    404: "Your profile hasn't been created yet!",
                }
            );
        }
    };

    const fetchMyProjects = async () => {
        try {
            const response = await api.get(
                "projects/my_projects/"
            );

            setMyProjects(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load your projects. Please try again.")
        }
    };

    const fetchConnections = async () => {
        try {
            const response = await api.get("connection/my-connections/");
            setMyConnections(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load connections. Please try again.");
        }
    };

    const fetchConnectionRequests = async () => {
        try {
            const response = await api.get("connection/requests/");
            setConnectionRequests(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Something went wrong on fetching connections requests");
        }
    };

    const fetchJoinRequests = async () => {
        try {
            const response = await api.get("projects/request/owner_requests/");
            setJoinRequests(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load requests. Please try again.");
        }
    };

    useEffect(() => {
        const loadDashboard = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                showToast("An error has occurred");
                navigate("/login");
                return;
            }
            try {
                await Promise.all([
                    fetchProfile(),
                    fetchMyProjects(),
                    fetchConnections(),
                    fetchConnectionRequests(),
                    fetchJoinRequests(),
                    fetchNotifications(),
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const acceptConnection = async (connection_id) => {
        setAcceptConnectionID(connection_id);
        setInitialLoading(true);

        try {
            await api.post("connection/requests/accept", {
                connection_id: connection_id,
            });

            setConnectionRequests((prev) =>
                prev.filter(
                    (request) => Number(request.id) !== Number(connection_id)
                )
            );

            await fetchConnections();

            showToast("Connection accepted");
        } catch (error) {
            HandleApiError(error, showToast, "Failed to accept connection. Please try again.");
        } finally {
            setInitialLoading(false);
        }
    };

    const rejectConnection = async (connection_id) => {
        setRejectConnectionID(connection_id);
        setInitialLoading(true);

        try {
            await api.post("connection/requests/reject", {
                connection_id: connection_id,
            });

            showToast("Connection rejected successfully");

            setConnectionRequests((prev) =>
                prev.filter((request) => Number(request.id) !== Number(connection_id))
            );
        } catch (error) {
            HandleApiError(error, showToast, "Failed to reject connection. Please try again.");
        } finally {
            setInitialLoading(false);
        }
    };

    const handleAccept = async (requestId) => {
        setProcessingId(requestId);
        try {
            await api.post(`projects/request/${requestId}/accept/`);
            setJoinRequests((prev) =>
                prev.filter((request) => Number(request.id) !== Number(requestId))
            );
            showToast("Request accepted successfully");
        } catch (error) {
            HandleApiError(error, showToast, "Failed to accept the request. Please try again.", {
                403: "You are not authorized to accept this request",
                400: error.response?.data?.error || "This request cannot be accepted",
            });
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (requestId) => {
        setProcessingId(requestId);
        try {
            await api.post(`projects/request/${requestId}/reject/`);
            setJoinRequests((prev) =>
                prev.filter((request) => Number(request.id) !== Number(requestId))
            );
            showToast("Request rejected successfully");
        } catch (error) {
            HandleApiError(error, showToast, "Failed to reject the request. Please try again.", {
                403: "You are not authorized to reject this request",
                400: error.response?.data?.error || "This request cannot be rejected",
            });
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return <Loading />;
    }

    const stats = [
        { label: "Projects", value: myProjects?.length, icon: FolderOpen },
        { label: "Teams", value: 1, icon: Users },
        { label: "Connections", value: myConnections?.length, icon: Users },
        { label: "Pending Requests", value: joinRequests?.length, icon: UserPlus },
    ];

    return (
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back, {profile?.user?.username}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Here's what's happening with your work.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/project/create")}
                    className="w-full rounded-md bg-violet-600 cursor-pointer px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
                >
                    Create Project
                </button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div
                        key={label}
                        className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 sm:p-5"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-2xl font-semibold text-gray-900">
                                {value}
                            </p>
                            <Icon className="h-5 w-5 shrink-0 text-violet-600" />
                        </div>
                        <p className="mt-1 break-words text-sm text-gray-500">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                {/* Left column */}
                <div className="min-w-0 space-y-6 lg:col-span-2">
                    {/* Incoming join requests */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-5">
                            <h2 className="text-base font-medium text-gray-900 sm:text-lg">
                                Incoming Join Requests
                            </h2>
                            {joinRequests.length > 0 && (
                                <button
                                    onClick={() => navigate("/projects/request")}
                                    className="shrink-0 cursor-pointer text-sm font-medium text-violet-600 hover:text-violet-700"
                                >
                                    View all
                                </button>
                            )}
                        </div>

                        <ul className="divide-y divide-gray-100">
                            {joinRequests.length === 0 && (
                                <li className="px-4 py-10 text-center sm:px-5">
                                    <p className="text-sm font-medium text-gray-900">
                                        No join requests
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        When someone asks to join your projects, it will show up here.
                                    </p>
                                </li>
                            )}

                            {joinRequests.map((req) => (
                                <li
                                    key={req.id}
                                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
                                >
                                    <div className="flex min-w-0 flex-1 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
                                            {req.sender.profile?.profile_picture ? (
                                                <img
                                                    src={req.sender.profile.profile_picture}
                                                    alt={req.sender.username}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                (req.sender.username?.charAt(0) || "?").toUpperCase()
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-gray-900">
                                                {req.sender.username}
                                            </p>
                                            <p className="break-words text-sm text-gray-500">
                                                {req.sender.profile?.role || "Role not set"} · wants to join{" "}
                                                <span className="font-medium text-gray-700">
                                                    {req.project_details?.title}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-2 sm:w-auto">
                                        <button
                                            onClick={() => handleReject(req.id)}
                                            disabled={processingId === req.id}
                                            className="flex-1 cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleAccept(req.id)}
                                            disabled={processingId === req.id}
                                            className="flex-1 cursor-pointer rounded-md bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                                        >
                                            {processingId === req.id ? "Processing..." : "Accept"}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* My projects */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-5">
                            <h2 className="text-lg font-medium text-gray-900">
                                My Projects
                            </h2>

                            {myProjects.length > 0 && (
                                <button
                                    onClick={() => navigate("/myprojects")}
                                    className="shrink-0 cursor-pointer text-sm font-medium text-violet-600 hover:text-violet-700"
                                >
                                    View all
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5">
                            {myProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex min-w-0 flex-col gap-3 rounded-lg border border-gray-200 p-4"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            {project.title}
                                        </h3>
                                        <span
                                            className={`max-w-full break-words rounded px-2 py-1 text-[10px] font-semibold ${statusStyles[project.status] || "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>

                                    <p className="line-clamp-2 text-sm text-gray-500">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5">
                                        {project.required_skills ? (
                                            project.required_skills
                                                .split(",")
                                                .map((skill) => skill.trim())
                                                .filter(Boolean)
                                                .map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
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

                                    <p className="text-sm text-gray-500">
                                        {project.members !== undefined && `${project.members} members · `}
                                        {project.visibility}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="min-w-0 space-y-6 lg:col-span-1">
                    {/* Connection requests */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-5">
                            <h2 className="text-base font-medium text-gray-900 sm:text-lg">
                                Connection Requests
                            </h2>
                            <span className="shrink-0 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700">
                                {connectionRequests.length}
                            </span>
                        </div>

                        <ul className="divide-y divide-gray-100">
                            {connectionRequests.length === 0 && (
                                <li className="px-4 py-8 text-center sm:px-5">
                                    <p className="text-sm font-medium text-gray-900">
                                        No connection requests
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        New requests will show up here.
                                    </p>
                                </li>
                            )}

                            {connectionRequests.map((request) => (
                                <li
                                    key={request.id}
                                    className="flex min-w-0 items-center gap-3 px-4 py-4 sm:px-5"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                                        {(request.sender.username?.charAt(0) || "?").toUpperCase()}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {request.sender.username}
                                        </p>
                                        <p className="truncate text-xs text-gray-500">
                                            {request.sender.profile?.role || "Role not set"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => rejectConnection(request.id)}
                                        disabled={initialLoading}
                                        aria-label={`Reject ${request.sender.username}`}
                                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-300 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {initialLoading && rejectConnectionID === request.id ? (
                                            "..."
                                        ) : (
                                            <X className="h-4 w-4 text-gray-700" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => acceptConnection(request.id)}
                                        disabled={initialLoading}
                                        aria-label={`Accept ${request.sender.username}`}
                                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-violet-600 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {initialLoading && acceptConnectionID === request.id ? (
                                            "..."
                                        ) : (
                                            <Check className="h-4 w-4 text-white" />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recent activity */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-5">
                            <h2 className="text-lg font-medium text-gray-900">
                                Recent Activity
                            </h2>
                            {notifications.length > 5 && (
                                <button
                                    onClick={() => navigate("/notifications")}
                                    className="flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700"
                                >
                                    <Bell className="h-4 w-4" />
                                    See more
                                </button>
                            )}
                        </div>

                        <ul className="divide-y divide-gray-100">
                            {notifications.length === 0 && (
                                <li className="px-4 py-8 text-center sm:px-5">
                                    <p className="text-sm font-medium text-gray-900">
                                        No recent activity
                                    </p>
                                </li>
                            )}

                            {notifications.slice(0, 5).map((item) => (
                                <li
                                    key={item.id}
                                    className="flex min-w-0 gap-3 px-4 py-4 sm:px-5"
                                >
                                    <span
                                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!item.is_read ? "bg-violet-600" : "bg-gray-300"
                                            }`}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className={`break-words text-sm ${!item.is_read ? "text-gray-900" : "text-gray-500"
                                                }`}
                                        >
                                            {item.message}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            {formatTime(item.created_at)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;