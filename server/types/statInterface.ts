import { Types } from "../lib/db.js";


export interface IStat {
    siteViews: number;
    projectsCompleted: number;
    messagesReceived: number;
    yearsOfExperience: number;
}

export interface IStatDoc extends IStat {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}