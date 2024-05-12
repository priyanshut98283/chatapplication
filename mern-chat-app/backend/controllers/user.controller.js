import User from "../models/user.model.js";

import { getLLMResponse } from '../../frontend/llm/llm.js';
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body || {}; // Destructure status with fallback to an empty object
        if (!status) {
            console.log('Status is missing in request body');
            return res.status(400).json({ error: 'Status is missing in request body' });
        }

        const userId = req.user._id;
        const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getUserStatus = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).select("status");
        res.status(200).json({ status: user.status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const generateResponse = async (message) => {
    try {
        const response = await getLLMResponse(message);
        return response;
    } catch (error) {
        console.error(error);
        return 'Failed to get response from LLM';
    }
};