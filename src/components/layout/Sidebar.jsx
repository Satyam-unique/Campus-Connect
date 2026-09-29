import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { 
  Home, 
  Bell, 
  CalendarCheck, 
  Calendar, 
  BookOpen, 
  PackageSearch, 
  Ticket, 
  MessageSquare,
  LogOut,
  Moon,
  Sun,
  User
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { theme, toggleTheme, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Notices', path: '/notices', icon: <Bell size={20} /> },
    { name: 'Attendance', path: '/attendance', icon: <CalendarCheck size={20} /> },
    { name: 'Timetable', path: '/timetable', icon: <Calendar size={20} /> },
    { name: 'Assignments', path: '/assignments', icon: <BookOpen size={20} /> },
    { name: 'Lost & Found', path: '/lost-found', icon: <PackageSearch size={20} /> },
    { name: 'Events', path: '/events', icon: <Ticket size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar glass-panel ${isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">C</div>
          <h2>Campus Connect</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
