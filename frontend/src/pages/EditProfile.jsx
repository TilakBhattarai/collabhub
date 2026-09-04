import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";

const EditProfile = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [experience, setExperience] = useState("");
    const [availability, setAvailability] = useState("");
    const [lookingFor, setLookingFor] = useState("");
    const [skills, setSkills] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [portfolioLink, setPortfolioLink] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState('');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("profile/");

                const data = response.data;

                setRole(data.role || "");
                setBio(data.bio || "");
                setLocation(data.location || "");
                setExperience(data.experience || "");
                setAvailability(data.availability || "");
                setLookingFor(data.looking_for || "");
                setSkills(data.skills || "");
                setGithubLink(data.github || "");
                setPortfolioLink(data.portfolio || "");
                setProfilePicturePreview(data.profile_picture || "");

            } catch (error) {
                console.log(error);

                if (error.response?.status === 401) {
                    showToast("You are not authenticated");
                    navigate("/login");
                } else if (error.response?.status === 404) {
                    showToast("Your profile hasn't been created yet!");
                    navigate("/profile");
                } else {
                    showToast("Something went wrong while loading your profile");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate, showToast]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            const formData = new FormData();

            formData.append("role", role);
            formData.append("bio", bio);
            formData.append("location", location);
            formData.append("experience", experience);
            formData.append("availability", availability);
            formData.append("looking_for", lookingFor);
            formData.append("skills", skills);
            formData.append("github", githubLink);
            formData.append("portfolio", portfolioLink);

            if (profilePicture) {
                formData.append("profile_picture", profilePicture);
            }

            const response = await api.patch(
                "profile/edit/",
                formData
            );

            console.log(response.data);

            showToast("Profile updated successfully!");
            navigate("/profile");

        } catch (error) {
            console.log(error);

            if (error.response?.status === 401) {
                showToast("You are not authenticated");
            } else if (error.response?.data?.error) {
                showToast(error.response.data.error);
            } else {
                showToast("Something went wrong while updating your profile");
            }

        } finally {
            setSaving(false);
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Loading...
                </p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-20">
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Edit Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Update your profile information and let others know
                        more about you.
                    </p>
                </div>


                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >

                    {/* Basic Information */}
                    <div className="border-b border-gray-200 p-6 sm:p-8">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Basic Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Tell people who you are.
                        </p>

                        <div className="mt-6 space-y-5">

                            {/* Role */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Role
                                </label>

                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="e.g. Full Stack Developer"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                                />
                            </div>
                            {/* Profile Picture */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Profile Picture
                                </label>

                                <div className="flex items-center gap-5">

                                    {profilePicturePreview ? (
                                        <img
                                            src={
                                                profilePicturePreview.startsWith("blob:")
                                                    ? profilePicturePreview
                                                    : `http://127.0.0.1:8000${profilePicturePreview}`
                                            }
                                            alt="Profile preview"
                                            className="h-20 w-20 rounded-full object-cover border border-gray-200"
                                        />
                                    ) : (
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-900 text-2xl font-semibold text-white">
                                            ?
                                        </div>
                                    )}

                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];

                                                if (!file) return;

                                                setProfilePicture(file);
                                                setProfilePicturePreview(
                                                    URL.createObjectURL(file)
                                                );
                                            }}
                                            className="block w-full text-sm text-gray-500"
                                        />

                                        <p className="mt-2 text-xs text-gray-400">
                                            JPG, PNG or WebP. Choose a clear profile picture.
                                        </p>
                                    </div>

                                </div>
                            </div>


                            {/* Bio */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Bio
                                </label>

                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows="4"
                                    placeholder="Tell others about yourself..."
                                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                                />
                            </div>


                            {/* Location */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    placeholder="e.g. Itahari, Nepal"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                                />
                            </div>

                        </div>
                    </div>


                    {/* Experience & Skills */}
                    <div className="border-b border-gray-200 p-6 sm:p-8">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Experience & Skills
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Show what you can bring to a project.
                        </p>

                        <div className="mt-6 space-y-5">

                            {/* Experience */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Experience
                                </label>

                                <textarea
                                    value={experience}
                                    onChange={(e) =>
                                        setExperience(e.target.value)
                                    }
                                    rows="4"
                                    placeholder="e.g. 1 year building React applications..."
                                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                                />
                            </div>

                            {/* Skills */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Skills
                                </label>

                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="e.g. React, JavaScript, Django, PostgreSQL"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                                />

                                <p className="mt-2 text-xs text-gray-400">
                                    Separate each skill with a comma.
                                </p>
                            </div>

                        </div>
                    </div>


                    {/* Availability */}
                    <div className="border-b border-gray-200 p-6 sm:p-8">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Availability
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Let people know how much time you can commit.
                        </p>

                        <div className="mt-6">

                            <label className="mb-2 block text-sm font-medium text-gray-800">
                                Hours per week
                            </label>

                            <select
                                value={availability}
                                onChange={(e) =>
                                    setAvailability(e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900"
                            >
                                <option value="">
                                    Select availability
                                </option>

                                <option value="0-5">
                                    0-5 hrs/week
                                </option>

                                <option value="5-10">
                                    5-10 hrs/week
                                </option>

                                <option value="10-20">
                                    10-20 hrs/week
                                </option>

                                <option value="20+">
                                    20+ hrs/week
                                </option>
                            </select>

                        </div>
                    </div>


                    {/* Looking For */}
                    <div className="border-b border-gray-200 p-6 sm:p-8">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Looking For
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            What kind of people or opportunities are you
                            interested in?
                        </p>

                        <div className="mt-6">

                            <label className="mb-2 block text-sm font-medium text-gray-800">
                                What are you looking for?
                            </label>

                            <textarea
                                value={lookingFor}
                                onChange={(e) =>
                                    setLookingFor(e.target.value)
                                }
                                rows="4"
                                placeholder="e.g. Developers to build projects with..."
                                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                            />

                        </div>
                    </div>


                    {/* Links */}
                    <div className="border-b border-gray-200 p-6 sm:p-8">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Links
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add your GitHub and portfolio.
                        </p>

                        <div className="mt-6 space-y-5">

                            {/* GitHub */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    GitHub
                                </label>

                                <input
                                    type="url"
                                    value={githubLink}
                                    onChange={(e) =>
                                        setGithubLink(e.target.value)
                                    }
                                    placeholder="https://github.com/username"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                                />

                            </div>


                            {/* Portfolio */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-800">
                                    Portfolio
                                </label>

                                <input
                                    type="url"
                                    value={portfolioLink}
                                    onChange={(e) =>
                                        setPortfolioLink(e.target.value)
                                    }
                                    placeholder="https://yourportfolio.com"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                                />

                            </div>

                        </div>
                    </div>


                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 bg-gray-50 px-6 py-5 sm:px-8">

                        {/* Cancel */}
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            disabled={saving}
                            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>


                        {/* Save */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProfile;