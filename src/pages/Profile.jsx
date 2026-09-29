import { useState, useEffect, useContext } from 'react';
import { User, BookOpen, Clock, Calendar, Mail, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Profile = () => {
  const { token, user, setUser, logout } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: {
            'x-auth-token': token
          }
        });

        if (!res.ok) {
          throw new Error('Failed to load profile');
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('token') || err.message.includes('auth')) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token, user, setUser, logout]);

  if (loading) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', color: 'var(--text-secondary)' }}>
        <Loader2 className="animate-spin" size={40} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', color: 'var(--danger)' }}>
        <AlertCircle size={40} style={{ marginBottom: '1rem' }} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Student Profile</h1>
          <p>Manage your account and academic details.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Left Column: Avatar & Basic Info */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '1.5rem', boxShadow: '0 8px 32px rgba(67, 24, 255, 0.3)' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{user?.name}</h2>
          <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Mail size={16} /> {user?.email}
          </p>
          <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', margin: '1rem 0' }}></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Joined {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Right Column: Academic Details */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
            <GraduationCap size={24} /> Academic Information
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Branch</p>
              <h4 style={{ fontSize: '1.1rem' }}>{user?.branch}</h4>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Semester</p>
              <h4 style={{ fontSize: '1.1rem' }}>Semester {user?.semester}</h4>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Section</p>
              <h4 style={{ fontSize: '1.1rem' }}>{user?.section}</h4>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Student Status</p>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--success)' }}>Active</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
