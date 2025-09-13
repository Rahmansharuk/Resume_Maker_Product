// src/components/ResumeForm/Education.js
import React, { useCallback, memo } from 'react';
import useResume from '../../hooks/useResume';

const Education = memo(function Education() {
  const { resume, actions } = useResume();

  const addEducation = useCallback(() => {
    actions.addEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  }, [actions]);

  const updateEducation = useCallback((id, updates) => {
    actions.updateEducation(id, updates);
  }, [actions]);

  const removeEducation = useCallback((id) => {
    actions.removeEducation(id);
  }, [actions]);

  return (
    <div className="form-section">
      <div className="section-title">
        <h2>Education</h2>
        <button onClick={addEducation} className="add-btn">Add Education</button>
      </div>
      {resume.education.map(edu => (
        <div key={edu.id} className="education-item">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`institution-${edu.id}`}>Institution</label>
              <input
                id={`institution-${edu.id}`}
                type="text"
                value={edu.institution || ''}
                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                placeholder="University Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`degree-${edu.id}`}>Degree</label>
              <input
                id={`degree-${edu.id}`}
                type="text"
                value={edu.degree || ''}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                placeholder="Bachelor's"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`field-${edu.id}`}>Field of Study</label>
              <input
                id={`field-${edu.id}`}
                type="text"
                value={edu.field || ''}
                onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                placeholder="Computer Science"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`startDate-${edu.id}`}>Start Date</label>
              <input
                id={`startDate-${edu.id}`}
                type="month"
                value={edu.startDate || ''}
                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`endDate-${edu.id}`}>End Date</label>
              <input
                id={`endDate-${edu.id}`}
                type="month"
                value={edu.endDate || ''}
                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={`description-${edu.id}`}>Description</label>
            <textarea
              id={`description-${edu.id}`}
              rows="3"
              value={edu.description || ''}
              onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
              placeholder="Brief description of your studies and achievements"
            />
          </div>
          {resume.education.length > 1 && (
            <button 
              onClick={() => removeEducation(edu.id)}
              className="remove-btn"
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
});

export default Education;