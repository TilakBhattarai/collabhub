import { X } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";
import HandleApiError from "../utils/HandleApiError";
import { useToast } from "../context/ToastContext";
import Loading from "./Loading";

export default function CreateTaskModal({ onClose, members, project, fetchTasks }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState(project.owner.id);
    const [category, setCategory] = useState("BACKEND");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [creating, setCreating] = useState(false);
    const { showToast } = useToast();

    const priorities = [
        { value: "LOW", label: "Low" },
        { value: "MEDIUM", label: "Medium" },
        { value: "HIGH", label: "High" }
    ]

    const categories = [
        { value: "BACKEND", label: "Backend" },
        { value: "FRONTEND", label: "Frontend" },
        { value: "DESIGN", label: "Design" },
        { value: "SETUP", label: "Setup" },
        { value: "OTHER", label: "Other" },
    ];


    const onSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            await api.post(
                `projects/${project.id}/tasks/`,
                {
                    title: title.trim(),
                    description,
                    assigned_to_id: assignedTo,
                    category,
                    priority,
                    due_date: dueDate || null
                }


            )
            showToast("Task created successfully", "Success");
            await fetchTasks();
            onclose();
        } catch (error) {
            HandleApiError(error, showToast, "Failed to create task. Please try again.");
        } finally {
            setCreating(false);
        }
    }



    const assignee = [project.owner, ...members.map((member) => member.user)]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <form onSubmit={onSubmit} className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-semibold cursor-pointer text-gray-900">Add Task</h2>
                    <button
                        onClick={onClose}
                        type="button"
                        className="cursor-pointer rounded-md bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4 px-6 py-5">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
                        <input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Add stock history chart"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Description <span className="font-normal text-gray-400">(optional)</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Assign to</label>
                            <select
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                                className="h-10 w-full rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-violet-500">
                                {assignee.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.username}
                                    </option>

                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="h-10 w-full rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-violet-500">
                                {categories.map((c) => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <span className="mb-1.5 block text-sm font-medium text-gray-700">Priority</span>
                        <div className="grid grid-cols-3 gap-2">
                            {priorities.map((p) => (
                                <button
                                    value={p.value}
                                    onClick={(e) => setPriority(e.target.value)}
                                    key={p.value} type="button"
                                    className={`h-10 cursor-pointer rounded-md border text-sm font-medium ${priority === p.value
                                        ? "border-violet-600 bg-violet-50 text-violet-700"
                                        : "border-gray-300 bg-white text-gray-600"
                                        }`}>
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Due date <span className="font-normal text-gray-400">(optional)</span>
                        </label>
                        <input
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            type="date"
                            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-violet-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
                    <button
                        onClick={onClose}
                        type="button"
                        className="h-10 cursor-pointer rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={creating}
                        type="submit"
                        className="h-10 cursor-pointer rounded-md bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-700"
                    >
                        {creating ? "Creating..." : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}