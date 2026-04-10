import Message from "../models/Message.js";
import type { IMessage } from "../types/messageInterfaces.js";
import { AppError } from "../utils/appError.js";
import { sendPortfolioEmail } from "../utils/sendMail.js";

export const getMessages = async () => {
    try {
        const messages = await Message.find()
            .sort({ createdAt: -1 })
        ;
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw new AppError("Error fetching messages", 500);
    }
}

export const sendMessage = async (message: IMessage) => {
    try {
        const EMailResponse = 
        await sendPortfolioEmail(
            message.name,
            message.email,
            message.message,
        );

        if(!EMailResponse.sent) {
            throw new AppError("Error sending email", 500);
        }
        
        const newMessage = new Message(message);
        await newMessage.save();
        return newMessage;

    } catch (error) {
        console.error('Error sending message:', error);
        throw new AppError("Error sending message", 500);
    }
}

export const deleteMessage = async (id: string) => {
    try {
        const message = await Message.findByIdAndDelete(id);
        if(!message) {
            throw new AppError("Message not found or already deleted", 404);
        }
        return message;
    } catch (error) {
        console.error('Error deleting message:', error);
        throw new AppError("Error deleting message", 500);
    }
}