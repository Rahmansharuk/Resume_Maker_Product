import React, { useState } from 'react';
import useResume from '../../hooks/useResume';
import '../../styles/Navbar.css';

function Navbar({ currentView, setCurrentView }) {
  const { actions } = useResume();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false); // Close mobile menu when switching views
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Resume Maker</h1>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <button 
            onClick={() => handleViewChange('builder')} 
            className={`nav-btn view-btn ${currentView === 'builder' ? 'active' : ''}`}
          >
            <span className="btn-icon">✏️</span>
            <span className="btn-text">Builder</span>
          </button>
          
          <button 
            onClick={() => handleViewChange('viewer')} 
            className={`nav-btn view-btn ${currentView === 'viewer' ? 'active' : ''}`}
          >
            <span className="btn-icon">👁️</span>
            <span className="btn-text">Resume Viewer</span>
          </button>
          
          <button onClick={actions.downloadResume} className="nav-btn download-btn">
            <span className="btn-icon">💾</span>
            <span className="btn-text">Download</span>
          </button>
          
          <button onClick={actions.resetResume} className="nav-btn reset-btn">
            <span className="btn-icon">🔄</span>
            <span className="btn-text">Reset</span>
          </button>
          
          <button onClick={actions.printResume} className="nav-btn print-btn">
            <span className="btn-icon">🖨️</span>
            <span className="btn-text">Print PDF</span>
          </button>
        </div>
        
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
