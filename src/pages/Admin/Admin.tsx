import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SectionLabel from '../../components/SectionLabel/SectionLabel';
import ProjectForm from './components/ProjectForm';
import AdminLogin from './components/AdminLogin';
import Analytics from './components/Analytics';
import MyProjects from './components/MyProjects';
import Messages from './components/messages/Messages';

// project context
import { ProjectsContextProvider } from '../../context/ProjectsContext';

import './Admin.css';

// Services
import { getStats } from '../../services/statsServices';

const emptyStats = {
  siteViews: 0,
  projectsCompleted: 0,
  messagesReceived: 0,
  yearsOfExperience: 0
};

const Admin: React.FC = () => {
  const navigate = useNavigate();

  // Auth & Stats State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState(emptyStats);

  // --- 3. HANDLERS ---
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const AuthenticateAdmin = () => {
    setIsAuthenticated(true);
  }

  useEffect(() => {
    if (isAuthenticated) {
      const loadStats = async () => {
        try {
          const s = await getStats();
          setStats(s);
        } catch (error) { console.error(error); }
      };
      loadStats();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <AdminLogin AuthenticateAdmin={AuthenticateAdmin} />
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content section-container">
          <h1 className="admin-title">SYSTEM_ADMIN</h1>
          <button className="admin-logout-btn" onClick={handleLogout}>LOGOUT</button>
        </div>
      </header>

      <main className="admin-main section-container">
        {/* Stats Section */}
        <Analytics stats={stats} />

        {/* Database / Add Project Section */}
        <section className="admin-section">
          <Messages />
          <ProjectsContextProvider>
            <SectionLabel>my projects</SectionLabel>
            <div className="admin-section-header">
              <h2 className="section-title">Add_Project</h2>
            </div>

            <div className="project-form">
              <ProjectForm />
            </div>

            <MyProjects />
          </ProjectsContextProvider>

        </section>
      </main>
    </div>
  );
};

export default Admin;
