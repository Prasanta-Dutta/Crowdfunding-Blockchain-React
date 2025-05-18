import mongoose, { Schema } from "mongoose";

const campaignSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        targetAmount: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        type: {
            type: String,
            enum: ['Educational', 'Healthcare', 'Wildlife'],
            default: "general"
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // reference the User model
            required: true
        }
    },
    {
        timestamps: true
    }
);


export const Campaign = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);