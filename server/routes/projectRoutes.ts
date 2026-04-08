import {Router, Request, Response} from 'express'
import Project from '../models/Project.js';
import { validateAdmin } from '../middleware/validateAdmin.js';
import { catchAsync } from '../middleware/errorHandler.js';
import { addNewProject, getProjects, editProject } from '../services/projectServices.js';


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

export default router;
