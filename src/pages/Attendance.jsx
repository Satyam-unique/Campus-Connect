

const Attendance = () => {
  const subjects = [
    { name: 'Data Structures', attended: 35, total: 40, percentage: 87.5 },
    { name: 'Database Management', attended: 28, total: 35, percentage: 80.0 },
    { name: 'Operating Systems', attended: 30, total: 42, percentage: 71.4 },
    { name: 'Computer Networks', attended: 15, total: 16, percentage: 93.7 },
  ];

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Attendance Tracker</h1>
          <p>Monitor your class attendance across all subjects.</p>
        </div>
      </header>

      <div className="grid-cards">
        {subjects.map((sub, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{sub.name}</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: sub.percentage < 75 ? 'var(--danger)' : 'var(--success)' }}>
                {sub.percentage}%
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{sub.attended} / {sub.total} Classes</span>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${sub.percentage}%`, 
                height: '100%', 
                background: sub.percentage < 75 ? 'var(--danger)' : 'var(--success)',
                borderRadius: '4px'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
