import SectionLabel from '../SectionLabel/SectionLabel';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Skills.css';

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Vite' },
      { name: 'JavaScript' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Framer Motion' },
    ],
  },
  {
    title: 'State & Data',
    skills: [
      { name: 'React Query' },
      { name: 'Zustand' },
      { name: 'Redux' },
      { name: 'REST APIs' },
      { name: 'Context API' },
      { name: 'zed' },
      { name: 'Chart.js' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'MongoDB' },
      { name: 'PostgreSQL' },
      { name: 'NextAuth.js' },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'Testing',
    skills: [
      { name: 'Vitest' },
      { name: 'React Testing Library' },
      { name: 'Jest' },
      { name: 'Cypress' },
    ],
  },
  {
    title: 'Tooling & Deployment',
    skills: [
      { name: 'Git' },
      { name: 'Aws' },
      { name: 'GitHub Actions' },
      { name: 'Vercel' },
      { name: 'Netlify' },
      { name: 'Google oAuth' },
    ],
  },
  {
    title: 'Practices',
    skills: [
      { name: 'Responsive Design' },
      { name: 'Performance Optimization' },
      { name: 'UI Architecture' },
      { name: 'Component Systems' },
      { name: 'Accessibility' },
      { name: 'Clean Code' },
    ],
  },
];

const Skills: React.FC = () => {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({ rootMargin: '-80px' });

  return (
    <section id="skills" className="skills">
      <div className="section-container">
        <div ref={ref} className={`skills__container ${isInView ? 'skills__container--visible' : ''}`}>
          <SectionLabel>
            Skills
          </SectionLabel>
          <h2 className="section-title skills__title">
            Technologies I work with
          </h2>
          <p className="skills__desc">
            Here are some of the technologies I have worked with in my projects and have practical experience with.
          </p>

          <div className="skills__grid">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="skills__category"
                style={{ '--i': categories.indexOf(cat) } as React.CSSProperties}
              >
                <h3 className="skills__category-title">{cat.title}</h3>
                <div className="skills__list">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="skills__tag"
                      style={{ '--j': cat.skills.indexOf(skill) } as React.CSSProperties}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
