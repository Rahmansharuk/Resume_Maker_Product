import React from 'react';
import useResume from '../../hooks/useResume';
import Section from '../UI/Section';
import Input from '../UI/Input';
import Button from '../UI/Button';

function Certificates() {
  const { resume, actions } = useResume();

  const handleAddCertificate = () => {
    actions.addCertificate({
      name: '',
      issuer: '',
      date: '',
      link: ''
    });
  };

  const handleUpdateCertificate = (id, field, value) => {
    actions.updateCertificate(id, { [field]: value });
  };

  const handleRemoveCertificate = (id) => {
    if (resume.certificates.length > 1) {
      actions.removeCertificate(id);
    }
  };

  return (
    <Section title="Certificates" onAdd={handleAddCertificate}>
      {resume.certificates.map((certificate, index) => (
        <div key={certificate.id} className="form-section">
          <div className="section-header">
            <h4>Certificate {index + 1}</h4>
            {resume.certificates.length > 1 && (
              <Button
                onClick={() => handleRemoveCertificate(certificate.id)}
                className="remove-btn"
                variant="danger"
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="form-row">
            <Input
              label="Certificate Name"
              value={certificate.name}
              onChange={(e) => handleUpdateCertificate(certificate.id, 'name', e.target.value)}
              placeholder="e.g., AWS Certified Developer"
            />
            <Input
              label="Issuing Organization"
              value={certificate.issuer}
              onChange={(e) => handleUpdateCertificate(certificate.id, 'issuer', e.target.value)}
              placeholder="e.g., Amazon Web Services"
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Date Earned"
              type="date"
              value={certificate.date}
              onChange={(e) => handleUpdateCertificate(certificate.id, 'date', e.target.value)}
            />
            <Input
              label="Certificate Link"
              value={certificate.link}
              onChange={(e) => handleUpdateCertificate(certificate.id, 'link', e.target.value)}
              placeholder="Verification URL or credential ID"
            />
          </div>
        </div>
      ))}
    </Section>
  );
}

export default Certificates;
