import mongoose, {Schema} from "mongoose";

const aadharSchema = new Schema(
    {
        aadharNumber: {
            type: String,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    }
);

export const aadharTable = mongoose.model("aadharTable", aadharSchema);