import { createContext, useState, useEffect } from "react";

// types
import type { IProject } from "../types/projectInterface";

// services
import { getProjects, addNewProject, updateProject, deleteProject } from "../services/projectServices";

export interface IProjectsContext {
    projects: IProject[];
    loading: boolean;
    loadProjects: () => Promise<void>;
    silentReload: () => Promise<void>;
    addNewProjectService: (project: IProject) => Promise<void>;
    updateProjectService: (id: string, project: IProject) => Promise<void>;
    deleteProjectService: (id: string) => Promise<void>;
}

export const ProjectsContext = createContext<IProjectsContext | undefined>(undefined);

export const ProjectsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);

    const silentReload = async () => {
        try {
          const projects = await getProjects();
          console.log(projects);
          setProjects(projects);
        } catch (error) {
          console.error(error);
        }
      }
    
      const loadProjects = async () => {
        setLoading(true);
        await silentReload();
        setLoading(false);
      }

      const addNewProjectService = async (project: IProject) => {
        const response = await addNewProject(project);
        return response;
      }

      const updateProjectService = async (id: string, project: IProject) => {
        const response = await updateProject(id, project);
        return response;
      }

      const deleteProjectService = async (id: string) => {
          await deleteProject(id);
          setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id));
      }

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <ProjectsContext.Provider 
            value={
                { 
                    projects, 
                    loading, 
                    loadProjects, 
                    silentReload, 
                    addNewProjectService, 
                    updateProjectService, 
                    deleteProjectService 
                }
            }
        >
            {children}
        </ProjectsContext.Provider>
    );
}