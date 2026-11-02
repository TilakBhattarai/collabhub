import { CheckCircle2 } from "lucide-react";
import useEscapeKey from "../hooks/useEscapeKey";

export default function ConfirmCompleteModal({ task, updating, onClose, onConfirm }) {
    useEscapeKey(onClose);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                </div>

                {/* Text */}
                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                    Mark this task as completed?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    You're about to mark{" "}
                    <span className="font-medium text-gray-800">
                        "{task.title}"
                    </span>{" "}
                    as completed. This will move it to the Completed column.
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={updating}
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={updating}
                        className="cursor-pointer rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {updating ? "Updating..." : "Yes, mark as done"}
                    </button>
                </div>
            </div>
        </div>
    );
}