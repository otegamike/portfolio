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

export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  previews: z.array(z.string().url("Invalid image URL")).min(1, "At least one preview image is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.array(z.string()).min(1, "At least one tech stack item is required"),
  features: z.array(z.string()),
  liveUrl: z.string().url("Invalid Live URL"),
  githubUrl: z.string().url("Invalid GitHub URL"),
  color: z.string().min(1, "Theme color is required"),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;
