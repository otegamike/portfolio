import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SectionLabel from '../../components/SectionLabel/SectionLabel';
import './Admin.css';

// services
import { getStats } from '../../services/statsServices';
import { addNewProject } from '../../services/projectServices';
import type { IProject, projectSchema } from '../../types/projectInterface';
import { adminLogin } from '../../services/adminLogin';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const emptyStats = {
  siteViews: 0,
  projectsCompleted: 0,
  messagesReceived: 0,
  yearsOfExperience: 0
}

const emptyFormData: IProject = {
  title: '',
  previews: [],
  description: '',
  techStack: [],
  features: [],
  liveUrl: '',
  githubUrl: '',
  color: '',
}

export const testFormData: IProject = {
    title: 'Shopperific',
    previews: ['https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704290/shopperific-1_x65idc.png', 'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-7_y0g1ne.png', 'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-6_ubexsn.png', 'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-5_frfuzv.png', 'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-4_be8cpr.png', 'https://res.cloudinary.com/dgaprn7ur/image/upload/v1773704289/shopperific-03_zbd208.png'],
    description: 'A full-featured ecommerce platform with product browsing, search, cart management, and order processing. Built with a modern React frontend and a Node.js/Express backend integrated with MongoDB.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    features: ['Product Search', 'Shopping Cart', 'Order Management', 'Dashboard Analytics', 'Backend Integration'],
    liveUrl: 'https://shopperific.netlify.app/',
    githubUrl: 'https://github.com/otegamike/shopperific',
    color: 'linear-gradient(135deg, hsl(120, 19%, 55%), hsl(120, 50%, 45%))',
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [stats, setStats] = useState(emptyStats);
  

  // Form State
  const [formData, setFormData] = useState<IProject>(emptyFormData);
    
  const [formSuccess, setFormSuccess] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const loadStats = async () => {
    try {
      const stats = await getStats();
      setStats(stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  const resetForm = () => {
    setFormData(emptyFormData);
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const success = await adminLogin({ password });
      if (success) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrorMsg('Access Denied. Invalid credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePillsChange = (name: string, value: string[]) => {
    setFormData({ ...formData, [name]: value });
  }



  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      await addNewProject(formData);
      setFormSuccess(true);
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

  

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
          <form onSubmit={(e: React.FormEvent) => handleAdminLogin(e)} className="admin-login-form">
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
            <button type="submit" className="admin-btn"> {isLoggingIn ? 'AUTHENTICATING...' : 'AUTHENTICATE'}</button>
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

          <SectionLabel>Analytics</SectionLabel>
          <h2 className="section-title">Traffic_Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.siteViews.toLocaleString()}</div>
              <div className="stat-label">Total Site Views</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.projectsCompleted}</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.messagesReceived}</div>
              <div className="stat-label">Messages Received</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.yearsOfExperience}+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
          </div>
        </section>

        {/* Add Project Form */}
        <section className="admin-section">
          <SectionLabel>Database</SectionLabel>
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

              <FormPills
                label="Tech Stack"
                id="techStack"
                name="techStack"
                formValue={formData.techStack}
                handlePillsChange={handlePillsChange}
              />

              <FormPills
                label="Features"
                id="features"
                name="features"
                formValue={formData.features}
                handlePillsChange={handlePillsChange}
              />

              <FormPills
                label="Preview Images urls"
                id="previews"
                name="previews"
                formValue={formData.previews}
                handlePillsChange={handlePillsChange}
                type="image-preview"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="admin-btn">
                {isSubmiting ? 'SUBMITTING...' : formSuccess ? 'PROJECT_SAVED' : 'SUBMIT_PROJECT'}
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

type PillType = "pills" | "image-preview";

export interface FormPillsProps {
  label: string;
  id: string;
  name: string;
  formValue: string[];
  type?: PillType;
  handlePillsChange: (name: string, value: string[]) => void;
}

const FormPills = ({ label, id, name, formValue, type, handlePillsChange }: FormPillsProps) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleRemovePill = (index: number) => {
    const newValues = [...formValue];
    newValues.splice(index, 1);
    handlePillsChange(name, newValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes(",") && value.at(-1) !==",") {
      const values = value.split(",");
      handlePillsChange(name, [...formValue, ...values]);
      setInputValue("");
    } else if (value.at(-1) ===",") {
      if (value.slice(0, -1).trim() === "") return;
      handlePillsChange(name, [...formValue, value.slice(0, -1)]);
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  const pillType: Record<PillType, React.ReactNode> = {
    "pills": <Pills formValue={formValue} handleRemovePill={handleRemovePill} />,
    "image-preview": <ImagePreview formValue={formValue} handleRemovePill={handleRemovePill} />
  }



  return (
    <div className="input-group">
      <label htmlFor={id}>{label} (comma separated)</label>

      <div className="pills-input-wrapper">
        {(formValue.length > 0) &&
          pillType[type || "pills"]
        }

        <input id={id} name={name} value={inputValue} onChange={(e) => handleChange(e)} />
      </div>
    </div>
  )
}

interface PillsProps {
  formValue: string[];
  handleRemovePill: (index: number) => void;
}

const Pills = ({formValue, handleRemovePill}: PillsProps) => {
  return (
    <div className="pills-container">
          {formValue.map((pill, index) => (
            <div key={index} className="pill">
              <span>{pill}</span>
              <button className="pill-remove-btn" type="button" onClick={() => handleRemovePill(index)}>
                &times;
              </button>
            </div>
          ))}
    </div>
    
  )
}

const ImagePreview = ({formValue, handleRemovePill}: PillsProps) => {
  return (
    <div className="image-preview-container">
      {formValue.map((imageUrl, index) => (
            <div key={imageUrl} className="image-pill">
              <img className="preview-image" src={imageUrl} alt={`preview-${index}`} />
              <button className="image-remove-btn" type="button" onClick={() => handleRemovePill(index)}>
                &times;
              </button>
            </div>
          ))}
    </div>
  )
}


