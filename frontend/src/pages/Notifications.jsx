import { Bell, UserPlus, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import HandleApiError from "../utils/HandleApiError";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Notifications = () => {

    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    const fetchNotifications = async () => {
        setLoading(true);

        try {
            const response = await api.get(
                "notifications/",
            )
            setNotifications(response.data);
            console.log(response.data);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to load notifications. Please refresh or try again.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    const formatTime = (createdAt) => {
        const now = new Date();
        const created = new Date(createdAt);

        const diffInSeconds = Math.floor((now - created) / 1000);

        if (diffInSeconds < 60) {
            return "Just now";
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);

        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays === 1) {
            return "Yesterday";
        }

        return `${diffInDays} days ago`;
    };

    const handleRead = async (notificationId) => {
        try {
            await api.patch(
                `notifications/${notificationId}/read/`,

            )
            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === notificationId ? { ...n, is_read: true } : n
                )
            );
        } catch (error) {
            HandleApiError(error, showToast, "Failed to mark notification as read.")
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-7 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Notifications
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Stay updated with your latest activity.
                    </p>
                </div>

                {/* Notifications */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                    {notifications.map((notification) => (
                        <div
                            onClick={() => handleRead(notification.id)}
                            key={notification.id}
                            className={`flex items-start gap-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100 px-5 py-5 last:border-b-0 ${!notification.is_read
                                ? "bg-violet-50/40"
                                : "bg-white"
                                }`}
                        >
                            {/* Icon */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                {notification.actor.profile.profile_picture ? (
                                    <img
                                        src={`http://127.0.0.1:8000${notification.actor.profile.profile_picture}`}
                                        alt={notification.actor.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-base font-semibold">
                                        {notification.actor.username
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {notification.message}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    {formatTime(notification.created_at)}
                                </p>
                            </div>

                            {/* Unread Indicator */}
                            {!notification.is_read && (
                                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-600" />
                            )}
                        </div>
                    ))}

                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                    <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                            <Bell size={22} />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            You're all caught up
                        </h2>

                        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                            New activity and updates will appear here.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Notifications;