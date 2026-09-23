import { UserRound, Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

export default function JoinRequests() {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    const { showToast } = useToast();

    const fetchRequests = async () => {
        setLoading(true);

        try {
            const response = await api.get(
                "projects/request/owner_requests/"
            )
            setRequests(response.data);
            console.log(response.data);

        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast(
                    "Something went wrong on fetching connections requests"
                );
            }
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        fetchRequests();
    }, [])


    const handleAccept = async (requestId) => {
        try {
            await api.post(`projects/request/${requestId}/accept/`);
            setRequests((prev) =>
                prev.filter(
                    (request) => Number(request.id) !== Number(requestId)
                )
            );
            showToast("Request accepted successfully");
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.status === 403) {
                showToast("You are not authorized to accept this request");
            } else if (error.response?.status === 400) {
                showToast(error.response?.data?.error || "This request cannot be accepted");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Failed to accept the request. Please try again.");
            }
        }

    };

    const handleReject = async (requestId) => {
        try {
            await api.post(`projects/request/${requestId}/reject/`);
            setRequests((prev) =>
                prev.filter(
                    (request) => Number(request.id) !== Number(requestId)
                )
            );
            showToast("Request rejected successfully");
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.status === 403) {
                showToast("You are not authorized to accept this request");
            } else if (error.response?.status === 400) {
                showToast(error.response?.data?.error || "This request cannot be rejected");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Failed to reject the request. Please try again.");
            }
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-500">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/60">
            <div className="mx-auto max-w-5xl px-4 sm:px-8 sm:pb-20 sm:pt-24 pt-24 pb-20">

                {/* Header */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                        Join Requests
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                        Manage people who want to contribute to your projects.
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    {requests?.map((req) => (
                        <div
                            key={req.id}
                            className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                                {/* Applicant */}
                                <div className="flex min-w-0 flex-1 gap-4">

                                    {/* Avatar */}
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-400">
                                        {req.sender.profile.profile_picture ? (
                                            <img
                                                src={req.sender.profile.profile_picture}
                                                alt={req.sender.username}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <UserRound className="h-5 w-5" />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        {/* Username + status */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-semibold text-gray-900">
                                                @{req.sender.username}
                                            </span>
                                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                {req.status}
                                            </span>
                                        </div>

                                        {/* Role */}
                                        <p className="mt-0.5 text-sm text-gray-500">
                                            {req.sender.profile.role}
                                        </p>

                                        {/* Skills */}
                                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                                            {(req.sender.profile.skills || "")
                                                .split(",")
                                                .map((skill) => skill.trim())
                                                .filter(Boolean)
                                                .map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                        </div>

                                        {/* Project + date — one plain sentence, no box, no label */}
                                        <p className="mt-3 text-sm text-gray-500">
                                            Wants to join <span className="font-medium">{req.project.title}</span>
                                            <span className="text-gray-300"> · </span>
                                            {new Date(req.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>

                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 border-t border-gray-100 pt-4 sm:border-0 sm:pt-0">
                                    <button onClick={() => navigate(`/profile/${req.sender.id}`)}
                                        type="button"
                                        className="flex-1 rounded-lg cursor-pointer px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 sm:flex-none"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleReject(req.id)}
                                        type="button"
                                        className="flex-1 rounded-lg cursor-pointer border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 sm:flex-none"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleAccept(req.id)}
                                        type="button"
                                        className="flex-1 rounded-lg cursor-pointer bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 sm:flex-none"
                                    >
                                        Accept
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>


                {/* Empty state */}

                {requests.length === 0 && (
                    <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center sm:p-12">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                            <Inbox className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">No join requests yet</p>
                        <p className="mt-1 max-w-sm text-sm text-gray-500">
                            When someone requests to join one of your public projects, their request will appear here.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}