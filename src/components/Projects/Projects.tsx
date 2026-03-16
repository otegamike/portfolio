import { motion } from 'framer-motion';
import ProjectCard, { type ProjectCardProps } from '../ProjectCard/ProjectCard';
import './Projects.css';

const projects: ProjectCardProps[] = [
  {
    title: 'Shopperific',
    description:
      'A full-featured ecommerce platform with product browsing, search, cart management, and order processing. Built with a modern React frontend and a Node.js/Express backend integrated with MongoDB.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Product Search',
      'Shopping Cart',
      'Order Management',
      'Dashboard Analytics',
      'Backend Integration',
    ],
    liveUrl: '#',
    githubUrl: '#',
    color: 'linear-gradient(135deg, #6c63ff, #a855f7)',
  },
  {
    title: 'React Dashboard System',
    description:
      'An interactive admin dashboard featuring analytics visualization, shop management, order tracking, and product statistics. Designed for scalability with a reusable component architecture.',
    techStack: ['React', 'TypeScript', 'CSS Grid', 'REST APIs', 'Chart.js'],
    features: [
      'Data Visualization',
      'Reusable Components',
      'Responsive Layout',
      'Real-time Stats',
      'Role-based Views',
    ],
    liveUrl: '#',
    githubUrl: '#',
    color: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    title: 'To-Do List App',
    description:
      'A polished task management application with rich animations, categorized notes, and an intuitive drag-and-drop interface. Demonstrates strong Framer Motion proficiency.',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'LocalStorage'],
    features: [
      'Animated Transitions',
      'Drag & Drop',
      'Note Categories',
      'Persistent Storage',
      'Micro-interactions',
    ],
    liveUrl: '#',
    githubUrl: '#',
    color: 'linear-gradient(135deg, #10b981, #34d399)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.span className="section-label" variants={fadeUp}>
            Projects
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Featured work
          </motion.h2>
          <motion.p className="section-description" variants={fadeUp}>
            A selection of projects that showcase my skills in frontend
            development, component architecture, and full-stack integration.
          </motion.p>

          <motion.div className="projects__grid" variants={containerVariants}>
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
