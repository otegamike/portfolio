import { useEffect, useState } from "react";
import Projects from "../../../components/Projects/Projects"
import SectionLabel from "../../../components/SectionLabel/SectionLabel";

// hooks
import { useProjectContext } from "../../../hooks/useProjectContext";
import type { IProject } from "../../../types/projectInterface";


function MyProjects({Admin = true}: {Admin?: boolean}) {
  const {projects, loadProjects, loading, reorderProjectsService} = useProjectContext();
  const [isReordering, setIsReordering] = useState(false);
  const [orderedProjects, setOrderedProjects] = useState<IProject[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (!isReordering) {
      setOrderedProjects(projects);
    }
  }, [projects, isReordering]);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const newOrdered = [...orderedProjects];
    const [draggedItem] = newOrdered.splice(dragIndex, 1);
    newOrdered.splice(index, 0, draggedItem);
    setOrderedProjects(newOrdered);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const handleSaveOrder = async () => {
    try {
      const ids = orderedProjects.map(p => p._id!).filter(Boolean);
      await reorderProjectsService(ids);
      setIsReordering(false);
    } catch {
      // error handled in service
    }
  };

  const handleCancelReorder = () => {
    setOrderedProjects(projects);
    setIsReordering(false);
  };

  const startReorder = () => {
    setOrderedProjects([...projects]);
    setIsReordering(true);
  };

  return (
    <>
    {loading ? (
      <div className="loading">
        <SectionLabel infinite={true}>Loading Projects....</SectionLabel>
      </div>
    ) : isReordering ? (
      <div className="reorder-container">
        <SectionLabel>Projects</SectionLabel>
        <div className="reorder-header">
          <h2 className="section-title">Featured work</h2>
          <span className="reorder-badge">Reorder mode</span>
        </div>
        <div className="reorder-list">
          {orderedProjects.map((project, index) => (
            <div
              key={project._id}
              className={`reorder-item ${dragIndex === index ? 'dragging' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <span className="reorder-drag-handle">⠿</span>
              <div className="reorder-thumb">
                {project.previews?.[0] ? (
                  <img src={project.previews[0]} alt={project.title} />
                ) : (
                  <div className="reorder-thumb-placeholder">{project.title[0]}</div>
                )}
              </div>
              <span className="reorder-name">{project.title}</span>
            </div>
          ))}
        </div>
        <div className="reorder-actions">
          <button className="admin-btn reorder-save-btn" onClick={handleSaveOrder}>SAVE ORDER</button>
          <button className="admin-btn reorder-cancel-btn" onClick={handleCancelReorder}>CANCEL</button>
        </div>
      </div>
    ) : (
      <div className="projects-wrapper">
        {Admin && (
          <button className="reorder-trigger-btn" onClick={startReorder}>Reorder</button>
        )}
        <Projects projects={projects} Admin={Admin} />
      </div>
    )}
    </>
  )
}

export default MyProjects
