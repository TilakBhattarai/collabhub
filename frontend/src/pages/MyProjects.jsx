
import {
    Plus,
    Users,
    Clock3,
    FolderKanban,
    Eye,
    Pencil,
    Trash2,
    Inbox,
    LayoutDashboard,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";
import HandleApiError from "../utils/HandleApiError";
import Loading from "../components/Loading";

const statusStyles = {
    IN_PROGRESS: {
        text: "In Progress",
        dot: "bg-amber-500",
        color: "text-amber-700",
        background: "bg-amber-50",
    },

    LOOKING_FOR_CONTRIBUTORS: {
        text: "Looking For Contributors",
        dot: "bg-violet-600",
        color: "text-violet-700",
        background: "bg-violet-50",
    },

    COMPLETED: {
        text: "Completed",
        dot: "bg-emerald-500",
        color: "text-emerald-700",
        background: "bg-emerald-50",
    },
};

const visibilityStyles = {
    PUBLIC: "Public",
    PRIVATE: "Private",
};

function StatCard({ stat }) {
    const Icon = stat.icon;

    return (
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {stat.label}
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                        {stat.value}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

export default function MyProjects() {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [myProjects, setmyProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const stats = [
        {
            label: "Total Projects",
            value: myProjects.length,
            icon: FolderKanban,
        },
        {
            label: "Looking for Contributors",
            value: myProjects.filter(
                (project) =>
                    project.status === "LOOKING_FOR_CONTRIBUTORS"
            ).length,
            icon: Users,
        },
        {
            label: "In Progress",
            value: myProjects.filter(
                (project) => project.status === "IN_PROGRESS"
            ).length,
            icon: Clock3,
        },
        {
            label: "Completed",
            value: myProjects.filter(
                (project) => project.status === "COMPLETED"
            ).length,
            icon: FolderKanban,
        },
    ];

    const fetchmyProjects = async () => {
        setLoading(true);

        try {
            const response = await api.get("projects/my_projects/");
            setmyProjects(response.data);
        } catch (error) {
            HandleApiError(
                error,
                showToast,
                "Failed to load your projects. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchmyProjects();
    }, []);

    const deleteProject = async (projectId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(projectId);
        setDeleting(true);

        try {
            await api.delete(`projects/${projectId}/`);

            setmyProjects((prevProjects) =>
                prevProjects.filter(
                    (project) => project.id !== projectId
                )
            );

            showToast("Project deleted successfully");
        } catch (error) {
            HandleApiError(
                error,
                showToast,
                "Failed to delete project. Please try again."
            );
        } finally {
            setDeleting(false);
            setDeletingId(null);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-24">
            <main className="mx-auto max-w-6xl space-y-8 px-5 sm:px-8">

                {/* Header */}
                <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-600">
                            <FolderKanban className="h-4 w-4" />
                            Your projects
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            My Projects
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            Manage the projects you're building and collaborating
                            on.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/projects/request"
                            className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            <Inbox className="h-4 w-4" />
                            Requests
                        </Link>

                        <button
                            onClick={() => navigate("/project/create")}
                            type="button"
                            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-700"
                        >
                            <Plus className="h-4 w-4" />
                            Create Project
                        </button>
                    </div>
                </section>

                {/* Statistics */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.label}
                            stat={stat}
                        />
                    ))}
                </section>

                {/* Projects */}
                <section>
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Your Projects
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Projects you own and manage.
                            </p>
                        </div>

                        <span className="shrink-0 rounded-lg bg-violet-100 px-2.5 py-1.5 text-xs font-semibold text-violet-700">
                            {myProjects.length} projects
                        </span>
                    </div>

                    {/* Project Grid */}
                    {myProjects.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {myProjects.map((project) => {
                                const status = statusStyles[project.status] || {
                                    text: project.status || "Unknown",
                                    dot: "bg-gray-400",
                                    color: "text-gray-600",
                                    background: "bg-gray-100",
                                };

                                const skills = (project.required_skills || "")
                                    .split(",")
                                    .map((skill) => skill.trim())
                                    .filter(Boolean);

                                return (
                                    <article
                                        key={project.id}
                                        className="flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md sm:p-6"
                                    >
                                        {/* Project Status */}
                                        <div className="flex items-center justify-between gap-3">
                                            <div
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.background} ${status.color}`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                                                />
                                                {status.text}
                                            </div>

                                            <span className="text-xs font-medium text-gray-500">
                                                {visibilityStyles[project.visibility] || "Not specified"}
                                            </span>
                                        </div>

                                        {/* Project Details */}
                                        <div className="mt-5 flex-1">
                                            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-gray-900">
                                                {project.title}
                                            </h3>

                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                                {project.description}
                                            </p>

                                            {/* Skills */}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {skills.length > 0 ? (
                                                    <>
                                                        {skills.slice(0, 3).map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}

                                                        {skills.length > 3 && (
                                                            <span className="rounded-md px-1.5 py-1 text-xs font-medium text-gray-500">
                                                                +{skills.length - 3}
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <p className="text-sm text-gray-400">
                                                        No skills listed
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Open Workspace */}
                                        <button
                                            onClick={() =>
                                                navigate(`/projects/${project.id}/workspace`)
                                            }
                                            type="button"
                                            className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Open Workspace
                                        </button>

                                        {/* Secondary Actions */}
                                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
                                            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                                                <button
                                                    onClick={() =>
                                                        navigate(`/projects/${project.id}`)
                                                    }
                                                    type="button"
                                                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-violet-700"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    View
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/projects/${project.id}/members/`)
                                                    }
                                                    type="button"
                                                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-violet-700"
                                                >
                                                    <Users className="h-3.5 w-3.5" />
                                                    Members
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/myprojects/${project.id}`)
                                                    }
                                                    type="button"
                                                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-violet-700"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                    Edit
                                                </button>
                                            </div>

                                            <button
                                                disabled={deleting}
                                                onClick={() => deleteProject(project.id)}
                                                type="button"
                                                aria-label="Delete project"
                                                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                                {deleting && deletingId === project.id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                                <FolderKanban className="h-7 w-7" />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                You haven't created any projects yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                Start a project of your own and find collaborators
                                to help bring it to life.
                            </p>

                            <button
                                onClick={() => navigate("/project/create")}
                                type="button"
                                className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                                <Plus className="h-4 w-4" />
                                Create Project
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
