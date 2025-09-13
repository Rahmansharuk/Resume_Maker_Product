// src/components/ResumeForm/PersonalInfo.js (updated)
import React, { useCallback, memo } from 'react';
import useResume from '../../hooks/useResume';

const PersonalInfo = memo(function PersonalInfo() {
  const { resume, actions } = useResume();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    actions.updatePersonalInfo({ [name]: value });
  }, [actions]);

  return (
    <div className="form-section">
      <h2>Personal Information</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={resume.personalInfo.firstName || ''}
            onChange={handleChange}
            placeholder="John"
            required
            autoComplete="given-name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={resume.personalInfo.lastName || ''}
            onChange={handleChange}
            placeholder="Doe"
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={resume.personalInfo.email || ''}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={resume.personalInfo.phone || ''}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={resume.personalInfo.address || ''}
            onChange={handleChange}
            placeholder="City, Country"
            autoComplete="address-level1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            id="linkedin"
            type="url"
            name="linkedin"
            value={resume.personalInfo.linkedin || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            autoComplete="url"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="summary">Professional Summary</label>
        <textarea
          id="summary"
          name="summary"
          rows="4"
          value={resume.personalInfo.summary || ''}
          onChange={handleChange}
          placeholder="A concise summary highlighting your experience and key skills."
        />
      </div>
    </div>
  );
});

export default PersonalInfo;