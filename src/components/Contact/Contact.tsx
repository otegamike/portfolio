import { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes — would integrate with a backend or email service
    alert(`Thanks for reaching out, ${form.name}! I'll get back to you soon.`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.span className="section-label" variants={fadeUp}>
            Contact
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Let's work together
          </motion.h2>
          <motion.p className="section-description" variants={fadeUp}>
            Have a project in mind or want to collaborate? I'm always open to
            discussing new ideas and opportunities. Drop me a message below.
          </motion.p>

          <div className="contact__grid">
            <motion.form
              className="contact__form"
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              <motion.div className="contact__field" variants={fadeUp}>
                <label htmlFor="contact-name" className="contact__label">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="contact__input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div className="contact__field" variants={fadeUp}>
                <label htmlFor="contact-email" className="contact__label">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="contact__input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div className="contact__field" variants={fadeUp}>
                <label htmlFor="contact-message" className="contact__label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact__textarea"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="contact__submit"
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Message
              </motion.button>
            </motion.form>

            <motion.div className="contact__info" variants={containerVariants}>
              <motion.div className="contact__info-card" variants={fadeUp}>
                <h3 className="contact__info-title">Connect with me</h3>
                <p className="contact__info-text">
                  Feel free to reach out through the form or connect with me on
                  social platforms.
                </p>
                <div className="contact__socials">
                  <motion.a
                    href="https://github.com/otegamike"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/mike-otega"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
