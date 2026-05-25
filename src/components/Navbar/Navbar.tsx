import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const { openResume } = useResume();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={() => handleClick('#home')}>
          <span className="navbar__logo-bracket">&lt;</span>
          MikeImi
          <span className="navbar__logo-accent">.dev</span>
          <span className="navbar__logo-bracket"> /&gt;</span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar__resume-item">
            <button
              onClick={openResume}
              className="navbar__resume-btn"
              title="View Resume"
            >
              <FileText size={14} />
              <span>Resume</span>
            </button>
          </li>
        </ul>

        <button
          className={`navbar__hamburger ${isMobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile ${isMobileOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ '--i': i } as React.CSSProperties}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeSection === link.href.slice(1) ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ '--i': navLinks.length } as React.CSSProperties}>
            <button
              onClick={() => {
                setIsMobileOpen(false);
                openResume();
              }}
              className="navbar__mobile-resume-btn"
            >
              <FileText size={16} />
              <span>Resume</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
