import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseEther } from 'ethers';
import { getCrowdFundingContract } from "../utils/connectContract";

// import axios from "axios";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        targetAmount: "",
        deadline: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { title, description, category, targetAmount, deadline } = formData;

        const deadlineTimestamp = new Date(deadline).getTime() / 1000;
        const now = Math.floor(Date.now() / 1000);
        const durationDays = Math.ceil((deadlineTimestamp - now) / (60 * 60 * 24));
        // Date.now() && Date.getTime() both return the time in ms
        // Sec/60 -> Min/60 -> Hrs/24 -> Day

        // console.log(deadline)
        // console.log(deadlineTimestamp)
        // console.log(now)
        // console.log(durationDays);
        // console.log(parseEther(targetAmount));

        
        if (durationDays <= 0) {
            alert("Deadline must be in the future!");
            setLoading(false);
            return;
        }

        try {
            if (!window.ethereum) {
                alert("Please install MetaMask to continue.");
                return;
            }

            await window.ethereum.request({ method: "eth_requestAccounts" });

            const contract = await getCrowdFundingContract();
            const txn = await contract.createCampaign(
                title,
                description,
                category, // You can add a category field in form later
                parseEther(targetAmount), // Convert INR to ETH roughly for demo
                durationDays
            );

            await txn.wait();
            alert("Campaign created successfully!");
            navigate("/"); // Redirect to homepage
        } 
        catch (error) {
            console.error("Error creating campaign:", error);
            alert("Failed to create campaign. See console for details.");
        }
        finally {
            setLoading(false); // Stop loader
        }
        
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
                            <label htmlFor="category" className="block font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="education">Education</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="environment">Environment</option>
                                <option value="animal-welfare">Animal Welfare</option>
                                <option value="community">Community</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="targetAmount" className="block font-medium text-gray-700">
                                Target Amount (INR)
                            </label>
                            <input
                                type="number"
                                name="targetAmount"
                                id="targetAmount"
                                
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
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Campaign"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign;
