import { Router } from "express";
import { saveCampaignDetails, saveDonateDetails } from '../controllers/campaign.controller.js'

const campaignRouter = Router();

campaignRouter.route("/create-campaign").post(saveCampaignDetails);
campaignRouter.route("/donate-campaign").post(saveDonateDetails);

export default campaignRouter;