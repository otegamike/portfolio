import { MoveDown } from 'lucide-react';

import './Hero.css';

const Hero: React.FC = () => {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__content">
        <span className="hero__greeting">
          Hello, I'm
        </span>

        <h1 className="hero__name">
          Mike Imi
        </h1>

        <h2 className="hero__title">
          Fullstack Developer
        </h2>

        <p className="hero__description">
          I build scalable web applications, dashboards, and ecommerce platforms using modern JavaScript technologies. Focused on performance, clean architecture, and interfaces that delight users.
        </p>

        <div className="hero__cta">
          <button
            className="hero__btn hero__btn--primary"
            onClick={() => handleScroll('#projects')}
          >
            View Projects →
          </button>
          <button
            className="hero__btn hero__btn--secondary"
            onClick={() => handleScroll('#contact')}
          >
            Contact Me
          </button>
        </div>
      </div>

      <div className="hero__scroll">
        <MoveDown size={25} className="move-down" />
        <span className="hero__scroll-text">Scroll down</span>
      </div>
    </section>
  );
};

export default Hero;
