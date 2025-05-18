import mongoose, {Schema} from "mongoose";

const createCampaignIndex = new Schema(
    {
        createIndex: {
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


export const CreateIndex = mongoose.models.Donate || mongoose.model("CreateIndex", createCampaignIndex);