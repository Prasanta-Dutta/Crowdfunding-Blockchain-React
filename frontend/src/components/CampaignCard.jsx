"use client";
import React from "react";

let image = "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function CampaignCard({ campaign, formatEther, campaignIndex }) {
    return (
        <>
            <img
                src={image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{campaign.title}</h3>
                <p className="text-gray-600 mb-3">{campaign.description}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-medium text-gray-700 mb-3 gap-2">
                    <p className=" text-emerald-600">Category: {campaign.category.toUpperCase()}</p>
                    <p className=" text-orange-400 ">
                        <strong>Deadline:</strong> {(campaign.deadline)} Days Left
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-medium text-gray-700 mb-5 gap-2">
                    <p>Target: ₹{formatEther(campaign.targetAmount)} ETH</p>
                    <p>Raised: ₹{formatEther(campaign.amountCollected)} ETH</p>
                </div>
                <button
                    onClick={() => alert(`Donate to: ${campaign.title}, Campaign no: ${campaignIndex}`)}
                    disabled={!campaign.isActive}
                    className={`mt-auto w-full py-2 px-4 rounded-lg text-white font-semibold transition 
                        ${campaign.isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-400 cursor-not-allowed"}`}
                >
                    {campaign.isActive ? "Donate" : "Closed"}
                </button>
            </div>
        </>
    );
}

export default CampaignCard;
