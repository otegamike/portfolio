import { useState } from 'react';
import type { IProject } from '../../types/projectInterface';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectForm from '../../pages/Admin/components/ProjectForm';
import { useProjectContext } from '../../hooks/useProjectContext';

interface ProjectCardContainerProps {
  Admin?: boolean;
  project: IProject;
  index: number;
}

function ProjectCardContainer({Admin, project, index}: ProjectCardContainerProps) {
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
    <article
        className="project-card"
        style={{ '--i': index } as React.CSSProperties}
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
    </article>
  )
}

export default ProjectCardContainer
