"use client";
import React, { useState } from "react";

function Hero() {
    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        amount: "",
        deadline: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", campaign);
    };

    return (
        <>
            <hr />
            <div className="backgroundMain w-full">
                <div className="max-w-6xl mx-auto p-6 ">
                    <div className="flex flex-col lg:flex-row gap-10 items-center backgroundMain content-cente p-6">
                        {/* Left Side Content */}
                        <div className="lg:w-1/2 w-full">
                            <h2 className="text-3xl font-bold mb-4 text-gray-200">Start Your Campaign</h2>
                            <p className="text-gray-200 text-lg">
                                Fill in the details to create your fundraising campaign. Make sure to provide accurate information to help people understand and support your cause.
                            </p>
                        </div>

                        {/* Right Side Form */}
                        <div className="lg:w-1/2 w-full bg-white p-6 rounded-xl mb-10">
                            <h3 className="text-xl font-semibold mb-4 text-center">Create Campaign</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Campaign Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Campaign Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={campaign.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={campaign.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Target Amount */}
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                        Target Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={campaign.amount}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                    />
                                </div>

                                {/* Deadline */}
                                <div>
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                                        Deadline
                                    </label>
                                    <input
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={campaign.deadline}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 mt-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Submit Campaign
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
