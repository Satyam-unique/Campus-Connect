import { Menu } from 'lucide-react';
import './MobileHeader.css';

const MobileHeader = ({ toggleSidebar }) => {
  return (
    <header className="mobile-header glass-panel">
      <div className="mobile-header-content">
        <div className="logo-container-mobile">
          <div className="logo-icon-mobile">C</div>
          <h2>Campus Connect</h2>
        </div>
        <button className="btn-icon hamburger-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
