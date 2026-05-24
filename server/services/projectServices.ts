import Project from "../models/Project";
import { IProject, IProjectDocument } from "../types/projectInterface";
import { AppError } from "../utils/appError";

export const addNewProject = async (project: IProject) => {
    try {
        const maxOrderProject = await Project.findOne().sort({ order: -1 }).select('order');
        const newOrder = (maxOrderProject?.order ?? -1) + 1;
        const newProject = new Project({ ...project, order: newOrder });
        const savedProject = await newProject.save();
        return savedProject;
    } catch (error) {
        console.log(error);
        throw new AppError("Error adding new project", 500);
    }
}

export const getProjects = async (): Promise<IProjectDocument[]> => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: 1 });
        return projects;
    } catch (error) {
        console.log(error);
        throw new AppError("Error getting projects", 500);
    }
}

export const reorderProjects = async (orderedIds: string[]): Promise<void> => {
    try {
        await Promise.all(
            orderedIds.map((id, index) =>
                Project.findByIdAndUpdate(id, { order: index })
            )
        );
    } catch (error) {
        console.log(error);
        throw new AppError("Error reordering projects", 500);
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
