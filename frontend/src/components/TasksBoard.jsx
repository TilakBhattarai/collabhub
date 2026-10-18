
import {
    Plus,
    Search,
    SlidersHorizontal,
    CalendarDays,
    MoreHorizontal,
    Clock3,
    CheckCircle2,
    ClipboardList,
} from "lucide-react";

const taskColumns = [
    {
        title: "To Do",
        count: 4,
        color: "bg-gray-400",
        tasks: [
            {
                title: "Set up database models",
                description: "Create the initial project schema",
                category: "Backend",
                dueDate: "Oct 20",
                assignee: "Aarav Sharma",
                initials: "AS",
                avatar: "bg-violet-100 text-violet-700",
            },
            {
                title: "Design login page",
                description: "Finalize the authentication UI",
                category: "Frontend",
                dueDate: "Oct 22",
                assignee: "Sita Gurung",
                initials: "SG",
                avatar: "bg-pink-100 text-pink-700",
            },
            {
                title: "Write API documentation",
                description: "Document the main endpoints",
                category: "Backend",
                dueDate: "Oct 24",
                assignee: "Rohan Thapa",
                initials: "RT",
                avatar: "bg-amber-100 text-amber-700",
            },
        ],
    },
    {
        title: "In Progress",
        count: 3,
        color: "bg-violet-500",
        tasks: [
            {
                title: "Build product CRUD endpoints",
                description: "Implement create, read, update and delete",
                category: "Backend",
                dueDate: "Oct 22",
                assignee: "Rohan Thapa",
                initials: "RT",
                avatar: "bg-amber-100 text-amber-700",
            },
            {
                title: "Create project dashboard",
                description: "Build the main workspace overview",
                category: "Frontend",
                dueDate: "Oct 24",
                assignee: "Aarav Sharma",
                initials: "AS",
                avatar: "bg-violet-100 text-violet-700",
            },
            {
                title: "Implement JWT refresh",
                description: "Handle expired access tokens",
                category: "Backend",
                dueDate: "Oct 25",
                assignee: "You",
                initials: "TB",
                avatar: "bg-emerald-100 text-emerald-700",
            },
        ],
    },
    {
        title: "Completed",
        count: 5,
        color: "bg-green-500",
        tasks: [
            {
                title: "Set up repository",
                description: "Initialize Git and project structure",
                category: "Setup",
                dueDate: "Oct 16",
                assignee: "You",
                initials: "TB",
                avatar: "bg-emerald-100 text-emerald-700",
            },
            {
                title: "Create base layouts",
                description: "Set up reusable page layouts",
                category: "Frontend",
                dueDate: "Oct 17",
                assignee: "Sita Gurung",
                initials: "SG",
                avatar: "bg-pink-100 text-pink-700",
            },
            {
                title: "Configure authentication",
                description: "Set up login and registration",
                category: "Backend",
                dueDate: "Oct 18",
                assignee: "You",
                initials: "TB",
                avatar: "bg-emerald-100 text-emerald-700",
            },
        ],
    },
];

export default function TasksBoard({ tasks, members, project, fetchTasks, progressTasksLength, completedTasksLength }) {
    const todoTasksLength = tasks.map((task) =>
        task.status === 'TODO'
    ).length

    return (
        <div className="mt-6 space-y-6">

            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">To Do</p>
                        <ClipboardList className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900">
                        {todoTasksLength}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Tasks not started
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">In Progress</p>
                        <Clock3 className="h-5 w-5 text-violet-600" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900">
                        {progressTasksLength}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Tasks being worked on
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Completed</p>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900">
                        {completedTasksLength}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Tasks completed
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Task Board
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Track your team's work from start to finish.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                    <Plus className="h-4 w-4" />
                    Create Task
                </button>
            </div>

            {/* Search and filters: visual only */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5">
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                        Search tasks...
                    </span>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
                {taskColumns.map((column) => (
                    <div
                        key={column.title}
                        className="min-w-0 rounded-xl border border-gray-200 bg-gray-50/70 p-3"
                    >
                        {/* Column Header */}
                        <div className="flex items-center justify-between px-1 py-2">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-2.5 w-2.5 rounded-full ${column.color}`}
                                />
                                <h3 className="text-sm font-semibold text-gray-800">
                                    {column.title}
                                </h3>
                                <span className="rounded-md bg-gray-200/70 px-2 py-0.5 text-xs font-medium text-gray-600">
                                    {column.count}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-200"
                            >
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Task Cards */}
                        <div className="mt-3 space-y-3">
                            {column.tasks.map((task) => (
                                <div
                                    key={task.title}
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span className="rounded-md bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700">
                                            {task.category}
                                        </span>

                                        <button
                                            type="button"
                                            className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <h4 className="mt-3 text-sm font-semibold leading-5 text-gray-900">
                                        {task.title}
                                    </h4>

                                    <p className="mt-1.5 text-xs leading-5 text-gray-500">
                                        {task.description}
                                    </p>

                                    <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                        <span>Due {task.dueDate}</span>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                                        <div
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${task.avatar}`}
                                        >
                                            {task.initials}
                                        </div>

                                        <span className="truncate text-xs font-medium text-gray-600">
                                            {task.assignee}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
