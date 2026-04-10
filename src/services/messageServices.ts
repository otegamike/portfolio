import api from "./api";
import { alertObj } from "../utils/alerts/alert";
import type { IMessage, IMessageForm } from "../types/messageInterface";

export const getMessages = async () : Promise<IMessage[]> => {
    try {
        const response = await api.get('/messages');
        const { data: messages } = response.data;
        console.log(messages);
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        alertObj("Error fetching messages", "error");
        throw error;
    }
}

export const sendMessage = async (message: IMessageForm) => {
    try {
        const response = await api.post('/messages/send', message);
        alertObj("Message sent successfully", "success");
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        alertObj("Error sending message", "error");
        throw error;
    }
}

export const deleteMessage = async (id: string) => {
    try {
        const response = await api.delete(`/messages/delete/${id}`);
        alertObj("Message deleted successfully", "success");
        return response.data;
    } catch (error) {
        console.error('Error deleting message:', error);
        alertObj("Error deleting message", "error");
        throw error;
    }
}