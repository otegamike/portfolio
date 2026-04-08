import { z } from "zod";

export interface IProject {
    _id?: string;
    title: string;
    previews: string[];
    description: string;
    techStack: string[];
    features: string[];
    liveUrl: string;
    githubUrl: string;
    color: string;
}

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    previews: z.array(z.string().url("Invalid URL")).min(1, "At least one preview image is required"),
    description: z.string().min(1, "Description is required"),
    techStack: z.array(z.string()).min(1, "At least one tech stack is required"),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    liveUrl: z.string().url("Invalid URL"),
    githubUrl: z.string().url("Invalid URL"),
    color: z.string().min(1, "Color is required"),
});