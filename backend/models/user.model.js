import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true
        },
        userEmail: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        userMob: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        userPassword: {
            type: String,
            required: [true, "Password is required"],
            trim: true
        },
        verificationStatus: {
            type: Boolean,
            default: false
        },
        profilePicture: {
            type: String,   //  url
            required: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("userPassword")) return next();

    this.userPassword = await bcrypt.hash(this.userPassword, 9);
    next();
});

userSchema.methods.isPasswordMatch = async function(password) {
    return await bcrypt.compare(password, this.userPassword);
}

export const User = mongoose.model("User", userSchema);