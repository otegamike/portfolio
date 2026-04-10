 import { db } from "../lib/db.js";
 import type { IMessage, IMessageDoc } from "../types/messageInterfaces.js";

 const { Schema, model, models } = db;

 const messageSchema = new Schema<IMessage>({
    name: {
        type: String,
        trim: true,
        required: true,
        index: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        
    },
    message: {
        type: String,
        required: true,
    },
 }, { timestamps: true });

 const Message = models.Message || model<IMessageDoc>("Message", messageSchema);

 export default Message;