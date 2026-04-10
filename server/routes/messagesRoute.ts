import { Router, Request, Response } from 'express'
import { catchAsync } from '../middleware/errorHandler'
import { AppError } from '../utils/appError'
import { getMessages, sendMessage, deleteMessage } from '../services/messageServices'
import type { IMessage } from '../types/messageInterfaces'
import { validateAdmin } from '../middleware/validateAdmin'

const router = Router();

router.get("/", validateAdmin, catchAsync(async (req: Request, res: Response) => {
    const messages = await getMessages();
    res.status(200).json({ success: true, data: messages });
}));

router.post("/send", catchAsync(async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message) {
        throw new AppError("All fields are required", 400);
    }

    const newMessage: IMessage = {
        name,
        email,
        message,
    };
    
    await sendMessage(newMessage);

    res.status(201).json({ success: true, message: "Message sent successfully" });
}));

router.delete("/delete/:id", validateAdmin, catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id || typeof id !== "string") {
        throw new AppError("Message ID is required", 400);
    }

    await deleteMessage(id);
    res.status(200).json({ success: true, message: "Message deleted successfully" });
}))

export default router;