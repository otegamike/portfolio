import Project from "../models/Project";
import { IProject, IProjectDocument } from "../types/projectInterface";
import { AppError } from "../utils/appError";

export const addNewProject = async (project: IProject) => {
    try {
        const newProject = new Project(project);
        const savedProject = await newProject.save();
        return savedProject;

    } catch (error) {
        console.log(error);
        throw new AppError("Error adding new project", 500);
    }
}

export const getProjects = async (): Promise<IProjectDocument[]> => {
    try {
        const projects = await Project.find();

        return projects;

    } catch (error) {
        console.log(error);
        throw new AppError("Error getting projects", 500);
    }
}

export const editProject = async (id: string, project: IProject) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, project, { returnDocument: 'after' });
        return updatedProject;
    } catch (error) {
        console.log(error);
        throw new AppError("Error editing project", 500);
    }
}

export const deleteProject = async (id: string) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        return deletedProject;
    } catch (error) {
        console.log(error);
        throw new AppError("Error deleting project", 500);
    }
}
