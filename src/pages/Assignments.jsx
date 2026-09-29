import { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

const Assignments = () => {
  const [activeTab, setActiveTab] = useState('pending');
  
  const assignments = [
    { id: 1, title: 'React UI Development', subject: 'Web Technologies', due: 'Tomorrow, 11:59 PM', status: 'pending' },
    { id: 2, title: 'Database Normalization', subject: 'Database Management', due: 'Next Friday', status: 'pending' },
    { id: 3, title: 'Sorting Algorithms Analysis', subject: 'Data Structures', due: 'Submitted 2 days ago', status: 'completed' },
  ];

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Assignments</h1>
          <p>Track and submit your coursework.</p>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeTab === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`btn ${activeTab === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      <div className="grid-cards">
        {assignments.filter(a => a.status === activeTab).map(assignment => (
          <div key={assignment.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{assignment.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{assignment.subject}</p>
              </div>
              <span className={`badge ${assignment.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                {assignment.status}
              </span>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              Due: {assignment.due}
            </p>

            {assignment.status === 'pending' ? (
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                <UploadCloud size={18} /> Upload Work
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginTop: 'auto', padding: '0.5rem 0', fontWeight: '500' }}>
                <CheckCircle size={18} /> Submitted successfully
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
