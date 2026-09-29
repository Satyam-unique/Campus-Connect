import { useState, useEffect } from 'react';
import { Clock, Loader2, AlertCircle } from 'lucide-react';

const Timetable = () => {
  const [timetableDoc, setTimetableDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const queryParams = new URLSearchParams({
    branch: 'IT',
    semester: 3,
    section: 'B',
    day: daysOfWeek[currentDayIndex]
  }).toString();

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : 6));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev < 6 ? prev + 1 : 0));
  };

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/timetable?${queryParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch timetable');
        }
        const data = await response.json();
        
        if (data && data.length > 0) {
          setTimetableDoc(data[0]);
        } else {
          setTimetableDoc(null);
          setError('No timetable found for the selected parameters.');
        }
      } catch (err) {
        setError(err.message || 'An error occurred fetching the timetable');
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [queryParams]);

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Timetable</h1>
          <p>
            {loading ? 'Fetching schedule...' : `Your schedule for today (${daysOfWeek[currentDayIndex]}).`}
            {timetableDoc && (
              <span style={{ marginLeft: '8px', color: 'var(--text-muted)' }}>
                {timetableDoc.branch} • Sem {timetableDoc.semester} • Sec {timetableDoc.section}
              </span>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={handlePrevDay}>Previous Day</button>
          <button className="btn btn-primary" onClick={handleNextDay}>Next Day</button>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '300px' }}>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-secondary)' }}>
            <Loader2 className="animate-spin" size={32} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
            <p>Loading your schedule...</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--danger)' }}>
            <AlertCircle size={32} style={{ marginBottom: '1rem' }} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && timetableDoc && timetableDoc.lectures && timetableDoc.lectures.length > 0 ? (
          timetableDoc.lectures.map((lecture, i) => {
            const isPractical = (lecture.subject?.toLowerCase() || '').includes('practical') || (lecture.room?.toLowerCase() || '').includes('lab');
            
            return (
              <div key={i} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px', color: 'var(--accent-primary)', fontWeight: '600' }}>
                  <Clock size={24} style={{ marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.85rem' }}>{lecture.time}</span>
                </div>
                
                <div style={{ flex: 1, borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{lecture.subject}</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        {lecture.room} {lecture.faculty ? `• ${lecture.faculty}` : ''}
                      </p>
                    </div>
                    <span className={`badge ${isPractical ? 'badge-warning' : 'badge-primary'}`}>
                      {isPractical ? 'Practical / Lab' : 'Lecture'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          !loading && !error && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, color: 'var(--text-muted)' }}>
              No lectures scheduled for this day.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Timetable;
