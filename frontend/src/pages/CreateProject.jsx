import { useState } from "react";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [required_skills, setRequiredSkills] = useState("");
    const [visibility, setVisibility] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();
    const navigate = useNavigate();

    const createProject = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await api.post("projects/", {
                title,
                description,
                required_skills,
                visibility,
                status,
            });

            console.log(response.data);

            showToast("Project created successfully");
            navigate("/dashboard");
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast(
                    "Something went wrong on creating projects"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-500">
                    Creating project...
                </p>
            </div>
        );
    }

    const inputClass =
        "mt-2 w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500";

    return (
        <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-20">
            <div className="mx-auto max-w-3xl">

                {/* Back */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-7 inline-flex cursor-pointer items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
                >
                    <ArrowLeft size={15} />
                    Back
                </button>


                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Create project
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                        Add the details of your project so people can
                        understand what you're building and how they
                        can contribute.
                    </p>
                </div>


                {/* Form */}
                <form
                    onSubmit={createProject}
                    className="border border-gray-200 bg-white rounded-md"
                >

                    {/* Project Information */}
                    <section className="p-6 sm:p-8">

                        <div className="mb-7">
                            <h2 className="text-base font-semibold text-gray-900">
                                Project information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Start with the basic details of your project.
                            </p>
                        </div>


                        <div className="space-y-6">

                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-800"
                                >
                                    Project title
                                </label>

                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    placeholder="What are you building?"
                                    required
                                    className={inputClass}
                                />
                            </div>


                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-800"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    rows="5"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Explain the idea, the problem it solves, and what you want to build."
                                    required
                                    className={`${inputClass} resize-y min-h-[120px]`}
                                />
                            </div>


                            {/* Skills */}
                            <div>
                                <label
                                    htmlFor="required-skills"
                                    className="block text-sm font-medium text-gray-800"
                                >
                                    Required skills
                                </label>

                                <input
                                    id="required-skills"
                                    type="text"
                                    value={required_skills}
                                    onChange={(e) =>
                                        setRequiredSkills(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Python, Django, React, PostgreSQL"
                                    className={inputClass}
                                />

                                <p className="mt-1.5 text-xs text-gray-400">
                                    Separate skills with commas.
                                </p>
                            </div>

                        </div>

                    </section>


                    {/* Visibility & Status */}
                    <section className="border-t border-gray-200 p-6 sm:p-8">

                        <div className="mb-7">
                            <h2 className="text-base font-semibold text-gray-900">
                                Project settings
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Choose who can see the project and its
                                current stage.
                            </p>
                        </div>


                        <div className="space-y-7">

                            {/* Visibility */}
                            <div>
                                <label className="block text-sm font-medium text-gray-800">
                                    Visibility
                                </label>

                                <div className="mt-3 flex gap-6">

                                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value="PUBLIC"
                                            checked={
                                                visibility === "PUBLIC"
                                            }
                                            onChange={(e) =>
                                                setVisibility(
                                                    e.target.value
                                                )
                                            }
                                            className="h-4 w-4 accent-violet-600"
                                        />

                                        <span>Public</span>
                                    </label>


                                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value="PRIVATE"
                                            checked={
                                                visibility === "PRIVATE"
                                            }
                                            onChange={(e) =>
                                                setVisibility(
                                                    e.target.value
                                                )
                                            }
                                            className="h-4 w-4 accent-violet-600"
                                        />

                                        <span>Private</span>
                                    </label>

                                </div>
                            </div>


                            {/* Status */}
                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-800"
                                >
                                    Status
                                </label>

                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                    required
                                    className={inputClass}
                                >
                                    <option value="" disabled>
                                        Select project status
                                    </option>

                                    <option value="LOOKING_FOR_CONTRIBUTERS">
                                        Looking for Contributors
                                    </option>

                                    <option value="IN_PROGRESS">
                                        In Progress
                                    </option>

                                    <option value="COMPLETED">
                                        Completed
                                    </option>
                                </select>
                            </div>

                        </div>

                    </section>


                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-5 sm:px-8">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="cursor-pointer rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
                        >
                            Create project
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default CreateProject;