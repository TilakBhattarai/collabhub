import { Trash2 } from "lucide-react";
import useEscapeKey from "../hooks/useEscapeKey";
import { useState } from "react";
import api from "../api/axios";
import HandleApiError from "../utils/HandleApiError";
import { useToast } from "../context/ToastContext";


export default function DeleteTaskModal({ task, onClose, projectId, fetchTasks }) {

    useEscapeKey(onClose);
    const [deleting, setDeleting] = useState(false);
    const { showToast } = useToast();

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(
                `projects/${projectId}/tasks/${task.id}/`
            )
            showToast("Task deleted successfully", 'success');
            await fetchTasks();
            onClose();
        } catch (error) {
            HandleApiError(error, showToast, "Unable to delete task");
        } finally {
            setDeleting(false);
        }
    }

    console.log(task);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Trash2 className="h-5 w-5" />
                </div>

                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                    Delete task?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    <span className="font-medium text-gray-700">"{task.title}"</span> will be
                    permanently deleted. This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        type="button"
                        className="h-10 cursor-pointer rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    {task.can_delete && (
                        <button
                            disabled={deleting}
                            onClick={handleDelete}
                            type="button"
                            className="h-10 cursor-pointer rounded-md bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}