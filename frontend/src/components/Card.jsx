"use client";
import React from "react";

const campaigns = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260",
        title: "Clean Water for All",
        description: "Help us provide clean drinking water to remote villages.",
        deadline: "2025-06-30",
        targetAmount: 50000,
        raisedAmount: 20000,
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260",
        title: "Education for Every Child",
        description: "Support our mission to build schools and provide supplies.",
        deadline: "2025-07-15",
        targetAmount: 80000,
        raisedAmount: 60000,
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260",
        title: "Medical Aid for Flood Victims",
        description: "Donate to provide medicines and healthcare to flood victims.",
        deadline: "2025-05-20",
        targetAmount: 100000,
        raisedAmount: 92000,
    },
];

function Card() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">List All Campaigns</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white rounded-lg shadow-md shadow-slate-300 overflow-hidden">
                        <img
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{campaign.title}</h3>
                            <p className="text-gray-600 mb-3">{campaign.description}</p>
                            <p className="text-sm text-gray-500 mb-3">
                                <strong>Deadline:</strong> {campaign.deadline}
                            </p>
                            <div className="flex justify-between text-sm font-medium text-gray-700">
                                <p>Target: ₹{campaign.targetAmount.toLocaleString()}</p>
                                <p>Raised: ₹{campaign.raisedAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Card;
