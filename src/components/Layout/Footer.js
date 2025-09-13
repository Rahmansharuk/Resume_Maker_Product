// src/components/Layout/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p tabIndex={0}>© {new Date().getFullYear()} Resume Maker App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;