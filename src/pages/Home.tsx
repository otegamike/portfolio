import { motion } from 'framer-motion';
import MatrixRain from '../components/MatrixRain/MatrixRain';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Experience from '../components/Experience/Experience';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import MyProjects from './Admin/components/MyProjects';
import { ProjectsContextProvider } from '../context/ProjectsContext';
import './Home.css';

const Home: React.FC = () => {
  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <MatrixRain />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <ProjectsContextProvider>
          <MyProjects Admin={false} />
        </ProjectsContextProvider>
        <Experience />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Home;
