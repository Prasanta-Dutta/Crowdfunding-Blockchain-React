/* eslint-env es2020 */
import React, { useEffect, useState } from "react";
import { getCrowdFundingContract } from "../utils/connectContract";
import { formatEther } from "ethers";
import CampaignCard from "../components/CampaignCard";

const ExploreCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    const safeFormatEther = (value) => {
        try {
            const eth = parseFloat(formatEther(BigInt(value)));

            // Format with commas, 6 decimal places
            return eth.toLocaleString("en-US", {
                minimumFractionDigits: 6,
                maximumFractionDigits: 6,
            });
        } catch (err) {
            console.warn("Invalid value passed to formatEther:", value);
            return "0.0000";
        }
    };

    const fetchCampaigns = async () => {
        try {
            const contract = await getCrowdFundingContract();
            const totalCampaigns = await contract.getTotalCampaigns();
            const campaignList = [];

            for (let i = 0; i < totalCampaigns; i++) {
                const campaign = await contract.getCampaign(i);
                let now = Math.floor(Date.now() / 1000);
                let durationDays = Math.ceil((Number(campaign[6]) - now) / (60 * 60 * 24));
                campaignList.push({
                    title: campaign[0],
                    description: campaign[1],
                    category: campaign[2],
                    targetAmount: campaign[4],
                    amountCollected: campaign[5],
                    deadline: durationDays, //Number(campaign[6]),
                    isActive: durationDays >= 0, //campaign[6],
                });
            }

            setCampaigns(campaignList);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            alert("Failed to load campaigns.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-emerald-100 p-8">
            <h2 className="text-3xl font-bold text-emerald-700 mb-6">Explore Campaigns</h2>
            {loading ? (
                <p className="text-center">Loading campaigns...</p>
            ) : campaigns.length === 0 ? (
                <p className="text-center">No campaigns found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {campaigns.map((campaign, index) => (
                        <div key={index} className="bg-white shadow-lg p-4 rounded-xl border border-emerald-200">
                            <CampaignCard campaign={campaign} formatEther={safeFormatEther} campaignIndex={index} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreCampaigns;
