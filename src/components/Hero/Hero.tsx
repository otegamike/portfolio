import { motion } from 'framer-motion';
import { MoveDown } from 'lucide-react';

import './Hero.css';

const Hero: React.FC = () => {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Animated background shapes */}
      <div className="hero__bg">
        <motion.div
          className="hero__orb hero__orb--1"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero__orb hero__orb--2"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero__orb hero__orb--3"
          animate={{ x: [0, 25, -40, 0], y: [0, -45, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="hero__content">
        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Mike Imi
        </motion.h1>

        <motion.h2
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Fullstack Developer
        </motion.h2>

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          I build scalable web applications, dashboards, and ecommerce platforms
          using modern JavaScript technologies. Focused on performance,
          architecture, and beautiful user interfaces.
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="hero__btn hero__btn--primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleScroll('#projects')}
          >
            View Projects
          </motion.button>
          <motion.button
            className="hero__btn hero__btn--secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleScroll('#contact')}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <MoveDown size={25} className="move-down" />
        <span className="hero__scroll-text">Scroll down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
