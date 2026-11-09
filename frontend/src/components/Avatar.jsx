import { useState } from "react";
import { UserRound } from "lucide-react";

const API_ORIGIN = new URL(
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/"
).origin;

const getImageUrl = (src) => {
    if (!src || typeof src !== "string") return null;
    const path = src.trim();
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith("//")) return `https:${path}`;
    try {
        return new URL(path.replace(/^\/+/, ""), `${API_ORIGIN}/`).href;
    } catch {
        return null;
    }
};

const getInitials = (name) => {
    if (!name?.trim()) return "?";
    return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
};

export default function Avatar({
    src,
    name,
    size = "h-10 w-10",
    textSize = "text-xl",
    className = "",
}) {
    const imageUrl = getImageUrl(src);
    const [failedUrl, setFailedUrl] = useState(null);
    const showImage = imageUrl && failedUrl !== imageUrl;

    return (
        <div className={`${size} shrink-0 overflow-hidden rounded-full bg-violet-100 ${className}`}>
            {showImage ? (
                <img
                    src={imageUrl}
                    alt={name || "User avatar"}
                    loading="lazy"
                    onError={() => setFailedUrl(imageUrl)}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className={`flex h-full w-full items-center justify-center font-semibold text-violet-700 ${textSize}`}>
                    {name ? getInitials(name) : <UserRound size={20} />}
                </div>
            )}
        </div>
    );
}