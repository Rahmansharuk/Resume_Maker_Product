// src/components/ResumeForm/index.js
import React, { memo } from 'react';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';
import Internships from './Internships';
import Projects from './Projects';
import Skills from './Skills';
import Languages from './Languages';
import Certificates from './Certificates';
import Achievements from './Achievements';
import '../../styles/ResumeForm.css';

const ResumeForm = memo(function ResumeForm() {
  return (
    <div className="resume-form">
      <PersonalInfo />
      <Education />
      <Experience />
      <Internships />
      <Projects />
      <Skills />
      <Languages />
      <Certificates />
      <Achievements />
    </div>
  );
});

export default ResumeForm;