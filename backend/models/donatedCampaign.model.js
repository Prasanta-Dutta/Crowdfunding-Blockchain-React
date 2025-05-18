import mongoose, { Schema } from "mongoose";

const donateSchema = new Schema(
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
        donateAmount: {
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
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);


export const Donate = mongoose.models.Donate || mongoose.model("Donate", donateSchema);