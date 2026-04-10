import { motion } from "framer-motion"
import { useState } from "react"
import { adminLogin } from "../../../services/adminLogin"

interface AdminLoginProps {
  AuthenticateAdmin: () => void;
}

function AdminLogin({ AuthenticateAdmin }: AdminLoginProps) {

  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoggingIn(true);
      try {
        const success = await adminLogin({ password });
        if (success) AuthenticateAdmin();
      } catch (error) {
        setErrorMsg('Access Denied. Invalid credentials.');
      } finally {
        setIsLoggingIn(false);
      }
    };

  return (
    <div className="admin-login-wrapper">
        <motion.div className="admin-login-box" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <h2 className="admin-login-title">SYSTEM_LOGIN</h2>
          <form onSubmit={handleAdminLogin} className="admin-login-form">
            <div className="input-group">
              <label>Enter Passkey:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus placeholder="..." />
            </div>
            {errorMsg && <div className="error-message">{errorMsg}</div>}
            <button type="submit" className="admin-btn">{isLoggingIn ? 'AUTHENTICATING...' : 'AUTHENTICATE'}</button>
          </form>
        </motion.div>
      </div>
  )
}

export default AdminLogin