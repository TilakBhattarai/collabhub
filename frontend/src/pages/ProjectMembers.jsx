import {
    ArrowLeft,
    CalendarDays,
    UserRound,
    UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import HandleApiError from "../utils/HandleApiError";
import api from "../api/axios";
import Loading from "../components/Loading";
const [connectingId, setConnectingId] = useState(null);

const ProjectMembers = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const response = await api.get(
                `projects/${projectId}/members/`,
            )
            setMembers(response.data);
            console.log(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load members.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, [projectId])


    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 pt-24 pb-20">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-sm cursor-pointer font-medium text-gray-600 transition hover:text-violet-600"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-violet-600">
                        Project Members
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        People working on this project
                    </h1>

                    <p className="mt-2 max-w-2xl text-gray-600">
                        Connect with the people contributing to this project
                        and explore their profiles.
                    </p>
                </div>

                {/* Members count */}
                <div className="mb-5 flex items-center gap-2 text-sm text-gray-600">
                    <UserRound size={17} />
                    <span>
                        {members.length} {members.length === 1 ? "Member" : "Members"}
                    </span>
                </div>

                {/* Members */}
                {members.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                {/* Profile */}
                                <div className="flex items-center gap-4">
                                    {member.profile_picture ? (
                                        <img
                                            src={member.profile_picture}
                                            alt={member.username}
                                            className="h-14 w-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                                            <UserRound size={24} />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <h2 className="truncate font-semibold text-gray-900">
                                            {member.username}
                                        </h2>

                                        <p className="text-sm text-violet-600">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Joined date */}
                                <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                                    <CalendarDays size={16} />
                                    <span>
                                        Joined{" "}
                                        {new Date(member.joined_at).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="mt-5 flex gap-3">
                                    <button
                                        className="flex-1 rounded-lg border cursor-pointer border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                                    >
                                        View Profile
                                    </button>

                                    <button
                                        className="flex items-center justify-center cursor-pointer gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                                    >
                                        <UserPlus size={16} />
                                        Connect
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty state */
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                            <UserRound size={26} />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            No members yet
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            This project does not have any members yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectMembers;