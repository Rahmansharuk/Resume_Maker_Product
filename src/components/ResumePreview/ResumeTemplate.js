// src/components/ResumePreview/ResumeTemplate.js
import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function ResumeTemplate() {
  const { state } = useResume();
  const { personalInfo, education, experience, internships, projects, skills, languages, certificates, achievements } = state;

  return (
    <div className="resume-template">
      <header className="resume-header">
        <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
        <div className="contact-info">
          {personalInfo.email && (
            <div className="contact-item">
              <span>📧</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="contact-item">
              <span>📞</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="contact-item">
              <span>📍</span>
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="contact-item">
              <span>🔗</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="section">
          <h2 className="section-title">Professional Summary</h2>
          <p className="summary">{personalInfo.summary}</p>
        </section>
      )}

      {education.length > 0 && education[0].institution && (
        <section className="section">
          <h2 className="section-title">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="education-item">
              <div className="item-header">
                <div className="item-title">{edu.institution}</div>
                <div className="item-date">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
              <div className="item-subtitle">
                {edu.degree} {edu.field && `in ${edu.field}`}
              </div>
              {edu.description && (
                <p className="item-description">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && experience[0].company && (
        <section className="section">
          <h2 className="section-title">Work Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="experience-item">
              <div className="item-header">
                <div className="item-title">{exp.company}</div>
                <div className="item-date">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
              </div>
              <div className="item-subtitle">{exp.position}</div>
              {exp.description && (
                <p className="item-description">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {internships.length > 0 && internships[0].company && (
        <section className="section">
          <h2 className="section-title">Internships</h2>
          {internships.map(intern => (
            <div key={intern.id} className="experience-item">
              <div className="item-header">
                <div className="item-title">{intern.company}</div>
                <div className="item-date">
                  {intern.startDate} - {intern.endDate || 'Present'}
                </div>
              </div>
              <div className="item-subtitle">{intern.position}</div>
              {intern.description && (
                <p className="item-description">{intern.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && projects[0].title && (
        <section className="section">
          <h2 className="section-title">Projects</h2>
          {projects.map(project => (
            <div key={project.id} className="project-item">
              <div className="item-header">
                <div className="item-title">
                  {project.title}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      🔗
                    </a>
                  )}
                </div>
                <div className="item-date">
                  {project.startDate} - {project.endDate || 'Present'}
                </div>
              </div>
              {project.technologies && (
                <div className="item-subtitle">Technologies: {project.technologies}</div>
              )}
              {project.description && (
                <p className="item-description">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-list">
            {skills.map(skill => (
              <div key={skill} className="skill-pill">{skill}</div>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && languages[0].language && (
        <section className="section">
          <h2 className="section-title">Languages</h2>
          <div className="languages-list">
            {languages.map(lang => (
              <div key={lang.id} className="language-item">
                <span className="language-name">{lang.language}</span>
                {lang.proficiency && (
                  <span className="language-proficiency"> - {lang.proficiency}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {certificates.length > 0 && certificates[0].name && (
        <section className="section">
          <h2 className="section-title">Certificates</h2>
          {certificates.map(cert => (
            <div key={cert.id} className="certificate-item">
              <div className="item-header">
                <div className="item-title">
                  {cert.name}
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="certificate-link">
                      🔗
                    </a>
                  )}
                </div>
                <div className="item-date">{cert.date}</div>
              </div>
              {cert.issuer && (
                <div className="item-subtitle">Issued by: {cert.issuer}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {achievements.length > 0 && achievements[0].title && (
        <section className="section">
          <h2 className="section-title">Achievements & Awards</h2>
          {achievements.map(achievement => (
            <div key={achievement.id} className="achievement-item">
              <div className="item-header">
                <div className="item-title">{achievement.title}</div>
                {achievement.date && (
                  <div className="item-date">{achievement.date}</div>
                )}
              </div>
              {achievement.description && (
                <p className="item-description">{achievement.description}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ResumeTemplate;