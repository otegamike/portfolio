import zod from "zod";

export interface IMessage {
    _id: string;
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export const MessageFormSchema = zod.object({
    name: zod.string().min(3, "Name must be at least 3 characters long"),
    email: zod.string().email("Invalid email address"),
    message: zod.string().min(20, "Message must be at least 20 characters long"),
});

export type IMessageForm = zod.infer<typeof MessageFormSchema>;