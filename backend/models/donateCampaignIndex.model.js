import mongoose, {Schema} from "mongoose";

const donateCampaignIndex = new Schema(
    {
        donateIndex: {
            type: [Number]
        },
        walletAddresses: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);


export const DonateIndex = mongoose.models.Donate || mongoose.model("DonateIndex", donateCampaignIndex);