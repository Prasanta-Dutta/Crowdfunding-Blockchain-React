import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import validator from 'validator';

const registerUser = async (req, res) => {
    try {

        const {
            name: userName,
            email: userEmail,
            mobile: userMob,
            password: userPassword
        } = req.body;

        // If input field are empty
        if (
            [userName, userEmail, userMob, userPassword].some((inputField) => {
                return inputField.trim() === "";
            })
        ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!validator.isMobilePhone(userMob)) {
            return res.status(400).json({ error: "Invalid mobile number" });
        }

        if (!validator.isEmail(userEmail)) {
            return res.status(400).json({ error: "Invalid email" });
        }

        const existedUser = await User.findOne({
            $or: [{ userEmail }, { userMob }]
        });

        if (existedUser) {
            return res.status(409).json({ error: "User already exist" });
        }

        const createdUser = await User.create({
            userName,
            userEmail,
            userMob,
            userPassword
        });

        if (!createdUser) {
            return res.status(500).json({ error: "Failed to register user" });
        }
        else {
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: createdUser._id,
                    userName: createdUser.userName,
                    userEmail: createdUser.userEmail,
                    userMob: createdUser.userMob
                }
            });
        }
    }
    catch (error) {
        console.log(`Internal server error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong" });
    }

};


const loginUser = async (req, res) => {
    try {
        const {
            email: userEmail,
            password: userPassword
        } = req.body;

        // If input field validation
        if (!validator.isEmail(userEmail)) {
            return res.status(400).json({ error: "Invalid email" });
        }

        if (userPassword.trim() === "") {
            return res.status(400).json({ error: "Password can not be empty" });
        }

        const existedUser = await User.findOne({ userEmail: userEmail });   //  { userEmail} valid also

        if (!existedUser) {
            return res.status(404).json({ error: "User not exist" });
        }

        const passwordMatch = await existedUser.isPasswordMatch(userPassword);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        else {
            req.session.userId = existedUser._id;
            return res
                .status(200)
                .json({
                    message: "Loggedin successfully",
                    user: {
                        id: existedUser._id,
                        userName: existedUser.userName,
                        userEmail: existedUser.userEmail,
                        userMob: existedUser.userMob
                    }
                });
        }
    }
    catch (error) {
        console.log(`Internal server error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

const logoutUser = async (req, res) => {
    await req.session.destroy(err => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });
};

const checkSession = async (req, res) => {
    if (req.session.userId) {
        return res.status(200).json({ loggedIn: true });
    }
    else {
        return res.status(401).json({ loggedIn: false });
    }
};

export { registerUser, loginUser, logoutUser, checkSession };