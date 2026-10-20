import {
    CheckCircle2,
    ClipboardList,
    Clock,
    Globe,
    UserPlus,
    Users, ArrowLeft,
    LockIcon,

} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import HandleApiError from "../utils/HandleApiError";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";
import { formatTime } from "../utils/formatTime";
import TasksBoard from "../components/TasksBoard";
import { useSearchParams } from "react-router-dom";

function ProjectWorkspace() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState(null);
    const [members, setMembers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const { showToast } = useToast();
    const { projectId } = useParams();
    const activeTab = searchParams.get("tab") || "Overview";
    const setActiveTab = (tab) => setSearchParams({ tab }, { replace: true });

    const tasksLength = tasks.length;
    const progressTasksLength = tasks.filter((task) =>
        task.status === 'IN_PROGRESS'
    ).length;
    const completedTasksLength = tasks.filter((task) =>
        task.status === 'COMPLETED'
    ).length;
    const todoTasksLength = tasks.filter((task) =>
        task.status === "TODO"
    ).length;


    const progressPercentage = tasksLength > 0 ? Math.round((completedTasksLength / tasksLength) * 100) : 0;

    const projectInfo = async () => {
        try {
            const response = await api.get(
                `projects/${projectId}/`,
            )
            setProject(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load project details. Please try again.");
        }
    }

    const fetchMembers = async () => {
        try {
            const response = await api.get(
                `projects/${projectId}/members/`,
            )
            setMembers(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load members.");
        }
    }

    const fetchTasks = async () => {
        try {
            const response = await api.get(
                `projects/${projectId}/tasks/`
            )
            setTasks(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load tasks.");
        }
    }

    useEffect(() => {
        const loadWorkSpace = async () => {
            try {
                await Promise.all([
                    projectInfo(),
                    fetchMembers(),
                    fetchTasks()
                ])
            } finally {
                setLoading(false);
            }
        }
        loadWorkSpace();
    }, [projectId])

    const taskStatus = {
        "TODO": "Todo",
        "IN_PROGRESS": "In Progress",
        "COMPLETED": "Completed"
    }

    const statusStyle = {
        TODO: "bg-gray-100 text-gray-700",
        IN_PROGRESS: "bg-amber-50 text-gray-800",
        COMPLETED: "bg-green-50 text-gray-800"
    }


    if (loading) {
        return <Loading />
    }

    if (!project) {
        return (
            <div className="mx-auto max-w-6xl px-4 pt-24 text-center text-gray-500">
                Project not found or you don't have access.
            </div>
        );
    }

    const projectStatus = {
        "LOOKING_FOR_CONTRIBUTORS": "Looking For Collaborator",
        "IN_PROGRESS": "In Progress",
        "COMPLETED": "Completed",
    }

    const projectVisibility = {
        "PUBLIC": "Public",
        "PRIVATE": "Private",
    }

    const statusStyles = {
        "LOOKING_FOR_CONTRIBUTORS": "bg-blue-50 text-blue-800",
        "IN_PROGRESS": "bg-amber-50 text-amber-800",
        "COMPLETED": "bg-green-50 text-green-800",
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6">
            {/* Header */}

            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 cursor-pointer"
            >
                <ArrowLeft size={16} />
                Back to Project
            </button>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-lg font-semibold text-white">
                        {project.title.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                        {/* Title */}
                        <h1 className="break-words text-2xl font-semibold leading-snug text-gray-900">
                            {project.title}
                        </h1>

                        {/* Badges */}
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className={`rounded px-2 py-1 text-xs font-semibold ${statusStyles[project.status]}`}>
                                {projectStatus[project.status]}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-600">

                                {project.visibility === "PUBLIC" ? <Globe className="h-3 w-3" /> : <LockIcon className="h-3 w-3" />}
                                {projectVisibility[project.visibility]}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="mt-4 max-w-3xl whitespace-pre-line break-words text-sm leading-relaxed text-gray-600">
                            {project.description}
                        </p>

                        {/* Owner */}
                        <p className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">
                            Owned by{" "}
                            <span className="font-medium">{project.owner.username}</span>
                            {" "}· Created {formatTime(project.created_at)}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
                >
                    <UserPlus className="h-4 w-4" />
                    Invite Member
                </button>
            </div>

            {/* Tabs (visual only) */}
            <div className="mt-6 border-b border-gray-200">
                <nav className="flex min-w-max gap-6">
                    <button
                        onClick={() => setActiveTab("Overview")}
                        className={`-mb-px 
                    ${activeTab === "Overview" ? "border-b-2 border-violet-600 text-violet-600" : "border-b-2 border-transparent text-gray-500"}
                     px-1 cursor-pointer pb-3 text-sm font-medium`}>
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("Tasks")}
                        className={`
                        ${activeTab === "Tasks" ? "border-b-2 border-violet-600 text-violet-600" : "border-b-2 border-transparent text-gray-600"}
                        -mb-px flex cursor-pointer items-center gap-2 px-1 pb-3 text-sm font-medium`}>
                        Tasks
                        <span className={`
                            ${activeTab === "Tasks" ? `bg-violet-100 text-violet-700` : `bg-gray-100 text-gray-600`}
                            rounded-full px-2 py-0.5 text-xs font-semibold`}>
                            {tasksLength}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("Team")}
                        className={`
                        ${activeTab === "Team" ? "border-b-2 border-violet-600 text-violet-600" : "border-b-2 border-transparent text-gray-600"}
                        -mb-px flex cursor-pointer items-center gap-2 px-1 pb-3 text-sm font-medium`}>
                        Team
                        <span className={`
                        ${activeTab === "Team" ? `bg-violet-100 text-violet-700` : `bg-gray-100 text-gray-600`}
                        rounded-full px-2 py-0.5 text-xs font-semibold`}>
                            {members.length}
                        </span>
                    </button>
                </nav>
            </div>
            {activeTab === "Tasks" && (
                <TasksBoard
                    tasks={tasks}
                    project={project}
                    members={members}
                    fetchTasks={fetchTasks}
                    progressTasksLength={progressTasksLength}
                    completedTasksLength={completedTasksLength}
                    todoTasksLength={todoTasksLength}
                    projectId={projectId}
                />
            )}
            {activeTab === 'Overview' && (
                /* Stats */
                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 sm:p-5">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-2xl font-semibold text-gray-900">{tasksLength}</p>
                            <ClipboardList className="h-5 w-5 shrink-0 text-violet-600" />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Total Tasks</p>
                    </div>

                    <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 sm:p-5">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-2xl font-semibold text-gray-900">{progressTasksLength}</p>
                            <Clock className="h-5 w-5 shrink-0 text-violet-600" />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">In Progress</p>
                    </div>

                    <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 sm:p-5">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-2xl font-semibold text-gray-900">{completedTasksLength}</p>
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-violet-600" />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Completed</p>
                    </div>

                    <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 sm:p-5">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-2xl font-semibold text-gray-900">{members.length}</p>
                            <Users className="h-5 w-5 shrink-0 text-violet-600" />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Members</p>
                    </div>
                </div>
            )
            }

            {activeTab === 'Overview' && (
                <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Left column */}
                    <div className="min-w-0 space-y-6 lg:col-span-2">
                        {/* Progress */}
                        <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-5">
                                <h2 className="text-base font-medium text-gray-900 sm:text-lg">
                                    Progress
                                </h2>
                                <span className="shrink-0 text-sm text-gray-500">
                                    {completedTasksLength} of {tasksLength} tasks completed
                                </span>
                            </div>

                            <div className="px-4 py-5 sm:px-5">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-semibold text-gray-900">{progressPercentage}%</p>
                                    <p className="text-sm text-gray-500">complete</p>
                                </div>

                                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        style={{ width: `${progressPercentage}%` }}
                                        className={`h-full rounded-full bg-violet-600`} />
                                </div>
                            </div>
                        </div>

                        {/* Upcoming tasks */}
                        <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-5">
                                <h2 className="text-base font-medium text-gray-900 sm:text-lg">
                                    Upcoming Tasks
                                </h2>
                                {tasks.length > 0 && (
                                    <button
                                        onClick={() => setActiveTab("Tasks")}
                                        className="shrink-0 cursor-pointer text-sm font-medium text-violet-600">
                                        View all
                                    </button>
                                )}
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {tasks.map((task) => (
                                    <li key={task.id} className="flex items-center gap-3 px-4 py-4 sm:px-5">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                                            {task.assigned_to?.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900">
                                                {task.title}
                                            </p>
                                            <p className="mt-0.5 truncate text-xs text-gray-500">
                                                {task.assigned_to?.username ?? "Unassigned"} · Due {task.due_date ?? "—"}
                                            </p>
                                        </div>
                                        <span className={`
                                            ${statusStyle[task.status]}
                                            shrink-0 whitespace-nowrap rounded px-2 py-1 text-[10px] font-semibold `}>
                                            {taskStatus[task.status]}
                                        </span>
                                    </li>

                                ))}
                            </ul>
                        </div>

                        {/* Tech stack */}
                        <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                            <div className="border-b border-gray-100 px-4 py-4 sm:px-5">
                                <h2 className="text-base font-medium text-gray-900 sm:text-lg">
                                    Tech Stack
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-1.5 px-4 py-4 sm:px-5">
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

                    {/* Right column */}
                    <div className="min-w-0 space-y-6 lg:col-span-1">
                        {/* Team */}
                        <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-5">
                                <h2 className="text-base font-medium text-gray-900 sm:text-lg">
                                    Team
                                </h2>
                                <button
                                    onClick={() => navigate(`/projects/${project.id}/members/`)}
                                    className="shrink-0 text-sm cursor-pointer font-medium text-violet-600">
                                    View team
                                </button>
                            </div>

                            <ul className="divide-y divide-gray-100">
                                <li className="flex min-w-0 items-center gap-3 px-4 py-3.5 sm:px-5">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                                        {project.owner.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {project.owner.username}
                                        </p>
                                        <p className="truncate text-xs text-gray-500">
                                            owner
                                        </p>
                                    </div>
                                </li>
                                {members.map((member) => (
                                    <li key={member.id} className="flex min-w-0 items-center gap-3 px-4 py-3.5 sm:px-5">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                                            {member.user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900">
                                                {member.user.username}
                                            </p>
                                            <p className="truncate text-xs text-gray-500">
                                                {member.role.toLowerCase()}
                                            </p>
                                        </div>
                                    </li>
                                ))}

                            </ul>
                        </div>

                        {/* Recent activity */}
                        <div className="min-w-0 rounded-lg border border-gray-200 bg-white">
                            <div className="border-b border-gray-100 px-4 py-4 sm:px-5">
                                <h2 className="text-base font-medium text-gray-900 sm:text-lg">
                                    Recent Activity
                                </h2>
                            </div>

                            <ul className="divide-y divide-gray-100">
                                <li className="flex min-w-0 gap-3 px-4 py-3.5 sm:px-5">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-600" />
                                    <div className="min-w-0 flex-1">
                                        <p className="break-words text-sm text-gray-900">
                                            Kiran Shrestha joined the project
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            3 hours ago
                                        </p>
                                    </div>
                                </li>

                                <li className="flex min-w-0 gap-3 px-4 py-3.5 sm:px-5">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-300" />
                                    <div className="min-w-0 flex-1">
                                        <p className="break-words text-sm text-gray-500">
                                            Rohan Thapa completed authentication
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            Yesterday
                                        </p>
                                    </div>
                                </li>

                                <li className="flex min-w-0 gap-3 px-4 py-3.5 sm:px-5">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-300" />
                                    <div className="min-w-0 flex-1">
                                        <p className="break-words text-sm text-gray-500">
                                            Aarav Sharma assigned a task to Sita
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            2 days ago
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

export default ProjectWorkspace;