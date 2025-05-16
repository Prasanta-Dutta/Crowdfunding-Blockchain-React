"use client";
import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { getCrowdFundingContract } from "../utils/connectContract";
import { parseEther } from "ethers";
import LogInContext from "../context/LogInContext";
import { toast } from 'react-toastify';

let image = "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function CampaignCard({ campaign, formatEther, campaignIndex, refreshCampaigns }) {
    const [donationAmount, setDonationAmount] = useState("");
    const [isDonating, setIsDonating] = useState(false);
    const {isLoggedIn, isVerified} = useContext(LogInContext);
    const navigatePage = useNavigate();

    const handleDonate = async () => {
        if(! isLoggedIn){
            navigatePage('/signin');
            return;
        }
        if(! isVerified){
            navigatePage('/verification');
            return;
        }

        if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
            toast.error("Please enter a valid donation amount.");
            return;
        }

        try {
            setIsDonating(true);

            const contract = await getCrowdFundingContract();
            const tx = await contract.donate(campaignIndex, {
                value: parseEther(donationAmount),
            });

            toast.loading("Processing transaction...");

            await tx.wait();
            toast.dismiss(); // remove loading toast
            toast.success("🎉 Donation successful!");

            
            // 🔁 Refresh campaign data
            if (refreshCampaigns) {
                refreshCampaigns();
            }
        } catch (error) {
            console.error("Donation failed:", error);
            toast.dismiss();
            toast.error("❌ Transaction failed: " + (error.reason || error.message));
        } finally {
            setDonationAmount("");  // reset input field to ""
            setIsDonating(false);
        }
    };

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
                    <p className="text-emerald-600">Category: {campaign.category.toUpperCase()}</p>
                    <p className="text-orange-400">
                        <strong>Deadline:</strong> {Math.max(0, campaign.deadline)} Days Left
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-medium text-gray-700 mb-5 gap-2">
                    <p>Target: {formatEther(campaign.targetAmount)} ETH</p>
                    <p>Raised: {formatEther(campaign.amountCollected)} ETH</p>
                </div>

                {campaign.isActive && (
                    <>
                        <input
                            type="number"
                            placeholder="Enter ETH amount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            disabled={isDonating}
                            className="w-full px-3 py-2 mb-2 border rounded-md"
                        />
                        <button
                            onClick={handleDonate}
                            disabled={isDonating}
                            className="w-full py-2 px-4 rounded-lg text-white font-semibold transition bg-emerald-600 hover:bg-emerald-700"
                        >
                            {isDonating ? "Processing..." : "Donate"}
                        </button>
                    </>
                )}

                {!campaign.isActive && (
                    <button
                        disabled
                        className="mt-auto w-full py-2 px-4 rounded-lg text-white font-semibold bg-gray-400 cursor-not-allowed"
                    >
                        Closed
                    </button>
                )}
            </div>
        </>
    );
}

export default CampaignCard;
