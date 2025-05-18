import { Campaign } from '../models/savedCampaign.model.js';
import { Donate } from '../models/donatedCampaign.model.js';

const saveCampaignDetails = async (req, res) => {
    try {
        const { title, description, targetAmount, deadline, type } = req.body;

        const newCampaign = new Campaign({
            title,
            description,
            targetAmount,
            deadline: new Date(deadline),
            type,
            createdBy: req.session.userId
        });

        await newCampaign.save();

        return res.status(201).json({ message: "Campaign created", campaign: newCampaign });
    } catch (error) {
        console.error("Error saving campaign:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const saveDonateDetails = async (req, res) => {
    try {
        const { title, description, donateAmount, deadline, type } = req.body;

        const newDonation = new Donate({
            title,
            description,
            donateAmount,
            deadline: new Date(deadline),
            type,
            createdBy: req.session.userId
        });

        await newDonation.save();

        return res.status(201).json({ message: "Donation saved", donation: newDonation });
    } catch (error) {
        console.error("Error saving donation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const fetchCampaignDetails = async (req, res) => {
    try {
        const campaigns = await Campaign.find({createdBy: req.session.userId});

        if(campaigns && campaigns.length > 0){
            return res.status(200).json({ message: "Campaign Fetched", campaigns });
        }
    } catch (error) {
        console.error("Error fetching campaign:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const fetchDonationDetails = async (req, res) => {
    try {
        const campaigns = await Donate.find({createdBy: req.session.userId});

        if(campaigns && campaigns.length > 0){
            return res.status(200).json({ message: "Campaign Fetched", campaigns });
        }
    } catch (error) {
        console.error("Error fetching campaign:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { 
    saveCampaignDetails, 
    saveDonateDetails, 
    fetchCampaignDetails, 
    fetchDonationDetails 
};
