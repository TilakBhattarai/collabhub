import { ChevronRight, ArrowLeft, FolderX } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetails() {
    const [project, setProject] = useState(null);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const { userId } = useAuth();
    const [sending, setSending] = useState(null);

    const projectDetail = async () => {
        setLoading(true);
        try {
            const response = await api.get(
                `projects/${projectId}/`,
            )
            setProject(response.data);
            // console.log(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Something went wrong on fetching detail");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        projectDetail();
    }, [])

    const visibilityConfig = {
        PUBLIC: "Public",
        PRIVATE: 'Private'
    }
    const statusConfig = {
        LOOKING_FOR_CONTRIBUTORS: {
            label: "Looking for Contributors",
            className: "text-violet-700 bg-violet-50 border-violet-100",
        },
        IN_PROGRESS: {
            label: "In Progress",
            className: "text-gray-600 bg-gray-50 border-gray-200",
        },
        COMPLETED: {
            label: "Completed",
            className: "text-gray-600 bg-gray-50 border-gray-200",
        },
    };

    const fetchRequests = async () => {
        try {
            const response = await api.get(
                `projects/request/`,
            )
            setRequests(response.data);
            // console.log(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Something went wrong on fetching requests");
            }
        }
    }

    const handleRequest = async (projectId) => {
        setSending(true);

        try {
            await api.post(
                "projects/request/",
                {
                    project: projectId
                }
            )

            await fetchRequests();
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Something went wrong on sending request");
            }
        } finally {
            setSending(false);
        }
    }

    const request = requests.find(
        (req) =>
            Number(req?.project?.id) === Number(project?.id)
    );

    useEffect(() => {
        fetchRequests()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-500">
                    Loading...
                </p>
            </div>
        );
    }

    const isOwner = Number(userId) === Number(project?.owner?.id);


    return (
        <div className="min-h-screen bg-white pt-20 pb-20">
            {/* Back */}

            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto px-6 pt-6">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 cursor-pointer text-sm text-gray-500 hover:text-violet-600 transition-colors mb-3"
                >
                    <ArrowLeft size={16} className="w-4 h-4" />
                    Back
                </button>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <span className="hover:text-violet-600 cursor-pointer transition-colors">Projects</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-gray-700">Project Details</span>
                </div>
            </div>

            {/* Main content */}
            {project ? (
                <div className="max-w-6xl mx-auto px-6 py-8">
                    {/* Header */}
                    <div className="border border-gray-200 rounded-lg p-6 mb-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                                    {project.title || "Title not set"}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-violet-50 text-violet-700">
                                        {statusConfig[project.status].label || "Status not set"}
                                    </span>
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-600">
                                        {visibilityConfig[project.visibility]}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Created{" "}
                                        {project.created_at
                                            ? new Date(project.created_at).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                            : "recently"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-200">
                            <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-sm font-medium text-violet-700 overflow-hidden">
                                {project.owner?.profile?.profile_picture ? (
                                    <img
                                        src={project.owner.profile.profile_picture}
                                        alt={project.owner.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    project.owner?.username?.charAt(0)?.toUpperCase() || "?"
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{project.owner.username}</p>
                                <p className="text-xs text-gray-500">Project owner</p>
                            </div>
                            <button
                                onClick={() => navigate(`/profile/${project.owner.id}`)}
                                className="text-sm text-violet-600 hover:bg-violet-50 px-3 py-1.5 cursor-pointer rounded-md transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left / main column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* About */}
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h2 className="text-base font-semibold text-gray-900 mb-3">
                                    About this project
                                </h2>
                                <p className="text-sm text-gray-600 leading-7">
                                    {project.description || "No description provided."}
                                </p>
                            </div>

                            {/* Required skills */}
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h2 className="text-base font-semibold text-gray-900 mb-3">
                                    Required skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.required_skills ? (
                                        project.required_skills
                                            .split(",")
                                            .map((skill) => skill.trim())
                                            .filter(Boolean)
                                            .map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-md"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                    ) : (
                                        <p className="text-sm text-gray-400">No skills listed</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right / sidebar column */}
                        <div className="space-y-6">
                            {/* Project information */}
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h2 className="text-sm font-semibold text-gray-900 mb-4">
                                    Project information
                                </h2>
                                <dl className="space-y-3">
                                    <InfoRow
                                        label="Visibility"
                                        value={visibilityConfig[project.visibility] || project.visibility}
                                    />
                                    <InfoRow
                                        label="Status"
                                        value={statusConfig[project.status]?.label || project.status || "Status not set"}
                                    />
                                    <InfoRow
                                        label="Created"
                                        value={
                                            project.created_at
                                                ? new Date(project.created_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })
                                                : "recently"
                                        }
                                    />
                                    <InfoRow
                                        label="Last updated"
                                        value={
                                            project.updated_at
                                                ? new Date(project.updated_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })
                                                : "recently"
                                        }
                                    />
                                    <InfoRow
                                        label="Owner"
                                        value={project.owner?.username || "Unknown user"}
                                    />
                                </dl>
                            </div>

                            {/* Join section */}
                            {!isOwner && (
                                <div className="border border-gray-200 rounded-lg p-6">

                                    <>
                                        <p className="text-sm font-medium text-gray-900 mb-1">
                                            Interested in contributing to this project?
                                        </p>

                                        <p className="text-xs text-gray-500 mb-4">
                                            Make sure your skills match the project requirements before
                                            sending a request.
                                        </p>

                                        {project.visibility === "PRIVATE" ? (
                                            <div className="rounded-md bg-gray-50 border border-gray-200 px-4 py-3 text-center">
                                                <p className="text-sm font-medium text-gray-700">
                                                    Private Project
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Join requests are not available for private projects.
                                                </p>
                                            </div>
                                        ) : !request ? (
                                            <button
                                                onClick={() => handleRequest(project.id)}
                                                disabled={sending}
                                                className="w-full text-sm font-medium py-2.5 cursor-pointer rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                                            >
                                                {sending ? "Sending..." : "Send Join Request"}
                                            </button>
                                        ) : request.status === "PENDING" ? (
                                            <button
                                                disabled
                                                className="w-full text-sm font-medium py-2.5 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                                            >
                                                Request Pending
                                            </button>
                                        ) : request.status === "ACCEPTED" ? (
                                            <button
                                                disabled
                                                className="w-full text-sm font-medium py-2.5 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                                            >
                                                Request Accepted
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRequest(project.id)}
                                                disabled={sending}
                                                className="w-full text-sm font-medium py-2.5 cursor-pointer rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                                            >
                                                {sending ? "Sending..." : "Request Again"}
                                            </button>
                                        )}
                                    </>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <FolderX className="w-5 h-5 text-gray-400" />
                    </div>
                    <h2 className="text-base font-semibold text-gray-900 mb-1">
                        Project not found
                    </h2>
                    <p className="text-sm text-gray-500 mb-6 max-w-sm">
                        This project may have been removed, or the link you followed isn't valid.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm font-medium text-violet-600 hover:bg-violet-50 px-4 py-2 rounded-md transition-colors"
                    >
                        Back to Projects
                    </button>
                </div>
            )
            }


        </div >
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <dt className="text-gray-500">{label}</dt>
            <dd className="text-gray-900 font-medium">{value}</dd>
        </div>
    );
}