import { motion } from 'framer-motion';
import SectionLabel from '../SectionLabel/SectionLabel';
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
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Framer Motion' },
    ],
  },
  {
    title: 'Backend Knowledge',
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'MongoDB' },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'Other',
    skills: [
      { name: 'Git' },
      { name: 'Responsive Design' },
      { name: 'Performance Optimization' },
      { name: 'UI Architecture' },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 0.9, transition: { duration: 0.35 } },
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <SectionLabel variants={cardVariants}>
            Skills
          </SectionLabel>
          <motion.h2 className="section-title" variants={cardVariants}>
            Technologies I work with
          </motion.h2>

          <div className="skills__grid">
            {categories.map((cat) => (
              <motion.div
                key={cat.title}
                className="skills__category"
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <h3 className="skills__category-title">{cat.title}</h3>
                <motion.div
                  className="skills__list"
                  variants={containerVariants}
                >
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      className="skills__tag"
                      variants={skillVariants}
                      whileHover={{
                        scale: 1,
                        backgroundColor: 'hsl(120, 70%, 15%)',
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
