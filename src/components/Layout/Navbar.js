import React, { useState } from 'react';
import useResume from '../../hooks/useResume';
import '../../styles/Navbar.css';

function Navbar() {
  const { actions } = useResume();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fileInputRef] = useState(React.createRef());

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      actions.importResume(file)
        .then(() => {
          alert('Resume imported successfully!');
        })
        .catch((error) => {
          alert('Error importing resume: ' + error.message);
        });
    }
    // Reset the file input
    e.target.value = '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Resume Maker</h1>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <button onClick={actions.exportResume} className="nav-btn">
            <span className="btn-icon">📤</span>
            <span className="btn-text">Export</span>
          </button>
          
          <button onClick={handleImportClick} className="nav-btn">
            <span className="btn-icon">📥</span>
            <span className="btn-text">Import</span>
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
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: 'none' }}
      />
    </nav>
  );
}

export default Navbar;
