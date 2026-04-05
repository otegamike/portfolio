import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: 'Shopperific',
    previews: 'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704290/shopperific-1_x65idc.png\nhttps://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-7_y0g1ne.png\nhttps://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-6_ubexsn.png\nhttps://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-5_frfuzv.png\nhttps://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-4_be8cpr.png\nhttps://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-03_zbd208.png\nhttps://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-2_iceyay.png',
    description: 'A full-featured ecommerce platform with product browsing, search, cart management, and order processing. Built with a modern React frontend and a Node.js/Express backend integrated with MongoDB.',
    techStack: 'React, TypeScript, Node.js, Express, MongoDB',
    features: 'Product Search, Shopping Cart, Order Management, Dashboard Analytics, Backend Integration',
    liveUrl: 'https://shopperific.netlify.app/',
    githubUrl: 'https://github.com/otegamike/shopperific',
    color: 'linear-gradient(135deg, hsl(120, 19%, 55%), hsl(120, 50%, 45%))',
  });
  const [formSuccess, setFormSuccess] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'neo' || password === 'matrix') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Access Denied. Invalid credentials.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 3000);
      setFormData({
        title: '',
        previews: '',
        description: '',
        techStack: '',
        features: '',
        liveUrl: '',
        githubUrl: '',
        color: '',
      });
    }, 500);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <motion.div 
          className="admin-login-box"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="admin-login-title">SYSTEM_LOGIN</h2>
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="input-group">
              <label htmlFor="password">Enter Passkey:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                autoComplete="off"
                placeholder="..."
              />
            </div>
            {errorMsg && <div className="error-message">{errorMsg}</div>}
            <button type="submit" className="admin-btn">AUTHENTICATE</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content section-container">
          <h1 className="admin-title">SYSTEM_ADMIN</h1>
          <button className="admin-logout-btn" onClick={() => handleLogout()}>LOGOUT</button>
        </div>
      </header>

      <main className="admin-main section-container">
        
        {/* Stats Section */}
        <section className="admin-section">

          <span className="section-label">Analytics</span>
          <h2 className="section-title">Traffic_Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">1,337</div>
              <div className="stat-label">Homepage Views</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">42</div>
              <div className="stat-label">Unique Visitors (Today)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">3.14s</div>
              <div className="stat-label">Avg. Session Duration</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">99.9%</div>
              <div className="stat-label">System Uptime</div>
            </div>
          </div>
        </section>

        {/* Add Project Form */}
        <section className="admin-section">
          <span className="section-label">Database</span>
          <h2 className="section-title">Add_Project</h2>
          
          <form className="project-form" onSubmit={handleProjectSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="title">Project Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              
              <div className="input-group">
                <label htmlFor="color">Theme Color (CSS Value/Gradient)</label>
                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label htmlFor="liveUrl">Live URL</label>
                <input type="url" id="liveUrl" name="liveUrl" value={formData.liveUrl} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label htmlFor="githubUrl">GitHub URL</label>
                <input type="url" id="githubUrl" name="githubUrl" value={formData.githubUrl} onChange={handleChange} required />
              </div>

              <div className="input-group full-width">
                <label htmlFor="description">Description (Markdown/Text)</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
              </div>

              <div className="input-group">
                <label htmlFor="techStack">Tech Stack (comma separated)</label>
                <textarea id="techStack" name="techStack" value={formData.techStack} onChange={handleChange} rows={3} required />
              </div>

              <div className="input-group">
                <label htmlFor="features">Features (comma separated)</label>
                <textarea id="features" name="features" value={formData.features} onChange={handleChange} rows={3} required />
              </div>

              <div className="input-group full-width">
                <label htmlFor="previews">Preview Image URLs (one per line)</label>
                <textarea id="previews" name="previews" value={formData.previews} onChange={handleChange} rows={5} required />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="admin-btn">
                {formSuccess ? 'PROJECT_SAVED' : 'SUBMIT_PROJECT'}
              </button>
              {formSuccess && <span className="success-msg">Data successfully injected.</span>}
            </div>
          </form>
        </section>

      </main>
    </div>
  );
};

export default Admin;
