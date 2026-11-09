
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import HandleApiError from "../utils/HandleApiError";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";
import { FolderKanban } from "lucide-react";

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
            HandleApiError(error, showToast, "Something went wrong on fetching projects")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-24">
            <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-8">

                {/* Header */}
                <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-600">
                            <FolderKanban className="h-4 w-4" />
                            Explore projects
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Projects
                        </h1>
                    </div>

                    {projects.length > 0 && (
                        <button
                            onClick={() => navigate("/project/create")}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-700"
                        >
                            Create Project
                        </button>
                    )}
                </section>

                {/* Project Grid */}
                <section>
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Discover Projects
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Explore projects and find opportunities to collaborate.
                            </p>
                        </div>

                        <span className="shrink-0 rounded-lg bg-violet-100 px-2.5 py-1.5 text-xs font-semibold text-violet-700">
                            {projects.length} projects
                        </span>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {projects.map((project) => {
                            const status = statusConfig[project.status] || {
                                label: project.status || "Unknown",
                                className:
                                    "text-gray-600 bg-gray-50 border-gray-200",
                            };

                            return (
                                <article
                                    key={project.id}
                                    className="flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md sm:p-6"
                                >

                                    {/* Status */}
                                    <div>
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                                        >
                                            {status.label}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-gray-900">
                                        {project.title || "Untitled Project"}
                                    </h3>

                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                                        {project.description ||
                                            "No description provided."}
                                    </p>

                                    {/* Skills */}
                                    <div className="mt-5 flex-1">
                                        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Required Skills
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

                                    {/* Owner */}
                                    <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-sm font-medium text-violet-700">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-sm font-medium text-violet-700">
                                                <Avatar
                                                    src={project.owner.profile.profile_picture}
                                                    name={project.owner.username}
                                                    size="h-10 w-10"
                                                />
                                            </div>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-gray-800">
                                                {project.owner?.username ||
                                                    "Unknown user"}
                                            </p>

                                            <p className="mt-0.5 text-xs text-gray-400">
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
                                        onClick={() => navigate(`/projects/${project.id}`)}
                                        className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                                    >
                                        View Project
                                    </button>

                                </article>
                            );
                        })}

                    </div>
                </section>

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                            <svg
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.6}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h6l2 2h8.5v9.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9.5a2 2 0 0 1 2-2Z"
                                />
                            </svg>
                        </div>

                        <h3 className="mt-4 text-base font-semibold text-gray-900">
                            No projects yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            Be the first to share an idea and find people to
                            build it with.
                        </p>

                        <button
                            onClick={() => navigate("/project/create")}
                            className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700"
                        >
                            Create Project
                        </button>

                    </div>
                )}

            </div>
        </div >
    );
};

export default Projects;
