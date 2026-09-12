import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const statusConfig = {
    LOOKING_FOR_CONTRIBUTERS: {
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

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();
    const navigate = useNavigate();

    const fetchProjects = async () => {
        setLoading(true);

        try {
            const response = await api.get("projects/");
            setProjects(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Something went wrong on fetching projects");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-500">
                    Loading projects...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-20">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Projects
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Find projects to join and build something together.
                        </p>
                    </div>

                    {projects.length > 0 && (
                        <button
                            onClick={() => navigate("create/")}
                            className="rounded-md bg-violet-600 px-4 py-2.5 text-sm font-medium text-white cursor-pointer hover:bg-violet-700 transition"
                        >
                            Create Project
                        </button>
                    )}
                </div>

                {/* Project Grid */}
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                    {projects.map((project) => {
                        const status = statusConfig[project.status] || {
                            label: project.status || "Unknown",
                            className:
                                "text-gray-600 bg-gray-50 border-gray-200",
                        };

                        return (
                            <div
                                key={project.id}
                                className="flex flex-col border border-gray-200 bg-white rounded-md p-5"
                            >

                                {/* Status */}
                                <div>
                                    <span
                                        className={`inline-block rounded-md border px-2.5 py-1 text-xs font-medium ${status.className}`}
                                    >
                                        {status.label}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="mt-4 text-base font-semibold text-gray-900">
                                    {project.title || "Untitled Project"}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500 line-clamp-3">
                                    {project.description ||
                                        "No description provided."}
                                </p>

                                {/* Skills */}
                                <div className="mt-5">
                                    <p className="mb-2 text-xs font-medium text-gray-500">
                                        Required skills
                                    </p>

                                    <div className="flex flex-wrap gap-2">
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
                                </div>

                                {/* Owner */}
                                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-700">
                                        {project.owner?.username
                                            ?.charAt(0)
                                            ?.toUpperCase() || "?"}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-gray-800">
                                            {project.owner?.username ||
                                                "Unknown user"}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Created{" "}
                                            {project.created_at
                                                ? new Date(
                                                    project.created_at
                                                ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "recently"}
                                        </p>
                                    </div>
                                </div>

                                {/* View */}
                                <button
                                    className="mt-5 w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    View Project
                                </button>

                            </div>
                        );
                    })}

                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="mt-8 border-t border-gray-200 py-16 text-center">

                        <h3 className="text-base font-semibold text-gray-900">
                            No projects yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            Be the first to share an idea and find people to
                            build it with.
                        </p>

                        <button
                            onClick={() => navigate("create/")}
                            className="mt-5 rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white cursor-pointer hover:bg-violet-700 transition"
                        >
                            Create Project
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Projects;