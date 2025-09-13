import React from 'react';
import useResume from '../../hooks/useResume';
import Section from '../UI/Section';
import Input from '../UI/Input';
import Button from '../UI/Button';

function Internships() {
  const { resume, actions } = useResume();

  const handleAddInternship = () => {
    actions.addInternship({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleUpdateInternship = (id, field, value) => {
    actions.updateInternship(id, { [field]: value });
  };

  const handleRemoveInternship = (id) => {
    if (resume.internships.length > 1) {
      actions.removeInternship(id);
    }
  };

  return (
    <Section title="Internships" onAdd={handleAddInternship}>
      {resume.internships.map((internship, index) => (
        <div key={internship.id} className="form-section">
          <div className="section-header">
            <h4>Internship {index + 1}</h4>
            {resume.internships.length > 1 && (
              <Button
                onClick={() => handleRemoveInternship(internship.id)}
                className="remove-btn"
                variant="danger"
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="form-row">
            <Input
              label="Company"
              value={internship.company}
              onChange={(e) => handleUpdateInternship(internship.id, 'company', e.target.value)}
              placeholder="Company Name"
            />
            <Input
              label="Position"
              value={internship.position}
              onChange={(e) => handleUpdateInternship(internship.id, 'position', e.target.value)}
              placeholder="Internship Position"
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Start Date"
              type="date"
              value={internship.startDate}
              onChange={(e) => handleUpdateInternship(internship.id, 'startDate', e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={internship.endDate}
              onChange={(e) => handleUpdateInternship(internship.id, 'endDate', e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Description"
              value={internship.description}
              onChange={(e) => handleUpdateInternship(internship.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements"
              multiline
              rows={3}
            />
          </div>
        </div>
      ))}
    </Section>
  );
}

export default Internships;
