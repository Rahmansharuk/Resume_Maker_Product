// src/components/UI/Button.js
import React from 'react';

function Button({ children, type = 'button', className = '', variant = '', ...props }) {
  const variantClass = variant ? `btn-${variant}` : '';
  const buttonClass = `btn ${variantClass} ${className}`.trim();
  
  return (
    <button
      type={type}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
