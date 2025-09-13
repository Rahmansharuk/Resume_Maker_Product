import React from 'react';
import useResume from '../../hooks/useResume';
import Section from '../UI/Section';
import Input from '../UI/Input';
import Button from '../UI/Button';

function Achievements() {
  const { resume, actions } = useResume();

  const handleAddAchievement = () => {
    actions.addAchievement({
      title: '',
      description: '',
      date: ''
    });
  };

  const handleUpdateAchievement = (id, field, value) => {
    actions.updateAchievement(id, { [field]: value });
  };

  const handleRemoveAchievement = (id) => {
    if (resume.achievements.length > 1) {
      actions.removeAchievement(id);
    }
  };

  return (
    <Section title="Achievements & Awards" onAdd={handleAddAchievement}>
      {resume.achievements.map((achievement, index) => (
        <div key={achievement.id} className="form-section">
          <div className="section-header">
            <h4>Achievement {index + 1}</h4>
            {resume.achievements.length > 1 && (
              <Button
                onClick={() => handleRemoveAchievement(achievement.id)}
                className="remove-btn"
                variant="danger"
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="form-row">
            <Input
              label="Achievement Title"
              value={achievement.title}
              onChange={(e) => handleUpdateAchievement(achievement.id, 'title', e.target.value)}
              placeholder="e.g., Dean's List, Best Project Award"
            />
            <Input
              label="Date"
              type="date"
              value={achievement.date}
              onChange={(e) => handleUpdateAchievement(achievement.id, 'date', e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Description"
              value={achievement.description}
              onChange={(e) => handleUpdateAchievement(achievement.id, 'description', e.target.value)}
              placeholder="Describe the achievement and its significance"
              multiline
              rows={3}
            />
          </div>
        </div>
      ))}
    </Section>
  );
}

export default Achievements;
