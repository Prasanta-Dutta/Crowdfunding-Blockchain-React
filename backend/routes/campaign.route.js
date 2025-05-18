import { Router } from "express";
import { 
    saveCampaignDetails, 
    saveDonateDetails, 
    fetchCampaignDetails, 
    fetchDonationDetails 
} from '../controllers/campaign.controller.js'

const campaignRouter = Router();

campaignRouter.route("/create-campaign").post(saveCampaignDetails);
campaignRouter.route("/donate-campaign").post(saveDonateDetails);
campaignRouter.route("/fetch-campaign").post(fetchCampaignDetails);
campaignRouter.route("/fetch-donation").post(fetchDonationDetails);

export default campaignRouter;