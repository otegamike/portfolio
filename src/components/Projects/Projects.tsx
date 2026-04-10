import { motion } from 'framer-motion';
import ProjectCardContainer from './ProjectCardContainer';
import type { IProject as ProjectCardProps } from '../../types/projectInterface';
import SectionLabel from '../SectionLabel/SectionLabel';
import './Projects.css';

const allProjects: ProjectCardProps[] = [
  {
    title: 'Shopperific',
    previews: [
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704290/shopperific-1_x65idc.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-6_ubexsn.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-5_frfuzv.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-4_be8cpr.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-03_zbd208.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-2_iceyay.png',
    ],
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
    liveUrl: 'https://shopperific.netlify.app/',
    githubUrl: 'https://github.com/otegamike/shopperific',
    color: 'linear-gradient(135deg, hsl(120, 19%, 55%), hsl(120, 50%, 45%))',
  },
  {
    title: 'Inkly',
    previews: [
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706893/inkly-1_ylejp9.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706891/inkly-3_z3tssa.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706887/inkly-2_ckac48.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706880/inkly-4_x4owxw.png'
    ],
    description:
    'Inkly is a blog with a modern design and a user-friendly interface. It is built with a modern React frontend and a Node.js/Express backend integrated with MongoDB.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Product Search',
      'Shopping Cart',
      'Order Management',
      'Dashboard Analytics',
      'Backend Integration',
    ],
    liveUrl: 'https://inklyapp.netlify.app/',
    githubUrl: 'https://github.com/otegamike/inkly',
    color: 'linear-gradient(135deg, hsl(130, 34%, 55%), hsl(30, 90%, 45%))',
  },
  {
    title: 'Bento Gridy',
    previews: [
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706753/bento-grid-01_qj1te8.png'
    ],
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
    liveUrl: 'https://bento-gridy.netlify.app/',
    githubUrl: 'https://github.com/otegamike/bento-grid',
    color: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    title: 'Open Clipboard',
    previews: [
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1775033315/Open-Clipboard-1_p0dech.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1775033308/Open-Clipboard-2_esebfp.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1775033307/Open-Clipboard-3_nilu1u.png'
    ],
    description:
      'Open Clipboard is the fastest way to create password-protected text clipboards. Share with your team, access from anywhere, and keep your data secure.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Framer Motion'],
    features: [
      'Password Protection',
      'Secure Storage',
      'Unlimited Clipboards',
      'Real-time Sync',
      'Micro-interactions',
    ],
    liveUrl: 'http://open-clipboard.netlify.app/',
    githubUrl: 'https://github.com/otegamike/open-clipboard',
    color: 'linear-gradient(135deg, #10b981, #34d399)',
  },
  {
    title: 'Noterrific',
    previews: [
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706141/Noterrific-1_zv84vj.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706130/Noterrific-4_gjbjnq.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706163/Noterrific-3_svn2lq.png',
      'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773706163/Noterrific-3_svn2lq.png'
    ],
    description:
      'A polished task management application with rich animations, categorized notes, and an intuitive drag-and-drop interface. Built with a modern React frontend and a Node.js/Express backend integrated with MongoDB. Demonstrates strong Framer Motion proficiency.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Framer Motion', 'LocalStorage'],
    features: [
      'Animated Transitions',
      'Drag & Drop',
      'Note Categories',
      'Persistent Storage',
      'Micro-interactions',
    ],
    liveUrl: 'http://noterrific.netlify.app/',
    githubUrl: 'https://github.com/otegamike/noterrific',
    color: 'linear-gradient(135deg, #10b981, #34d399)',
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface ProjectsProps {
  projects?: ProjectCardProps[];
  Admin?: boolean;
}

const Projects = ({projects = allProjects, Admin = false}: ProjectsProps) => {
  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <SectionLabel variants={fadeUp}>
            Projects
          </SectionLabel>
          <motion.h2 className="section-title" variants={fadeUp}>
            Featured work
          </motion.h2>
          {!Admin && (
            <motion.p className="section-description" variants={fadeUp}>
              A selection of projects that showcase my skills in frontend
              development, component architecture, and full-stack integration.
            </motion.p>
          )}

          <motion.div className="projects__grid" variants={containerVariants}>
            {projects.map((project) => (
              
              <ProjectCardContainer key={project.title} project={project} Admin={Admin} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
