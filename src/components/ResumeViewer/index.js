import React from 'react';
import ResumeTemplate from '../ResumePreview/ResumeTemplate';
import useResume from '../../hooks/useResume';
import '../../styles/ResumeViewer.css';

function ResumeViewer() {
  const { actions } = useResume();

  return (
    <div className="resume-viewer">
      <div className="resume-viewer-header">
        <h2>Resume Preview</h2>
        <div className="resume-viewer-actions">
          <button onClick={actions.downloadResume} className="viewer-btn download-btn">
            <span className="btn-icon">💾</span>
            <span className="btn-text">Download PDF</span>
          </button>
          <button onClick={actions.printResume} className="viewer-btn print-btn">
            <span className="btn-icon">🖨️</span>
            <span className="btn-text">Print</span>
          </button>
        </div>
      </div>
      
      <div className="resume-viewer-content">
        <div className="resume-container">
          <ResumeTemplate />
        </div>
      </div>
    </div>
  );
}

export default ResumeViewer;
