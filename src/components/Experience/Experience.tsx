import SectionLabel from '../SectionLabel/SectionLabel';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Experience.css';

interface ExperienceItem {
  role: string;
  experienceType: string;
  timeline: string;
  description: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Fullstack Developer',
    experienceType: 'Freelance',
    timeline: '2023 - Present',
    description:
      'Designed and built complete fullstack applications for clients — including ecommerce platforms, admin dashboards, and productivity tools. Delivered end-to-end: frontend architecture, backend APIs, database design, and deployment on Vercel/Netlify.',
    technologies: ['React', 'TypeScript', 'CSS', 'REST APIs', 'MongoDB'],
  },
  {
    role: 'Ecommerce Platform Development',
    experienceType: 'Project — Shopperific',
    timeline: '2024 - 2025',
    description:
      'Designed and built the complete frontend for a scalable ecommerce platform. Implemented product search with debounce, cart management, order flows, and MongoDB aggregation pipelines for filtered product views and analytics.',
    technologies: ['React', 'TypeScript', 'CSS', 'MongoDB Aggregation', 'Express'],
  },
  {
    role: 'AI-powered SaaS Development',
    experienceType: 'Project — Agentic CV',
    timeline: '2026',
    description:
      'Built a Next.js 16 AI resume builder integrating Google Gemini and Groq for content generation, Clerk for authentication, Cloudinary for asset management, and PDF export. Demonstrates ability to work across a modern full SaaS stack.',
    technologies: ['Next.js 16', 'React 19', 'Groq SDK', 'Google Gemini SDK', ' Clerk', 'Cloudinary', 'PDF Generation'],
  },
  {
    role: 'UI Component Architecture & Animation',
    experienceType: 'Cross-project',
    timeline: '2023 - Present',
    description:
      'Developed scalable component libraries with clean interfaces and TypeScript props. Built animated interfaces using Framer Motion including scroll-reveal, staggered lists, page transitions, and interactive micro-animations.',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'CSS Variables'],
  },
];

const Experience: React.FC = () => {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({ rootMargin: '-80px' });

  return (
    <section id="experience" className="experience">
      <div className="section-container">
        <div ref={ref} className={`experience__container ${isInView ? 'experience__container--visible' : ''}`}>
          <SectionLabel>
            Experience
          </SectionLabel>
          <h2 className="section-title experience__title">
            My development journey
          </h2>
          <p className="experience__subtitle">
            My experience is built through freelance client work and self-directed fullstack projects. Each engagement below reflects a distinct technical challenge solved end-to-end.
          </p>

          <div className="experience__timeline">
            <div className="experience__line" />

            <div className="experience__items">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="experience__item"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <div className="experience__dot" />
                  <div className="experience__card">
                    <span className="exp-type">{exp.experienceType}</span>
                    <h3 className="experience__role">{exp.role}</h3>
                    <p className="exp-period">{exp.timeline}</p>
                    <p className="experience__desc">{exp.description}</p>
                    <div className="experience__techs">
                      {exp.technologies.map((t) => (
                        <span key={t} className="experience__tech">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
