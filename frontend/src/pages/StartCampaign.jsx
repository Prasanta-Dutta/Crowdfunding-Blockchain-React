import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        targetAmount: "",
        deadline: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Send data to backend or perform validation
        console.log("Campaign Data:", formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-50 to-emerald-100 flex items-center justify-center px-4">
            <div className="relative w-full max-w-4xl">
                {/* Floating Close Button */}
                <div className="top-auto z-10 m-4 hidden lg:block">
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={() => navigate("/")}
                        className="bg-emerald-500 shadow-lg shadow-white text-white font-semibold hover:bg-emerald-700 p-2 rounded-full transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Main Form Container */}
                <div className="bg-white shadow-2xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-center text-emerald-600 mb-6">Create Campaign</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="title" className="block font-medium text-gray-700">
                                Campaign Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="targetAmount" className="block font-medium text-gray-700">
                                Target Amount (INR)
                            </label>
                            <input
                                type="number"
                                name="targetAmount"
                                id="targetAmount"
                                min="1"
                                value={formData.targetAmount}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="deadline" className="block font-medium text-gray-700">
                                Deadline
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                id="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition"
                        >
                            Create Campaign
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign;
