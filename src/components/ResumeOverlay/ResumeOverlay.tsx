import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import './ResumeOverlay.css';

const ResumeOverlay: React.FC = () => {
  const { isResumeOpen, closeResume } = useResume();

  // Prevent background scrolling when overlay is active
  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isResumeOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeResume();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeResume]);

  return (
    <AnimatePresence>
      {isResumeOpen && (
        <motion.div
          className="resume-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeResume}
        >
          <motion.div
            className="resume-overlay__container"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="resume-overlay__header">
              <div className="resume-overlay__title">
                <span className="resume-overlay__terminal-prompt">&gt; </span>
                <span className="resume-overlay__filename">resume.sys</span>
                <span className="resume-overlay__blink-caret">_</span>
              </div>

              <div className="resume-overlay__actions">
                <a
                  href="/resume/mike-resume.pdf"
                  download="Mike_Otega_Resume.pdf"
                  className="resume-overlay__action-btn resume-overlay__action-btn--download"
                  title="Download Resume"
                >
                  <Download size={16} />
                  <span className="resume-overlay__btn-text">Download</span>
                </a>
                <button
                  onClick={closeResume}
                  className="resume-overlay__action-btn resume-overlay__action-btn--close"
                  aria-label="Close resume overlay"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="resume-overlay__content">
              <div className="resume-overlay__viewer">
                <img
                  src="/resume/mike-resume-page1.png"
                  alt="Resume Page 1"
                  className="resume-overlay__page-img"
                />
                <img
                  src="/resume/mike-resume-page2.png"
                  alt="Resume Page 2"
                  className="resume-overlay__page-img"
                />
              </div>
            </div>

            {/* Premium Agentic Tag */}
            <div className="resume-overlay__footer">
              <div className="resume-overlay__agent-badge">
                <span className="resume-overlay__agent-dot" />
                <span className="resume-overlay__agent-text">Made with agentic-cv</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeOverlay;
