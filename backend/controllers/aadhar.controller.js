import mongoose from 'mongoose';
import { aadharTable } from '../models/aadhar.model.js';
import fs from 'fs/promises';  // Use fs.promises for async/await

const insertData = async (req, res) => {
    try {
        const data = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ error: "Expected an array of data" });
        }

        for (const entry of data) {
            if (!entry.aadharNumber || !entry.mobile) {
                return res.status(400).json({ error: "Each entry must contain aadharNumber and mobile" });
            }
        }

        await aadharTable.insertMany(data);
        console.log("✅ Data inserted successfully");
        res.status(200).json({ message: "Data inserted successfully" });
        
    } catch (error) {
        console.error("❌ Error inserting data:", error.message);
        res.status(500).json({ error: "Error inserting data", details: error.message });
    }
};


const verifyUser = async (req, res) => {
    try {
        const { aadharNumber, mobile } = req.body;

        aadharNumber = aadharNumber.trim();

        if (!/^[2-9][0-9]{11}$/.test(trimmedAadhar)) {
            return res.status(400).json(
                {
                    error: "Invalid Aadhar number format",
                    verifiedStatus: false
                }
            );
        }

        if (req.session.userId) {
            const aadharHolder = await aadharTable.findOne({
                $and: [{ aadharNumber }, { mobile }]
            });

            if (!aadharHolder) {
                return res.status(401).json(
                    {
                        error: "Invalid credentials",
                        verifiedStatus: false
                    }
                );
            }

            const existedUser = await User.findById(req.session.userId);
            existedUser.verificationStatus = true;
            await existedUser.save();

            return res.status(200).json({ verifiedStatus: true });
        }
        else {
            return res.status(401).json({ verifiedStatus: false });
        }
    }
    catch (error) {
        console.log(`Internal server error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

export { insertData, verifyUser };