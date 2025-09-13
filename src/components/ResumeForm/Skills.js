// src/components/ResumeForm/Skills.js
import React, { useState, useCallback, memo } from 'react';
import useResume from '../../hooks/useResume';

const Skills = memo(function Skills() {
  const { resume, actions } = useResume();
  const [skillInput, setSkillInput] = useState('');

  const addSkill = useCallback(() => {
    if (skillInput.trim() && !resume.skills.includes(skillInput.trim())) {
      const updatedSkills = [...resume.skills, skillInput.trim()];
      actions.updateSkills(updatedSkills);
      setSkillInput('');
    }
  }, [skillInput, resume.skills, actions]);

  const removeSkill = useCallback((skillToRemove) => {
    const updatedSkills = resume.skills.filter(skill => skill !== skillToRemove);
    actions.updateSkills(updatedSkills);
  }, [resume.skills, actions]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  }, [addSkill]);

  const handleInputChange = useCallback((e) => {
    setSkillInput(e.target.value);
  }, []);

  return (
    <div className="form-section">
      <h2>Skills</h2>
      <div className="skills-input">
        <input
          type="text"
          value={skillInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill and press Enter"
        />
        <button onClick={addSkill} type="button">Add</button>
      </div>
      <div className="skills-list">
        {resume.skills.map(skill => (
          <div key={skill} className="skill-tag">
            {skill}
            <button onClick={() => removeSkill(skill)} type="button">×</button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Skills;