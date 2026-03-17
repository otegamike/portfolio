import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';

export interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  color?: string;
  previews?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack,
  features,
  liveUrl,
  githubUrl,
  color = 'var(--accent)',
  previews = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = useCallback(() => {
    if (previews.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % previews.length);
    }, 2000);
  }, [previews.length]);

  const stopCycling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isHovered) {
      startCycling();
    } else {
      stopCycling();
      setActiveIndex(0);
    }
    return stopCycling;
  }, [isHovered, startCycling, stopCycling]);

  const hasPreviews = previews.length > 0;

  return (
    <motion.article
      className="project-card"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="project-card__accent" style={{ background: color }} />
      {/* Preview carousel or accent bar */}
      {hasPreviews ? (
        <div className="project-card__carousel">
          {previews.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${title} preview ${i + 1}`}
              className={`project-card__carousel-img ${
                i === activeIndex ? 'project-card__carousel-img--active' : ''
              }`}
              loading="lazy"
            />
          ))}
          {/* Dot indicators */}
          {previews.length > 1 && (
            <div className="project-card__dots">
              {previews.map((_, i) => (
                <button
                  key={i}
                  className={`project-card__dot ${
                    i === activeIndex ? 'project-card__dot--active' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                  aria-label={`View preview ${i + 1}`}
                />
              ))}
            </div>
          )}
          {/* Scanline overlay on hover */}
          <div
            className={`project-card__scanline ${
              isHovered ? 'project-card__scanline--visible' : ''
            }`}
          />
        </div>
      ) : (
        <div className="project-card__accent" style={{ background: color }} />
      )}

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>

        <div className="project-card__features">
          {features.map((f, i) => (
            <span key={i} className="project-card__feature">
              {f}
            </span>
          ))}
        </div>

        <div className="project-card__tags">
          {techStack.map((t) => (
            <span key={t} className="project-card__tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-card__links">
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </motion.a>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
