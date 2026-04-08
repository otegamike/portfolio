import { motion } from 'framer-motion';
import SectionLabel from '../SectionLabel/SectionLabel';
import './About.css';

interface HighlightCard {
  value: string;
  label: string;
  icon: string;
}

const highlights: HighlightCard[] = [
  { value: '4+', label: 'Years Learning Development', icon: '' },
  { value: '30+', label: 'Projects Built', icon: '' },
  { value: '15+', label: 'Happy Clients', icon: '' },
  { value: '10+', label: 'Open Source Contrib.', icon: '' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <SectionLabel variants={fadeUp}>
            About Me
          </SectionLabel>
          <motion.h2 className="section-title" variants={fadeUp}>
            Building digital experiences with modern tools
          </motion.h2>

          <div className="about__grid">
            <motion.div className="about__bio" variants={fadeUp}>
              <p>
                I'm a fullstack developer passionate about crafting clean, scalable
                user interfaces. My focus is on <strong>React</strong> and{' '}
                <strong>TypeScript</strong>, and I love turning complex problems
                into intuitive, well-architected solutions.
              </p>
              <p>
                I've built dashboards, ecommerce platforms, and interactive web
                applications from the ground up. I understand the full picture —
                from component architecture and state management on the frontend
                to APIs, databases, and search systems on the backend.
              </p>
              <p>
                I care deeply about <strong>performance</strong>,{' '}
                <strong>clean code</strong>, and <strong>scalable architecture</strong>.
                Every line I write is intentional, every component is reusable, and
                every interface is designed to delight the user.
              </p>
            </motion.div>

            <motion.div
              className="about__highlights"
              variants={containerVariants}
            >
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="about__card"
                  variants={fadeUp}
                  transition={{duration: 0.3, ease: "easeInOut"}}
                  whileHover={{ y: -6, boxShadow: '0 12px 40px var(--accent-glow)'}}
                >
                  <span className="about__card-icon">
                    {h.icon || h.value}
                  </span>
                  {h.icon && <span className="about__card-value">{h.value}</span>}
                  <span className="about__card-label">{h.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
