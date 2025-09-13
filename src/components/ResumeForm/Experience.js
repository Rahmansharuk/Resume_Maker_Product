// src/components/ResumeForm/Experience.js
import React, { useCallback, memo } from 'react';
import useResume from '../../hooks/useResume';

const Experience = memo(function Experience() {
  const { resume, actions } = useResume();

  const addExperience = useCallback(() => {
    actions.addExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  }, [actions]);

  const updateExperience = useCallback((id, updates) => {
    actions.updateExperience(id, updates);
  }, [actions]);

  const removeExperience = useCallback((id) => {
    actions.removeExperience(id);
  }, [actions]);

  return (
    <div className="form-section">
      <div className="section-title">
        <h2>Work Experience</h2>
        <button onClick={addExperience} className="add-btn">Add Experience</button>
      </div>
      {resume.experience.map(exp => (
        <div key={exp.id} className="experience-item">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`company-${exp.id}`}>Company</label>
              <input
                id={`company-${exp.id}`}
                type="text"
                value={exp.company || ''}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                placeholder="Company Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`position-${exp.id}`}>Position</label>
              <input
                id={`position-${exp.id}`}
                type="text"
                value={exp.position || ''}
                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                placeholder="Job Title"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`startDate-${exp.id}`}>Start Date</label>
              <input
                id={`startDate-${exp.id}`}
                type="month"
                value={exp.startDate || ''}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`endDate-${exp.id}`}>End Date</label>
              <input
                id={`endDate-${exp.id}`}
                type="month"
                value={exp.endDate || ''}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={`description-${exp.id}`}>Description</label>
            <textarea
              id={`description-${exp.id}`}
              rows="3"
              value={exp.description || ''}
              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
              placeholder="Describe your responsibilities and achievements"
            />
          </div>
          {resume.experience.length > 1 && (
            <button 
              onClick={() => removeExperience(exp.id)}
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

export default Experience;