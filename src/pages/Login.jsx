import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Loader2, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = isRegister ? `${import.meta.env.VITE_API_URL}/api/auth/register` : `${import.meta.env.VITE_API_URL}/api/auth/login`;
    const body = isRegister ? formData : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-box glass-panel">
        <div className="login-header">
          <div className="logo-icon-large">C</div>
          <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isRegister ? 'Join Campus Connect today' : 'Login to access your campus hub'}</p>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(238, 93, 80, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input type="text" name="name" className="input-field" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
            </div>
          )}
          <div className="input-group">
            <label className="input-label">Student Email</label>
            <input type="email" name="email" className="input-field" placeholder="student@college.edu" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" name="password" className="input-field" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
          </div>
          
          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? <Loader2 size={20} className="animate-spin" /> : (isRegister ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span className="toggle-link" onClick={() => { setIsRegister(!isRegister); setError(null); }}>
              {isRegister ? 'Sign In' : 'Register'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
