import React from 'react';
import useResume from '../../hooks/useResume';
import Section from '../UI/Section';
import Input from '../UI/Input';
import Button from '../UI/Button';

function Languages() {
  const { resume, actions } = useResume();

  const handleAddLanguage = () => {
    const newLanguage = {
      id: Date.now(),
      language: '',
      proficiency: ''
    };
    const updatedLanguages = [...resume.languages, newLanguage];
    actions.updateLanguages(updatedLanguages);
  };

  const handleUpdateLanguage = (id, field, value) => {
    const updatedLanguages = resume.languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    actions.updateLanguages(updatedLanguages);
  };

  const handleRemoveLanguage = (id) => {
    if (resume.languages.length > 1) {
      const updatedLanguages = resume.languages.filter(lang => lang.id !== id);
      actions.updateLanguages(updatedLanguages);
    }
  };

  return (
    <Section title="Languages" onAdd={handleAddLanguage}>
      {resume.languages.map((language, index) => (
        <div key={language.id} className="form-section">
          <div className="section-header">
            <h4>Language {index + 1}</h4>
            {resume.languages.length > 1 && (
              <Button
                onClick={() => handleRemoveLanguage(language.id)}
                className="remove-btn"
                variant="danger"
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="form-row">
            <Input
              label="Language"
              value={language.language}
              onChange={(e) => handleUpdateLanguage(language.id, 'language', e.target.value)}
              placeholder="e.g., English, Spanish, French"
            />
            <Input
              label="Proficiency Level"
              value={language.proficiency}
              onChange={(e) => handleUpdateLanguage(language.id, 'proficiency', e.target.value)}
              placeholder="e.g., Native, Fluent, Intermediate, Basic"
            />
          </div>
        </div>
      ))}
    </Section>
  );
}

export default Languages;
