import { motion } from 'framer-motion';
import './Experience.css';

interface ExperienceItem {
  role: string;
  description: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Frontend Developer — Shopperific Ecommerce Platform',
    description:
      'Designed and built the complete frontend for a scalable ecommerce platform. Implemented product search, cart management, order flows, and integrated with a Node.js/Express/MongoDB backend. Created reusable component systems and handled complex state management.',
    technologies: ['React', 'TypeScript', 'CSS', 'REST APIs', 'MongoDB'],
  },
  {
    role: 'Dashboard & Analytics Development',
    description:
      'Built interactive admin dashboards featuring shop overview pages, order tracking, product statistics, and analytics visualizations. Focused on responsive layouts, data-driven components, and seamless API integration.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'CSS Grid', 'Express'],
  },
  {
    role: 'Search & Data Integration',
    description:
      'Implemented full-text search with debounced query handling, MongoDB aggregation pipelines, and filtered product views. Built data transformation layers connecting frontend components to complex backend queries.',
    technologies: ['MongoDB', 'Aggregation', 'Node.js', 'React', 'REST APIs'],
  },
  {
    role: 'UI Component Architecture & Animation',
    description:
      'Developed scalable component libraries with clean interfaces and TypeScript props. Built animated interfaces using Framer Motion including scroll-reveal, staggered lists, page transitions, and interactive micro-animations.',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'CSS Variables'],
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.span className="section-label" variants={fadeUp}>
            Experience
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            My development journey
          </motion.h2>

          <div className="experience__timeline">
            {/* Animated timeline line */}
            <motion.div
              className="experience__line"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />

            <motion.div
              className="experience__items"
              variants={containerVariants}
            >
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  className="experience__item"
                  variants={itemVariants}
                >
                  <div className="experience__dot" />
                  <motion.div whileHover={{ x: 8 }} className="experience__card">
                    <h3 className="experience__role">{exp.role}</h3>
                    <p className="experience__desc">{exp.description}</p>
                    <div className="experience__techs">
                      {exp.technologies.map((t) => (
                        <span key={t} className="experience__tech">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
