import { motion } from 'framer-motion';
import './About.css';

interface HighlightCard {
  value: string;
  label: string;
  icon: string;
}

const highlights: HighlightCard[] = [
  { value: '3+', label: 'Years Learning Development', icon: '📅' },
  { value: '10+', label: 'Projects Built', icon: '🚀' },
  { value: '∞', label: 'Problem Solving', icon: '🧩' },
  { value: '⚙️', label: 'System Thinking', icon: '' },
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
          <motion.span className="section-label" variants={fadeUp}>
            About Me
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Building digital experiences with modern tools
          </motion.h2>

          <div className="about__grid">
            <motion.div className="about__bio" variants={fadeUp}>
              <p>
                I'm a frontend developer passionate about crafting clean, scalable
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
                  whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(108,99,255,0.15)' }}
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
