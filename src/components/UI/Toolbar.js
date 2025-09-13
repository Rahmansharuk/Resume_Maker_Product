// src/components/UI/Toolbar.js
import React, { useRef } from 'react';
import useResume from '../../hooks/useResume';
import '../../styles/Toolbar.css';

function Toolbar() {
  const { actions } = useResume();
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      actions.importResume(file)
        .then(() => {
          alert('Resume imported successfully!');
        })
        .catch((error) => {
          alert('Error importing resume: ' + error.message);
        });
    }
    // Reset the file input
    e.target.value = '';
  };

  return (
    <div className="toolbar">
      <button onClick={actions.exportResume} className="toolbar-btn">
        Export JSON
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: 'none' }}
      />
      <button onClick={handleImportClick} className="toolbar-btn">
        Import JSON
      </button>
      
      <button onClick={actions.resetResume} className="toolbar-btn reset-btn">
        Reset
      </button>
      
      <button onClick={actions.printResume} className="toolbar-btn print-btn">
        Print/PDF
      </button>
    </div>
  );
}

export default Toolbar;