import {Router, Request, Response} from 'express'
import { validateAdmin } from '../middleware/validateAdmin.js';
import { catchAsync } from '../middleware/errorHandler.js';
import { addNewProject, getProjects, editProject, deleteProject } from '../services/projectServices.js';


const router = Router();

// Get all projects
router.get('/', catchAsync(async (req: Request, res: Response) => {
   
    const projects = await getProjects();
    res.status(200).json(projects);
    
}));

// Add a new project
router.post('/new', validateAdmin, catchAsync(async (req: Request, res: Response) => {
  
    const { title, description, techStack, features, liveUrl, githubUrl, color, previews } = req.body;
    
    const newProject = {
        title,
        description,
        techStack,
        features,
        liveUrl,
        githubUrl,
        color,
        previews,
    };

    const savedProject = await addNewProject(newProject);
    res.status(201).json(savedProject);
}));

// Edit a project
router.put('/update/:id', validateAdmin, catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        throw new Error('Project ID is required');
    }
    const { title, description, techStack, features, liveUrl, githubUrl, color, previews } = req.body;
    
    const updatedProject = await editProject(id, {
        title,
        description,
        techStack,
        features,
        liveUrl,
        githubUrl,
        color,
        previews,
    });
    
    res.status(200).json(updatedProject);
}));

// Delete a project
router.delete('/delete/:id', validateAdmin, catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        throw new Error('Project ID is required');
    }
    const deletedProject = await deleteProject(id);
    res.status(200).json(deletedProject);
}));

export default router;
