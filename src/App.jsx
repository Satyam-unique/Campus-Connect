import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Notices from './pages/Notices';
import Attendance from './pages/Attendance';
import Timetable from './pages/Timetable';
import Assignments from './pages/Assignments';
import LostFound from './pages/LostFound';
import Events from './pages/Events';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

import MobileHeader from './components/layout/MobileHeader';

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <MobileHeader toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};


function App() {
  const { isAuthenticated } = useContext(AppContext);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
          <Route path="/notices" element={isAuthenticated ? <Layout><Notices /></Layout> : <Navigate to="/login" />} />
          <Route path="/attendance" element={isAuthenticated ? <Layout><Attendance /></Layout> : <Navigate to="/login" />} />
          <Route path="/timetable" element={isAuthenticated ? <Layout><Timetable /></Layout> : <Navigate to="/login" />} />
          <Route path="/assignments" element={isAuthenticated ? <Layout><Assignments /></Layout> : <Navigate to="/login" />} />
          <Route path="/lost-found" element={isAuthenticated ? <Layout><LostFound /></Layout> : <Navigate to="/login" />} />
          <Route path="/events" element={isAuthenticated ? <Layout><Events /></Layout> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Layout><Profile /></Layout> : <Navigate to="/login" />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;