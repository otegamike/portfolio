import { Types } from "../lib/db.js";

export interface IProject {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
  previews: string[];
}

export interface IProjectDocument extends IProject {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
