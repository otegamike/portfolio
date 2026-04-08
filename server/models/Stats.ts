import { db } from "../lib/db.js";
import type { IStat } from "../types/statInterface.js";

const { Schema, model, models } = db;


const statSchema = new Schema<IStat>({
    siteViews: {
        type: Number,
        default: 0,
    },
    projectsCompleted: {
        type: Number,
        default: 0,
    },
    messagesReceived: {
        type: Number,
        default: 0,
    },
    yearsOfExperience: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Stat = models.Stat || model<IStat>("Stat", statSchema);

export default Stat;