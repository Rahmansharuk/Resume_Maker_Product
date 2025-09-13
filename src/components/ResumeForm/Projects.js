import React from 'react';
import useResume from '../../hooks/useResume';
import Section from '../UI/Section';
import Input from '../UI/Input';
import Button from '../UI/Button';

function Projects() {
  const { resume, actions } = useResume();

  const handleAddProject = () => {
    actions.addProject({
      title: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleUpdateProject = (id, field, value) => {
    actions.updateProject(id, { [field]: value });
  };

  const handleRemoveProject = (id) => {
    if (resume.projects.length > 1) {
      actions.removeProject(id);
    }
  };

  return (
    <Section title="Projects" onAdd={handleAddProject}>
      {resume.projects.map((project, index) => (
        <div key={project.id} className="form-section">
          <div className="section-header">
            <h4>Project {index + 1}</h4>
            {resume.projects.length > 1 && (
              <Button
                onClick={() => handleRemoveProject(project.id)}
                className="remove-btn"
                variant="danger"
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="form-row">
            <Input
              label="Project Title"
              value={project.title}
              onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
              placeholder="Project Name"
            />
            <Input
              label="Project Link"
              value={project.link}
              onChange={(e) => handleUpdateProject(project.id, 'link', e.target.value)}
              placeholder="GitHub, Live Demo, etc."
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Start Date"
              type="date"
              value={project.startDate}
              onChange={(e) => handleUpdateProject(project.id, 'startDate', e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={project.endDate}
              onChange={(e) => handleUpdateProject(project.id, 'endDate', e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Technologies Used"
              value={project.technologies}
              onChange={(e) => handleUpdateProject(project.id, 'technologies', e.target.value)}
              placeholder="React, Node.js, Python, etc."
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Description"
              value={project.description}
              onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
              placeholder="Describe the project, your role, and key features"
              multiline
              rows={4}
            />
          </div>
        </div>
      ))}
    </Section>
  );
}

export default Projects;
