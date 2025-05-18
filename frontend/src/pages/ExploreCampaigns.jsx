// /* eslint-env es2020 */
// import React, { useEffect, useState } from "react";
// import { getCrowdFundingContract } from "../utils/connectContract";
// import { formatEther } from "ethers";
// import CampaignCard from "../components/CampaignCard";

// const ExploreCampaigns = () => {
//     const [campaigns, setCampaigns] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [walletConnected, setWalletConnected] = useState(false);
//     let contract = null;

//     const safeFormatEther = (value) => {
//         try {
//             const eth = parseFloat(formatEther(BigInt(value)));

//             // Format with commas, 6 decimal places
//             return eth.toLocaleString("en-US", {
//                 minimumFractionDigits: 6,
//                 maximumFractionDigits: 6,
//             });
//         } catch (err) {
//             console.warn("Invalid value passed to formatEther:", value);
//             return "0.0000";
//         }
//     };

//     const fetchCampaigns = async () => {
//         try {
//             if(!walletConnected){
//                 contract = await getCrowdFundingContract();
//                 setWalletConnected(true);
//             }

//             const totalCampaigns = await contract.getTotalCampaigns();
//             const campaignList = [];

//             for (let i = 0; i < totalCampaigns; i++) {
//                 const campaign = await contract.getCampaign(i);
//                 let now = Math.floor(Date.now() / 1000);
//                 let durationDays = Math.ceil((Number(campaign[6]) - now) / (60 * 60 * 24));
//                 campaignList.push({
//                     title: campaign[0],
//                     description: campaign[1],
//                     category: campaign[2],
//                     targetAmount: campaign[4],
//                     amountCollected: campaign[5],
//                     deadline: durationDays, //Number(campaign[6]),
//                     isActive: durationDays >= 0, //campaign[6],
//                 });
//             }

//             setCampaigns(campaignList);
//         } catch (error) {
//             console.error("Error fetching campaigns:", error);
//             alert("Failed to load campaigns.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCampaigns();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-gray-50 to-emerald-100 p-8">
//             <h2 className="text-3xl font-bold text-emerald-700 mb-6">Explore Campaigns</h2>
//             {loading ? (
//                 <p className="text-center">Loading campaigns...</p>
//             ) : campaigns.length === 0 ? (
//                 <p className="text-center">No campaigns found.</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {campaigns.map((campaign, index) => (
//                         <div key={index} className="bg-white shadow-lg p-4 rounded-xl border border-emerald-200">
//                             <CampaignCard campaign={campaign} formatEther={safeFormatEther} campaignIndex={index} />
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ExploreCampaigns;






/* eslint-env es2020 */
/*
import React, { useState, useRef } from "react";
import { getCrowdFundingContract } from "../utils/connectContract";
import { formatEther } from "ethers";
import CampaignCard from "../components/CampaignCard";

const ExploreCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const contractRef = useRef(null); // Persistent reference

    const safeFormatEther = (value) => {
        try {
            const eth = parseFloat(formatEther(BigInt(value)));
            return eth.toLocaleString("en-US", {
                minimumFractionDigits: 6,
                maximumFractionDigits: 6,
            });
        } catch (err) {
            console.warn("Invalid value passed to formatEther:", value);
            return "0.000000";
        }
    };

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const totalCampaigns = await contractRef.current.getTotalCampaigns();
            const campaignList = [];

            for (let i = 0; i < totalCampaigns; i++) {
                const campaign = await contractRef.current.getCampaign(i);
                const now = Math.floor(Date.now() / 1000);
                const durationDays = Math.ceil((Number(campaign[6]) - now) / (60 * 60 * 24));

                campaignList.push({
                    title: campaign[0],
                    description: campaign[1],
                    category: campaign[2],
                    targetAmount: campaign[4],
                    amountCollected: campaign[5],
                    deadline: durationDays,
                    isActive: durationDays >= 0,
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

    const handleConnectAndLoad = async () => {
        try {
            const contract = await getCrowdFundingContract();
            if (contract) {
                contractRef.current = contract;
                setWalletConnected(true);
                await fetchCampaigns();
            }
        } catch (err) {
            console.error("Wallet connection failed:", err.message);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-emerald-100 p-8">
            <h2 className="text-3xl font-bold text-emerald-700 mb-6">Explore Campaigns</h2>

            {!walletConnected && (
                <div className="text-center mb-6">
                    <button
                        onClick={handleConnectAndLoad}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
                    >
                        Connect Wallet & Load Campaigns
                    </button>
                </div>
            )}

            {loading ? (
                <p className="text-center">Loading campaigns...</p>
            ) : campaigns.length === 0 ? (
                walletConnected && <p className="text-center">No campaigns found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {campaigns.map((campaign, index) => (
                        <div key={index} className="bg-white shadow-lg p-4 rounded-xl border border-emerald-200">
                            <CampaignCard
                                campaign={campaign}
                                formatEther={safeFormatEther}
                                campaignIndex={index}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreCampaigns;
*/







import React, { useEffect, useState } from "react";
import { getCrowdFundingContractReadOnly } from "../utils/connectContract";
import { formatEther } from "ethers";
import CampaignCard from "../components/CampaignCard";

const ExploreCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    const safeFormatEther = (value) => {
        try {
            const eth = parseFloat(formatEther(BigInt(value)));
            return eth.toLocaleString("en-US", {
                minimumFractionDigits: 6,
                maximumFractionDigits: 6,
            });
        } catch (err) {
            console.warn("Invalid value passed to formatEther:", value);
            return "0.000000";
        }
    };

    const fetchCampaigns = async () => {
        try {
            const contract = getCrowdFundingContractReadOnly();
            const totalCampaigns = await contract.getTotalCampaigns();
            const campaignList = [];

            for (let i = 0; i < totalCampaigns; i++) {
                const campaign = await contract.getCampaign(i);
                await new Promise(resolve => setTimeout(resolve, 100)); // throttle
                const now = Math.floor(Date.now() / 1000);
                const durationDays = Math.ceil((Number(campaign[6]) - now) / (60 * 60 * 24));

                campaignList.push({
                    title: campaign[0],
                    description: campaign[1],
                    category: campaign[2],
                    targetAmount: campaign[4],
                    amountCollected: campaign[5],
                    deadlineTimestamp: Number(campaign[6])*1000,
                    deadline: durationDays,
                    isActive: durationDays > 0,
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

    const fetchOneCampaign = async (index) => {
        try {
            const contract = getCrowdFundingContractReadOnly();

            const campaign = await contract.getCampaign(index);
            const now = Math.floor(Date.now() / 1000);
            const durationDays = Math.ceil((Number(campaign[6]) - now) / (60 * 60 * 24));

            const updatedCampaign = {
                title: campaign[0],
                description: campaign[1],
                category: campaign[2],
                targetAmount: campaign[4],
                amountCollected: campaign[5],
                deadline: durationDays,
                isActive: durationDays >= 0,
            };

            setCampaigns((prev) => {
                const updated = [...prev];
                updated[index] = updatedCampaign;
                return updated;
            })

        } catch (error) {
            console.error("Failed to refresh single campaign:", error);
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
                            <CampaignCard 
                                campaign={campaign} 
                                formatEther={safeFormatEther} 
                                campaignIndex={index} 
                                refreshCampaigns={() => fetchOneCampaign(index)} 
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreCampaigns;
