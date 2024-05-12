import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { getLLMResponse } from '../../frontend/llm/llm.js';
import User from '../models/user.model.js'; // Path to your LLM integration file

// Function to send message
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Get the recipient user from the database
        const recipient = await User.findById(receiverId);

        // Check if recipient is 'BUSY'
        if (recipient.status === 'BUSY') {
            // Generate response using language model API
            const response = await generateResponse(message);

            // Emit the response event to the sender
            io.to(getReceiverSocketId(senderId)).emit('messageResponse', response);

            // Return success response indicating the message will not be sent directly
            return res.status(200).json({ message: 'User is Busy right now. Try lator!.' });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Function to generate response using language model API



export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
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