import { useContext } from "react";
import { ProjectsContext } from "../context/ProjectsContext";

export const useProjectContext = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error("useProjectContext must be used within a ProjectsProvider");
    }
    return context;
}