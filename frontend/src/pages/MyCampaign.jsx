/* eslint-env es2020 */
import React, { useContext, useEffect, useState } from "react";
import LogInContext from '../context/LogInContext';
import axios from "axios";

const MyCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useContext(LogInContext);

    useEffect(() => {
        if(! isLoggedIn){
            return;
        }

        const loadCampaigns = async () => {
            try {
                const res = await axios.post("/api/campaign/fetch-campaign", {}, { withCredentials: true });
                console.log("✅ Campaign fetched from DB:", res.data);
                setCampaigns(res.data.campaigns);
            }
            catch (error) {
                console.error("❌ Error fetching campaign from DB:", error);
                throw new Error("Failed to fetch campaign from database.");
            } finally {
                setLoading(false);
            }
        };

        loadCampaigns();
    }, []);

    if (loading) return <div className="p-4">Loading campaigns...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4 text-emerald-700">My Campaigns</h1>
            {campaigns.length === 0 ? (
                <p className="text-gray-600">You have not started any campaigns yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign, index) => (
                        <div key={campaign._id} className="bg-white rounded-xl shadow-md p-4 border border-green-200">
                            <h2 className="text-xl font-bold text-emerald-600 mb-2">{campaign.title}</h2>
                            <p className="text-gray-700 mb-2">Reason: {campaign.description}</p>
                            <p className="text-gray-600 text-sm mb-1">
                                Target: {campaign.targetAmount} ETH
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                                Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCampaigns;
