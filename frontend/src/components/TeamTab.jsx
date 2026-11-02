
import { Crown, Users, ArrowUpRight, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getInitials = (username) =>
    username?.charAt(0).toUpperCase() || "?";

export default function TeamTab({
    project,
    members = [],
    tasks = [],
}) {
    const navigate = useNavigate();

    const owner = project?.owner;

    // Owner first, followed by accepted project members
    const team = [
        ...(owner
            ? [
                {
                    id: `owner-${owner.id}`,
                    user: owner,
                    isOwner: true,
                },
            ]
            : []),

        ...members
            .filter(
                (member) =>
                    String(member.user?.id) !== String(owner?.id)
            )
            .map((member) => ({
                id: member.id,
                user: member.user,
                isOwner: false,
            })),
    ];

    const taskCount = (userId) =>
        tasks.filter(
            (task) =>
                task.assigned_to?.id != null &&
                userId != null &&
                String(task.assigned_to.id) === String(userId)
        ).length;

    console.log(team)

    return (
        <div className="mt-6 space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Team
                        </h2>

                        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700">
                            {team.length}
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        The people building this project together.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate(`/projects/${project.id}/members/`)
                    }
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <Users className="h-4 w-4" />
                    Manage team
                    <ArrowUpRight className="h-4 w-4" />
                </button>
            </div>

            {/* Members Grid */}
            {team.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {team.map((person) => {
                        const user = person.user;

                        const assignedTasks = taskCount(user?.id);

                        const profilePicture =
                            user?.profile?.profile_picture ||
                            user?.profile_picture;

                        return (
                            <div
                                key={person.id}
                                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md"
                            >
                                <div className="flex items-start gap-3">

                                    {/* Avatar */}
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-base font-semibold text-violet-700">
                                        {profilePicture ? (
                                            <img
                                                src={profilePicture}
                                                alt={user?.username || "Member"}
                                                draggable={false}
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        ) : (
                                            getInitials(user?.username)
                                        )}
                                    </div>

                                    {/* User Details */}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-gray-900">
                                            {user?.username || "Unknown user"}
                                        </p>

                                        {person.isOwner ? (
                                            <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                <Crown className="h-3 w-3" />
                                                Owner
                                            </span>
                                        ) : (
                                            <span className="mt-1 inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                Member
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Task Count and Profile */}
                                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                    <p className="text-xs text-gray-500">
                                        <span className="font-semibold text-gray-800">
                                            {assignedTasks}
                                        </span>{" "}
                                        {assignedTasks === 1
                                            ? "task"
                                            : "tasks"} assigned
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(`/profile/${user.id}`)
                                        }
                                        type="button"
                                        className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-violet-600 transition hover:text-violet-700"
                                    >
                                        <UserCircle className="h-4 w-4" />
                                        Profile
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
                    <Users className="mx-auto h-9 w-9 text-gray-300" />

                    <h3 className="mt-3 text-sm font-semibold text-gray-800">
                        No team members yet
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        Project members will appear here.
                    </p>
                </div>
            )}
        </div>
    );
}
