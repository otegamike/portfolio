import SectionLabel from '../SectionLabel/SectionLabel';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './About.css';

interface HighlightCard {
  value: string;
  label: string;
  icon: string;
}

const highlights: HighlightCard[] = [
  { value: '4+', label: 'Years of Development Experience', icon: '' },
  { value: '30+', label: 'Projects Built', icon: '' },
  { value: '15+', label: 'Happy Clients', icon: '' },
  { value: '10+', label: 'Open Source Contrib.', icon: '' },
];

const About: React.FC = () => {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({ rootMargin: '-80px' });

  return (
    <section id="about" className="about">
      <div className="section-container">
        <div ref={ref} className={`about__container ${isInView ? 'about__container--visible' : ''}`}>
          <SectionLabel>
            About Me
          </SectionLabel>
          <h2 className="section-title about__title">
            Building digital experiences with modern tools
          </h2>

          <div className="about__grid">
            <div className="about__bio">
              <p>
                I'm a fullstack developer passionate about crafting <strong>clean, scalable user interfaces</strong>.
                My core focus is React and TypeScript — turning complex problems into intuitive, well-architected solutions.
              </p>
              <p>
                I've built dashboards, ecommerce platforms, and interactive web applications from the ground up. 
                I understand the full picture — from component architecture and state management on the frontend to APIs, databases, and search systems on the backend.
              </p>
              <p>
                I care deeply about <strong>performance, clean code, and scalable architecture.</strong> Every component I write is reusable, every interface is designed to delight, and every system is built to grow. I'm based in Lagos, Nigeria and open to remote opportunities globally.
              </p>
            </div>

            <div className="about__highlights">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="about__card"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span className="about__card-icon">
                    {h.icon || h.value}
                  </span>
                  {h.icon && <span className="about__card-value">{h.value}</span>}
                  <span className="about__card-label">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
