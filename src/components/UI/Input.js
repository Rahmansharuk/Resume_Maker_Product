// src/components/UI/Input.js
import React from 'react';

function Input({ label, type = 'text', className = '', ...props }) {
  return (
    <div className={`input-group ${className}`.trim()}>
      {label && <label>{label}</label>}
      <input type={type} {...props} />
    </div>
  );
}

export default Input;