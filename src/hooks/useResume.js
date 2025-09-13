import { useEffect, useCallback, useRef } from 'react';
import { useResume as useResumeContext } from '../contexts/ResumeContext';
import useLocalStorage from './useLocalStorage';

// Initial state for the resume
const initialResumeState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    summary: ''
  },
  education: [
    {
      id: 1,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  experience: [
    {
      id: 1,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  internships: [
    {
      id: 1,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  projects: [
    {
      id: 1,
      title: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: ''
    }
  ],
  languages: [
    {
      id: 1,
      language: '',
      proficiency: ''
    }
  ],
  certificates: [
    {
      id: 1,
      name: '',
      issuer: '',
      date: '',
      link: ''
    }
  ],
  achievements: [
    {
      id: 1,
      title: '',
      description: '',
      date: ''
    }
  ],
  skills: []
};

function useResume() {
  const { state, dispatch } = useResumeContext();
  const [storedResume, setStoredResume] = useLocalStorage('resumeData', initialResumeState);
  const isInitialized = useRef(false);

  // Load resume from localStorage only once when component mounts
  useEffect(() => {
    if (!isInitialized.current) {
      dispatch({
        type: 'LOAD_RESUME',
        payload: storedResume
      });
      isInitialized.current = true;
    }
  }, []); // Empty dependency array to run only once

  // Save resume to localStorage whenever it changes, but avoid the initial load
  useEffect(() => {
    if (isInitialized.current && state !== storedResume) {
      setStoredResume(state);
    }
  }, [state, setStoredResume, storedResume]);

  // Action creators with useCallback to prevent unnecessary re-renders
  const updatePersonalInfo = useCallback((info) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: info
    });
  }, [dispatch]);

  const addEducation = useCallback((education) => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: education
    });
  }, [dispatch]);

  const updateEducation = useCallback((id, updates) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, ...updates }
    });
  }, [dispatch]);

  const removeEducation = useCallback((id) => {
    dispatch({
      type: 'REMOVE_EDUCATION',
      payload: id
    });
  }, [dispatch]);

  const addExperience = useCallback((experience) => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: experience
    });
  }, [dispatch]);

  const updateExperience = useCallback((id, updates) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { id, ...updates }
    });
  }, [dispatch]);

  const removeExperience = useCallback((id) => {
    dispatch({
      type: 'REMOVE_EXPERIENCE',
      payload: id
    });
  }, [dispatch]);

  const updateSkills = useCallback((skills) => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: skills
    });
  }, [dispatch]);

  const addInternship = useCallback((internship) => {
    dispatch({
      type: 'ADD_INTERNSHIP',
      payload: internship
    });
  }, [dispatch]);

  const updateInternship = useCallback((id, updates) => {
    dispatch({
      type: 'UPDATE_INTERNSHIP',
      payload: { id, ...updates }
    });
  }, [dispatch]);

  const removeInternship = useCallback((id) => {
    dispatch({
      type: 'REMOVE_INTERNSHIP',
      payload: id
    });
  }, [dispatch]);

  const addProject = useCallback((project) => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: project
    });
  }, [dispatch]);

  const updateProject = useCallback((id, updates) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, ...updates }
    });
  }, [dispatch]);

  const removeProject = useCallback((id) => {
    dispatch({
      type: 'REMOVE_PROJECT',
      payload: id
    });
  }, [dispatch]);

  const updateLanguages = useCallback((languages) => {
    dispatch({
      type: 'UPDATE_LANGUAGES',
      payload: languages
    });
  }, [dispatch]);

  const addCertificate = useCallback((certificate) => {
    dispatch({
      type: 'ADD_CERTIFICATE',
      payload: certificate
    });
  }, [dispatch]);

  const updateCertificate = useCallback((id, updates) => {
    dispatch({
      type: 'UPDATE_CERTIFICATE',
      payload: { id, ...updates }
    });
  }, [dispatch]);

  const removeCertificate = useCallback((id) => {
    dispatch({
      type: 'REMOVE_CERTIFICATE',
      payload: id
    });
  }, [dispatch]);

  const addAchievement = useCallback((achievement) => {
    dispatch({
      type: 'ADD_ACHIEVEMENT',
      payload: achievement
    });
  }, [dispatch]);

  const updateAchievement = useCallback((id, updates) => {
    dispatch({
      type: 'UPDATE_ACHIEVEMENT',
      payload: { id, ...updates }
    });
  }, [dispatch]);

  const removeAchievement = useCallback((id) => {
    dispatch({
      type: 'REMOVE_ACHIEVEMENT',
      payload: id
    });
  }, [dispatch]);

  const resetResume = useCallback(() => {
    dispatch({
      type: 'LOAD_RESUME',
      payload: initialResumeState
    });
    setStoredResume(initialResumeState);
  }, [dispatch, setStoredResume]);

  const exportResume = useCallback(() => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'resume.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [state]);

  const importResume = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const resumeData = JSON.parse(event.target.result);
          dispatch({
            type: 'LOAD_RESUME',
            payload: resumeData
          });
          setStoredResume(resumeData);
          resolve();
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  }, [dispatch, setStoredResume]);

  const printResume = useCallback(() => {
    window.print();
  }, []);

  const downloadResume = useCallback(async () => {
    try {
      // Show loading indicator
      const loadingElement = document.createElement('div');
      loadingElement.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          color: white;
          font-family: Arial, sans-serif;
        ">
          <div style="
            background: white;
            color: #333;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          ">
            <div style="
              width: 40px;
              height: 40px;
              border: 4px solid #f3f3f3;
              border-top: 4px solid #667eea;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 15px;
            "></div>
            <div>Generating PDF...</div>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      document.body.appendChild(loadingElement);

      // Dynamically import the libraries
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      // Get the resume template element
      const resumeElement = document.querySelector('.resume-template');
      if (!resumeElement) {
        throw new Error('Resume template not found');
      }

      // Add PDF-specific class for styling
      resumeElement.classList.add('pdf-mode');

      // Generate canvas from the resume element with optimized settings
      const canvas = await html2canvas(resumeElement, {
        scale: 3, // Higher quality for crisp text
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: resumeElement.scrollWidth,
        height: resumeElement.scrollHeight,
        logging: false,
        removeContainer: true,
        imageTimeout: 15000,
        foreignObjectRendering: true,
        onclone: (clonedDoc) => {
          // Ensure proper styling in the cloned document
          const clonedElement = clonedDoc.querySelector('.resume-template');
          if (clonedElement) {
            // Set A4 dimensions and styling
            clonedElement.style.width = '210mm';
            clonedElement.style.maxWidth = '210mm';
            clonedElement.style.margin = '0 auto';
            clonedElement.style.padding = '20mm';
            clonedElement.style.fontFamily = 'Arial, Helvetica, sans-serif';
            clonedElement.style.fontSize = '12px';
            clonedElement.style.lineHeight = '1.4';
            clonedElement.style.color = '#000000';
            clonedElement.style.backgroundColor = '#ffffff';
            clonedElement.style.boxSizing = 'border-box';
            
            // Ensure all text is black and readable
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach(el => {
              if (el.style) {
                el.style.color = el.style.color || '#000000';
                el.style.fontFamily = el.style.fontFamily || 'Arial, Helvetica, sans-serif';
              }
            });
          }
        }
      });

      // Remove PDF-specific class
      resumeElement.classList.remove('pdf-mode');

      // Create PDF with proper margins
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 15; // 15mm margins on all sides
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);

      // Calculate dimensions to fit the content area
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = margin;

      // Add first page
      pdf.addImage(canvas, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= contentHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = margin - (heightLeft - imgHeight);
        pdf.addPage();
        pdf.addImage(canvas, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= contentHeight;
      }

      // Generate filename with user's name if available
      const firstName = state.personalInfo.firstName || 'Resume';
      const lastName = state.personalInfo.lastName || '';
      const timestamp = new Date().toISOString().split('T')[0]; // Add date for uniqueness
      const filename = `${firstName}${lastName ? '_' + lastName : ''}_Resume_${timestamp}.pdf`;

      // Remove loading indicator
      document.body.removeChild(loadingElement);

      // Enhanced download functionality for different platforms
      const pdfBlob = pdf.output('blob');
      
      // Check if we're on a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      if (isMobile) {
        // Mobile-specific download handling
        if (isIOS) {
          // iOS Safari handling
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = filename;
          link.style.display = 'none';
          document.body.appendChild(link);
          
          // Trigger download
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          link.dispatchEvent(clickEvent);
          
          // Clean up
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
          }, 100);
        } else if (isAndroid) {
          // Android Chrome handling
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = filename;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
          }, 100);
        } else {
          // Fallback for other mobile browsers
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = filename;
          link.target = '_blank';
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
          }, 100);
        }
      } else {
        // Desktop handling with enhanced Chrome support
        try {
          // Try the standard jsPDF save method first
          pdf.save(filename);
        } catch (saveError) {
          console.warn('Standard save failed, trying alternative method:', saveError);
          
          // Fallback method for Chrome and other browsers
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = filename;
          link.style.display = 'none';
          document.body.appendChild(link);
          
          // Use a more reliable click method
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          link.dispatchEvent(clickEvent);
          
          // Clean up
          setTimeout(() => {
            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
            URL.revokeObjectURL(link.href);
          }, 100);
        }
      }

      // Show success message
      const successElement = document.createElement('div');
      successElement.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4CAF50;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          font-family: Arial, sans-serif;
          animation: slideIn 0.3s ease-out;
        ">
          ✅ Resume downloaded successfully!
        </div>
        <style>
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
      `;
      document.body.appendChild(successElement);
      
      // Remove success message after 3 seconds
      setTimeout(() => {
        if (document.body.contains(successElement)) {
          document.body.removeChild(successElement);
        }
      }, 3000);

    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Remove loading indicator if it exists
      const loadingElement = document.querySelector('[style*="position: fixed"]');
      if (loadingElement) {
        document.body.removeChild(loadingElement);
      }
      
      // Show error message
      const errorElement = document.createElement('div');
      errorElement.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #f44336;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          font-family: Arial, sans-serif;
          animation: slideIn 0.3s ease-out;
        ">
          ❌ Error downloading resume: ${error.message}
        </div>
        <style>
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
      `;
      document.body.appendChild(errorElement);
      
      // Remove error message after 5 seconds
      setTimeout(() => {
        if (document.body.contains(errorElement)) {
          document.body.removeChild(errorElement);
        }
      }, 5000);
    }
  }, [state]);

  return {
    resume: state,
    actions: {
      updatePersonalInfo,
      addEducation,
      updateEducation,
      removeEducation,
      addExperience,
      updateExperience,
      removeExperience,
      addInternship,
      updateInternship,
      removeInternship,
      addProject,
      updateProject,
      removeProject,
      updateLanguages,
      addCertificate,
      updateCertificate,
      removeCertificate,
      addAchievement,
      updateAchievement,
      removeAchievement,
      updateSkills,
      resetResume,
      exportResume,
      importResume,
      printResume,
      downloadResume
    }
  };
}

export default useResume;