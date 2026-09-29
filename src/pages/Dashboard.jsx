import { useState, useEffect } from 'react';
import { Bell, Calendar, BookOpen, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [notices, setNotices] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [noticesRes, timetableRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/notices`),
          fetch(`${import.meta.env.VITE_API_URL}/api/timetable?branch=IT&semester=3&section=B&day=${currentDay}`)
        ]);

        if (noticesRes.ok) {
          const noticesData = await noticesRes.json();
          setNotices(noticesData.slice(0, 2));
        }

        if (timetableRes.ok) {
          const timetableData = await timetableRes.json();
          if (timetableData && timetableData.length > 0 && timetableData[0].lectures) {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            const upcomingClasses = timetableData[0].lectures.filter(lecture => {
              if (!lecture.time) return true;
              
              const timeParts = lecture.time.split('-');
              if (timeParts.length === 2) {
                const endTime = timeParts[1].trim();
                const [endHour, endMinute] = endTime.split(':').map(Number);
                const endMinutesTotal = endHour * 60 + endMinute;
                return endMinutesTotal > currentMinutes;
              }
              return true; 
            });

            setSchedule(upcomingClasses.slice(0, 3));
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentDay]);

  const quickStats = [
    { title: 'Upcoming Classes', value: schedule.length.toString(), icon: <Clock size={24} />, color: 'var(--accent-primary)' },
    { title: 'Pending Assignments', value: '2', icon: <BookOpen size={24} />, color: 'var(--warning)' },
    { title: 'New Notices', value: notices.length.toString(), icon: <Bell size={24} />, color: 'var(--danger)' },
    { title: 'Attendance', value: '85%', icon: <Calendar size={24} />, color: 'var(--success)' },
  ];

  return (
    <div className="dashboard animate-fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p>Welcome back! Here's what's happening today ({currentDay}).</p>
        </div>
      </header>

      <div className="grid-cards stats-grid">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card glass-panel">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="recent-notices glass-panel">
          <div className="section-header">
            <h2>Recent Notices</h2>
            <button className="btn btn-secondary btn-sm"><a href="/notices" style={{textDecoration: 'none', color: 'inherit'}}>View All</a></button>
          </div>
          <div className="notice-list">
            {loading ? (
               <p style={{ color: 'var(--text-muted)' }}>Loading notices...</p>
            ) : notices.length > 0 ? (
              notices.map(notice => (
                <div key={notice._id} className="notice-item">
                  <div className={`notice-icon ${notice.isPinned ? 'danger-bg' : 'primary-bg'}`}>
                    <Bell size={16} />
                  </div>
                  <div className="notice-content">
                    <h4>{notice.title}</h4>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>
                      {notice.description}
                    </p>
                    <span className="notice-time">{notice.category}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No recent notices.</p>
            )}
          </div>
        </div>

        <div className="upcoming-classes glass-panel">
          <div className="section-header">
            <h2>Today's Schedule</h2>
            <button className="btn btn-secondary btn-sm"><a href="/timetable" style={{textDecoration: 'none', color: 'inherit'}}>Timetable</a></button>
          </div>
          <div className="class-list">
            {loading ? (
               <p style={{ color: 'var(--text-muted)' }}>Loading schedule...</p>
            ) : schedule.length > 0 ? (
              schedule.map((lecture, index) => {
                const isPractical = (lecture.subject?.toLowerCase() || '').includes('practical') || (lecture.room?.toLowerCase() || '').includes('lab');
                return (
                  <div key={index} className={`class-item ${index === 0 ? 'active' : ''}`}>
                    <div className="class-time" style={{ fontSize: '0.85rem' }}>{lecture.time}</div>
                    <div className="class-details">
                      <h4>{lecture.subject}</h4>
                      <p>
                        {lecture.room} {lecture.faculty ? `• ${lecture.faculty}` : ''}
                      </p>
                    </div>
                    {index === 0 && <span className="badge badge-primary">Next</span>}
                  </div>
                );
              })
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No classes scheduled for today.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
