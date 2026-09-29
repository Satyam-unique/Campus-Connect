import { useState, useEffect } from 'react';
import { Bell, Pin, Loader2, AlertCircle } from 'lucide-react';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notices`);
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        const data = await response.json();
        setNotices(data);
      } catch (err) {
        setError(err.message || 'An error occurred fetching notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Notices</h1>
          <p>Important announcements and updates.</p>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '300px' }}>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-secondary)' }}>
            <Loader2 className="animate-spin" size={32} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
            <p>Loading notices...</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--danger)' }}>
            <AlertCircle size={32} style={{ marginBottom: '1rem' }} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && notices.length > 0 ? (
          notices.map(notice => (
            <div key={notice._id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: notice.isPinned ? 'rgba(238, 93, 80, 0.1)' : 'rgba(67, 24, 255, 0.1)', color: notice.isPinned ? 'var(--danger)' : 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {notice.isPinned ? <Pin size={20} /> : <Bell size={20} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem' }}>{notice.title}</h3>
                  <span className={`badge ${notice.isPinned ? 'badge-warning' : 'badge-primary'}`}>{notice.category}</span>
                </div>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{notice.description}</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Posted by: {notice.postedBy}</span>
              </div>
            </div>
          ))
        ) : (
          !loading && !error && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, color: 'var(--text-muted)' }}>
              No notices available at this time.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Notices;
