import {
    ArrowUpRight,
    BriefcaseBusiness,
    Code2,
    FolderKanban,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import HandleApiError from "../utils/HandleApiError";
import Loading from "../components/Loading";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function MyCollaborations() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const statusStyles = {
        IN_PROGRESS: "bg-violet-50 text-violet-700",
        LOOKING_FOR_CONTRIBUTORS: "bg-amber-50 text-amber-700",
        COMPLETED: "bg-green-50 text-green-700",
    };

    const statusLabels = {
        IN_PROGRESS: "In Progress",
        LOOKING_FOR_CONTRIBUTORS: "Looking For Contributors",
        COMPLETED: "Completed",
    };

    const inProgressCount = projects.filter(
        (project) => project.status === "IN_PROGRESS"
    ).length;

    const totalMembers = projects.reduce(
        (total, project) => total + (Number(project.member_count) || 0),
        0
    );

    console.log(projects)

    const fetchJoinedProjects = async () => {

        try {
            const response = await api.get("projects/joined/");
            setProjects(response.data);
        } catch (error) {
            HandleApiError(
                error,
                showToast,
                "Unable to fetch the projects"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoinedProjects();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-24">
            <main className="mx-auto max-w-6xl space-y-8 px-5 sm:px-8">

                {/* Header */}
                <section className="flex items-center justify-between gap-4">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-600">
                            <Users className="h-4 w-4" />
                            Your team projects
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            My Collaborations
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            Projects you're collaborating on with other builders.
                        </p>
                    </div>

                </section>

                {/* Summary Cards */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* Joined Projects */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Joined Projects
                                </p>

                                <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                                    {projects.length}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                                <FolderKanban className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                            Projects you've joined
                        </p>
                    </div>

                    {/* In Progress */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium bg-gray-50 text-gray-500">
                                    In Progress
                                </p>

                                <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                                    {inProgressCount}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl ">
                                <BriefcaseBusiness className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                            Projects currently active
                        </p>
                    </div>

                    {/* Team Members */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Team Members
                                </p>

                                <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                                    {totalMembers}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                            Across your collaborations
                        </p>
                    </div>
                </section>

                {/* Projects */}
                <section>
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Projects you've joined
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Open a workspace to continue collaborating.
                            </p>
                        </div>

                        <span className="shrink-0 rounded-lg bg-violet-100 px-2.5 py-1.5 text-xs font-semibold text-violet-700">
                            {projects.length} projects
                        </span>
                    </div>

                    {projects.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                                <FolderKanban className="h-7 w-7" />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                No collaborations yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                When you join a project, it will appear here.
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/projects")}
                                className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                                Browse Projects
                                <ArrowUpRight className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            {projects.map((project) => (
                                <article
                                    key={project.id}
                                    className="flex flex-col rounded-2xl border border-gray-200/80 bg-white p-3 shadow-sm transition hover:border-violet-200 hover:shadow-md sm:p-6"
                                >
                                    {/* Project Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                                            <Code2 className="h-6 w-6" />
                                        </div>

                                        <div className="flex flex-wrap justify-end gap-2">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[project.status] ?? "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {statusLabels[project.status]}
                                            </span>

                                            <span className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-500">
                                                {project.visibility === "PRIVATE" ? "Private" : "Public"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="mt-5">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.required_skills ? (
                                            project.required_skills
                                                .split(",")
                                                .map((skill) => skill.trim())
                                                .filter(Boolean)
                                                .map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))
                                        ) : (
                                            <p className="text-sm text-gray-400">No skills listed</p>
                                        )}
                                    </div>

                                    {/* Owner and Members */}
                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                                                {project.owner.username?.charAt(0).toUpperCase() || "?"}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Project owner</p>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {project.owner.username}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                            <Users className="h-4 w-4" />
                                            <span>{project.member_count} members</span>
                                        </div>
                                    </div>

                                    {/* Open Workspace */}
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/projects/${project.id}/workspace`)}
                                        className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-700"
                                    >
                                        Open Workspace
                                        <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}