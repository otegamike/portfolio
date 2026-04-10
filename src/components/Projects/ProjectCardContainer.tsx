import { useState } from 'react';
import type { IProject } from '../../types/projectInterface';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectForm from '../../pages/Admin/components/ProjectForm';

import { motion } from 'framer-motion';

interface ProjectCardContainerProps {
  Admin?: boolean;
  project: IProject;
}

function ProjectCardContainer({Admin, project}: ProjectCardContainerProps) {
  const [isEditing, setIsEditing] = useState(false);

  const EnterEditMode = () => {
    setIsEditing(true);
  }

  const ExitEditMode = () => {
    setIsEditing(false);
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
              <button onClick={ExitEditMode}>Cancel</button>
            ) : (
              <button onClick={EnterEditMode}>Edit</button>
            )}
            <button onClick={() => console.log('Delete project')}>Delete</button>
            </div>
        )}

        {isEditing ? (
          <div className="project-card__edit">
            <ProjectForm project={project} editMode={true} id={project._id} />
          </div>
        ) : (
            <ProjectCard project={project} />
        )}
    </motion.article>
  )
}

export default ProjectCardContainer