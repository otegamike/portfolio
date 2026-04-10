import api from "./api";
import { alertObj } from "../utils/alerts/alert";
import { type IProject } from "../types/projectInterface";


export const getProjects = async () : Promise<IProject[]> => {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        alertObj("Error fetching projects", "error");
        throw error;
    }
}

export const addNewProject = async (project: IProject) => {
    try {
        const response = await api.post('/projects/new', project);
        alertObj("Project added successfully", "success");
        return response.data;
    } catch (error) {
        console.error('Error adding new project:', error);
        alertObj("Error adding new project", "error");
        throw error;
    }
}

export const updateProject = async (id: string, project: IProject) => {
    try {
        const response = await api.put(`/projects/update/${id}`, project);
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        alertObj("Error updating project", "error");
        throw error;
    }
}

export const deleteProject = async (id: string) => {
    try {
        const response = await api.delete(`/projects/delete/${id}`);
        alertObj("Project deleted successfully", "success");
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error);
        alertObj("Error deleting project", "error");
        throw error;
    }
}




