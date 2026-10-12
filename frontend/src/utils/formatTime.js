export const formatTime = (createdAt) => {
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