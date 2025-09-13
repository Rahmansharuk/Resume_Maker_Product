// src/components/UI/Section.js
import React from 'react';

function Section({ title, children, className = '' }) {
  return (
    <section className={`section ${className}`.trim()}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
}

export default Section;
