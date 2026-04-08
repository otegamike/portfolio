import { db, Types } from "../lib/db.js";
import type { IProject, IProjectDocument } from "../types/projectInterface.js";

const projectSchema = new db.Schema<IProjectDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    techStack: {
        type: [String],
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    liveUrl: {
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    previews: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

const Project = db.model<IProjectDocument>("Project", projectSchema);

export default Project;