import {
    Plus,
    Users,
    Clock3,
    FolderKanban,
    Eye,
    BarChart3,
    Pencil,
    Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";

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
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
                    <Icon className="h-4 w-4" />
                </div>
            </div>

            <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
                {stat.value}
            </p>
        </div>
    );
}

export default function MyProjects() {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [myProjects, setmyProjects] = useState([]);
    const [loading, setLoading] = useState(false);
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
            const response = await api.get(
                "projects/my_projects/"
            );

            setmyProjects(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (projectId) => {
        setDeletingId(projectId);
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        setDeleting(true);

        try {
            await api.delete(`projects/${projectId}/`);

            setmyProjects((prevProjects) => (
                prevProjects.filter((project) => project.id != projectId)
            ))

            showToast("Project deleted successfully");
            navigate("/projects");

        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.status === 403) {
                showToast(
                    "You do not have permission to delete this project"
                );
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast(
                    "Something went wrong while deleting the project"
                );
            }
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        fetchmyProjects();
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
        <div className="min-h-screen bg-gray-50/60">
            <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:px-8 lg:px-10">

                {/* Header */}
                <div className="flex flex-col gap-5 border-b border-gray-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                            My Projects
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
                            Manage the projects you're building and collaborating
                            on.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/project/create")}
                        type="button"
                        className="inline-flex h-10 items-center cursor-pointer justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
                    >
                        <Plus className="h-4 w-4" />
                        Create Project
                    </button>
                </div>

                {/* Statistics */}
                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.label}
                            stat={stat}
                        />
                    ))}
                </div>

                {/* Projects section */}
                <section className="mt-10">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Your Projects
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Projects you own and manage.
                        </p>
                    </div>

                    {/* Project grid */}
                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {myProjects.map((project) => {
                            const status =
                                statusStyles[project.status];

                            return (
                                <div
                                    key={project.id}
                                    className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                                >
                                    {/* Top row */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.background} ${status.color}`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                                            />

                                            {status.text}
                                        </div>

                                        <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
                                            {visibilityStyles[
                                                project.visibility
                                            ]}
                                        </span>
                                    </div>

                                    {/* Project info */}
                                    <div className="mt-4">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            {project.title}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    <div className="mt-4 flex min-h-7 flex-wrap gap-2">
                                        {(project.required_skills || "").split(",").filter(Boolean).map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-5 grid grid-cols-4 gap-2 border-t border-gray-100 pt-4">

                                        {/* View */}
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/projects/${project.id}`
                                                )
                                            }
                                            type="button"
                                            className="inline-flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 bg-white px-2 text-xs font-medium text-gray-600 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            View
                                        </button>

                                        {/* Analytics */}
                                        <button
                                            type="button"
                                            className="inline-flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 bg-white px-2 text-xs font-medium text-gray-600 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                                        >
                                            <BarChart3 className="h-3.5 w-3.5" />
                                            Analytics
                                        </button>

                                        {/* Edit */}
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/myprojects/${project.id}`
                                                )
                                            }
                                            type="button"
                                            className="inline-flex h-9 items-center justify-center gap-1.5 cursor-pointer rounded-lg border border-gray-200 bg-white px-2 text-xs font-medium text-gray-600 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            Edit
                                        </button>

                                        {/* Delete */}
                                        <button
                                            disabled={deleting}
                                            onClick={() =>
                                                deleteProject(project.id)
                                            }
                                            type="button"
                                            className="inline-flex h-9 items-center justify-center cursor-pointer gap-1.5 rounded-lg border border-red-100 bg-white px-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            {deleting ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {myProjects.length === 0 && (
                        <div className="mt-8 border-t border-gray-200 py-16 text-center">

                            <h3 className="text-base font-semibold text-gray-900">
                                You haven't created any projects yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                Start a project of your own and find collaborators to help bring it to life.
                            </p>

                            <button
                                onClick={() => navigate("/project/create")}
                                className="mt-5 rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white cursor-pointer hover:bg-violet-700 transition"
                            >
                                Create Project
                            </button>

                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
