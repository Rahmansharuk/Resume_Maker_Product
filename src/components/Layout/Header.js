// src/components/Layout/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-content">
        <h1 tabIndex={0}>Professional Resume Maker</h1>
        <p tabIndex={0}>Create a standard resume in minutes</p>
      </div>
    </header>
  );
}

export default Header;