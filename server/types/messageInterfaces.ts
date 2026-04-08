import { Types } from "../lib/db.js";

export interface IMessage {
    name: string;
    email: string;
    message: string;
}

export interface IMessageDoc extends IMessage {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}