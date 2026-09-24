import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import HandleApiError from "../utils/HandleApiError";
import Loading from "../components/Loading";

const EditProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [required_skills, setRequired_skills] = useState("");
    const [visibility, setVisibility] = useState("");
    const [status, setStatus] = useState("");
    const [updated_at, setUpdated_at] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { projectId } = useParams();

    const fetchProject = async () => {
        setLoading(true);
        try {
            const response = await api.get(`projects/${projectId}/`);
            const data = response.data;

            setDescription(data.description || "");
            setTitle(data.title || "");
            setRequired_skills(data.required_skills || "");
            setVisibility(data.visibility || "");
            setStatus(data.status || "");
            setUpdated_at(data.updated_at || "");


        } catch (error) {
            HandleApiError(error, showToast, "Failed to fetch project. Please try again.")

        } finally {
            setLoading(false);
        }
    }

    const updateProject = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await api.patch(
                `projects/${projectId}/`,
                {
                    title,
                    description,
                    required_skills,
                    visibility,
                    status,
                }
            )
            showToast("Project updated successfully");
            navigate(-1);
        } catch (error) {
            HandleApiError(error, showToast, "Failed to update project. Please try again.")

        } finally {
            setSaving(false);
        }

    }

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    if(loading) {
        return <Loading />;
    }



    return (
        <div className="min-h-screen bg-gray-50 px-5 pt-24 pb-20">
            <div className="mx-auto max-w-3xl">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-7 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Back to Project
                </button>


                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Edit Project
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Update your project details and keep your collaborators informed.
                    </p>
                </div>



                <form onSubmit={updateProject} className="border border-gray-200 bg-white rounded-md">

                    {/* Project Details */}
                    <section className="border-b border-gray-200 p-6 sm:p-8">

                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">
                                Project Details
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                The core information collaborators will see first.
                            </p>
                        </div>

                        <div className="mt-6 space-y-6">

                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Project Title
                                </label>

                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                />
                            </div>


                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="6"
                                    className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                />
                            </div>


                            {/* Skills */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Required Skills
                                </label>

                                <input
                                    value={required_skills}
                                    onChange={(e) => setRequired_skills(e.target.value)}
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                />

                                <p className="mt-2 text-xs text-gray-400">
                                    Separate each skill with a comma.
                                </p>
                            </div>

                        </div>
                    </section>


                    {/* Visibility & Status */}
                    <section className="border-b border-gray-200 p-6 sm:p-8">

                        <h2 className="text-sm font-semibold text-gray-900">
                            Visibility & Status
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Control who can find this project and where it stands.
                        </p>

                        <div className="mt-6 space-y-6">

                            {/* Visibility */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Visibility
                                </label>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    <label
                                        className="flex cursor-pointer items-start gap-3 rounded-md border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50"
                                    >
                                        <input
                                            value="PUBLIC"
                                            checked={visibility === "PUBLIC"}
                                            onChange={(e) => setVisibility(e.target.value)}
                                            type="radio"
                                            name="visibility"
                                            className="mt-0.5 h-4 w-4 accent-violet-600"
                                        />
                                        <span>
                                            <span className="font-medium text-violet-700">Public</span>
                                            <p className="mt-0.5 text-xs font-normal text-gray-400">
                                                Anyone can view and request to join.
                                            </p>
                                        </span>
                                    </label>

                                    <label
                                        className="flex cursor-pointer items-start gap-3 rounded-md border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50"
                                    >
                                        <input
                                            value="PRIVATE"
                                            checked={visibility === "PRIVATE"}
                                            onChange={(e) => setVisibility(e.target.value)}
                                            type="radio"
                                            name="visibility"
                                            className="mt-0.5 h-4 w-4 accent-violet-600"
                                        />
                                        <span>
                                            <span className="font-medium text-gray-700">Private</span>
                                            <p className="mt-0.5 text-xs font-normal text-gray-400">
                                                Only invited collaborators can view.
                                            </p>
                                        </span>
                                    </label>

                                </div>
                            </div>


                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Project Status
                                </label>

                                <div className="inline-flex flex-wrap gap-2 rounded-md border border-gray-300 bg-gray-50 p-1">

                                    <label className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-gray-600 has-[:checked]:bg-violet-600 has-[:checked]:text-white">
                                        <input
                                            value="LOOKING_FOR_CONTRIBUTORS"
                                            checked={status === "LOOKING_FOR_CONTRIBUTORS"}
                                            onChange={(e) => setStatus(e.target.value)}
                                            type="radio"
                                            name="status"
                                            className="sr-only" />
                                        Looking for Contributors
                                    </label>

                                    <label className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-gray-600 has-[:checked]:bg-violet-600 has-[:checked]:text-white">
                                        <input
                                            value="IN_PROGRESS"
                                            checked={status === "IN_PROGRESS"}
                                            onChange={(e) => setStatus(e.target.value)}
                                            type="radio"
                                            name="status"
                                            className="sr-only" />
                                        In Progress
                                    </label>

                                    <label className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-gray-600 has-[:checked]:bg-violet-600 has-[:checked]:text-white">
                                        <input
                                            value="COMPLETED"
                                            checked={status === "COMPLETED"}
                                            onChange={(e) => setStatus(e.target.value)}
                                            type="radio"
                                            name="status"
                                            className="sr-only" />
                                        Completed
                                    </label>

                                </div>
                            </div>

                        </div>
                    </section>


                    {/* Last updated info */}
                    {updated_at && (
                        <div className="px-6 py-4 sm:px-8">
                            <p className="text-xs text-gray-400">
                                Last updated on {new Date(updated_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    )}


                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-5 sm:px-8">

                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="rounded-md border border-gray-300 cursor-pointer bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={saving}
                            type="submit"
                            className="rounded-md bg-violet-600 px-5 py-2.5 cursor-pointer text-sm font-medium text-white transition hover:bg-violet-700"
                        >
                            {saving ? "updating..." : "Save Changes"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProject;