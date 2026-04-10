import { useState } from 'react';
import type { IProject } from '../../types/projectInterface';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectForm from '../../pages/Admin/components/ProjectForm';

// hooks
import { useProjectContext } from '../../hooks/useProjectContext';

import { motion } from 'framer-motion';

interface ProjectCardContainerProps {
  Admin?: boolean;
  project: IProject;
}

function ProjectCardContainer({Admin, project}: ProjectCardContainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { deleteProjectService, silentReload } = useProjectContext();

  const enterEditMode = () => {
    setIsEditing(true);
  }

  const exitEditMode = () => {
    setIsEditing(false);
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      if (!project._id) {
        throw new Error('Project ID is required');
      }
      await deleteProjectService(project._id);
      silentReload();
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <motion.article
        className="project-card"
        variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
    >
        {Admin && (
            <div className="project-card__admin">
            {isEditing ? (
              <button onClick={exitEditMode}>Cancel</button>
            ) : (
              <button onClick={enterEditMode}>Edit</button>
            )}
            <button onClick={handleDelete} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
            </div>
        )}

        {isEditing ? (
          <div className="project-card__edit">
            <ProjectForm project={project} editMode={true} exitEditMode={exitEditMode} id={project._id} />
          </div>
        ) : (
            <ProjectCard project={project} />
        )}
    </motion.article>
  )
}

export default ProjectCardContainer