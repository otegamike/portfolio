import { Mail, FileText } from 'lucide-react';
import SectionLabel from '../SectionLabel/SectionLabel';
import ContactForm from './ConactForm';
import { useResume } from '../../context/ResumeContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Contact.css';

const Contact: React.FC = () => {
  const { openResume } = useResume();
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({ rootMargin: '-80px' });

  return (
    <section id="contact" className="contact">
      <div className="section-container">
        <div ref={ref} className={`contact__container ${isInView ? 'contact__container--visible' : ''}`}>
          <SectionLabel>
            Contact
          </SectionLabel>
          <h2 className="section-title contact__title">
            Let's work together
          </h2>
          <p className="section-description contact__desc">
            Have a project in mind or want to collaborate? I'm always open to
            discussing new ideas and opportunities. Drop me a message below.
          </p>

          <div className="contact__grid">
            <ContactForm />

            <div className="contact__info">
              <div className="contact__info-card">
                <h3 className="contact__info-title">Connect with me</h3>
                <p className="contact__info-text">
                  Feel free to reach out through the form or connect with me on
                  social platforms.
                </p>
                <div className="contact__socials">
                  <button
                    onClick={openResume}
                    className="contact__social contact__social--resume"
                  >
                    <FileText size={22} />
                    View Resume
                  </button>
                  <a
                    href="https://github.com/otegamike"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/mike-otega"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="mailto:otegamike111@gmail.com"
                    className="contact__social"
                  >
                    <Mail size={22} />
                    otegamike111@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
