
const Avatar = ({ image, username }) => {
    return (
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-violet-100">
            {image ? (
                <img
                    src={`http://127.0.0.1:8000${image}`}
                    alt={username}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-violet-700">
                    {username
                        .charAt(0)
                        .toUpperCase()}
                </div>
            )}
        </div>
    )
}

export default Avatar