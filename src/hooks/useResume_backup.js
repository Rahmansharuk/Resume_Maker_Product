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
    // Add CSS for print media
    const printStyle = document.createElement('style');
    printStyle.textContent = `
      @media print {
        .resume-viewer-header,
        .resume-viewer-actions,
        .navbar,
        .toolbar {
          display: none !important;
        }
        
        .resume-viewer {
          background: white !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .resume-container {
          box-shadow: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
          padding: 20mm !important;
        }
        
        .resume-template {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          color: black !important;
          font-family: Arial, sans-serif !important;
        }
        
        body {
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
        }
      }
    `;
    
    // Add style to document
    document.head.appendChild(printStyle);
    
    // Trigger print
    window.print();
    
    // Clean up after printing
    setTimeout(() => {
      if (document.head.contains(printStyle)) {
        document.head.removeChild(printStyle);
      }
    }, 1000);
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
      
      // Get the resume template element - try multiple selectors with more specific targeting
      let resumeElement = null;
      
      // Try to find the resume template in different ways
      const selectors = [
        '.resume-container .resume-template',
        '.resume-template',
        '.resume-container',
        '[class*="resume-template"]',
        '[class*="resume-container"]'
      ];
      
      for (const selector of selectors) {
        resumeElement = document.querySelector(selector);
        if (resumeElement) {
          console.log(`Found resume element with selector: ${selector}`);
          break;
        }
      }
      
      // If still not found, try to find any element that contains resume content
      if (!resumeElement) {
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          if (el.textContent && el.textContent.includes('Resume') && el.children.length > 0) {
            resumeElement = el;
            console.log('Found resume element by content search');
            break;
          }
        }
      }
      
      if (!resumeElement) {
        throw new Error('Resume template not found. Please make sure you are on the Resume Viewer page and have filled in some resume content.');
      }
      
      console.log('Resume element found:', resumeElement);
      console.log('Resume element content:', resumeElement.textContent.substring(0, 100));

      // Add PDF-specific class for styling
      resumeElement.classList.add('pdf-mode');

      // Wait a bit for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate canvas from the resume element with optimized settings
      let canvas;
      try {
        canvas = await html2canvas(resumeElement, {
          scale: 2, // Reduced scale for smaller file size while maintaining quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
          width: resumeElement.scrollWidth || resumeElement.offsetWidth,
          height: resumeElement.scrollHeight || resumeElement.offsetHeight,
          logging: true, // Enable logging to debug
          removeContainer: false,
        imageTimeout: 15000,
        foreignObjectRendering: true,
        onclone: (clonedDoc) => {
            console.log('Cloning document for PDF generation');
            
            // Find the cloned element
            let clonedElement = clonedDoc.querySelector('.resume-template') || 
                               clonedDoc.querySelector('.resume-container') ||
                               clonedDoc.querySelector('[class*="resume"]');
            
            if (!clonedElement) {
              // If we can't find by class, find by content
              const allElements = clonedDoc.querySelectorAll('*');
              for (const el of allElements) {
                if (el.textContent && el.textContent.includes('Resume') && el.children.length > 0) {
                  clonedElement = el;
                  break;
                }
              }
            }
            
          if (clonedElement) {
              console.log('Found cloned element:', clonedElement);
              
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
              clonedElement.style.position = 'relative';
              clonedElement.style.overflow = 'visible';
              clonedElement.style.minHeight = 'auto';
            
            // Ensure all text is black and readable
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach(el => {
              if (el.style) {
                el.style.color = el.style.color || '#000000';
                el.style.fontFamily = el.style.fontFamily || 'Arial, Helvetica, sans-serif';
                  el.style.backgroundColor = 'transparent';
                  el.style.boxShadow = 'none';
                  el.style.borderRadius = '0';
                }
              });

              // Make sure the resume template inside has proper styling
              const resumeTemplate = clonedElement.querySelector('.resume-template');
              if (resumeTemplate) {
                resumeTemplate.style.width = '100%';
                resumeTemplate.style.maxWidth = '100%';
                resumeTemplate.style.margin = '0';
                resumeTemplate.style.padding = '0';
                resumeTemplate.style.backgroundColor = 'transparent';
                resumeTemplate.style.boxShadow = 'none';
                resumeTemplate.style.borderRadius = '0';
              }
              
              console.log('Cloned element content length:', clonedElement.textContent.length);
            } else {
              console.error('Could not find cloned element');
          }
        }
      });
        
        console.log('Canvas generated successfully:', canvas.width, 'x', canvas.height);
      } catch (canvasError) {
        console.error('Canvas generation failed, trying fallback method:', canvasError);
        
        // Fallback: Create a simple text-based PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 15;
        
        // Add current date
        const currentDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(currentDate, pageWidth - margin - 5, margin - 5);
        pdf.text(currentDate, pageWidth - margin - 5, pageHeight - margin + 5);
        
        // Add resume content as text
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        
        const resumeText = resumeElement.textContent || 'No resume content found';
        const lines = pdf.splitTextToSize(resumeText, pageWidth - (margin * 2));
        
        let y = margin + 10;
        for (const line of lines) {
          if (y > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, margin, y);
          y += 6;
        }
        
        // Generate filename
        const firstName = state.personalInfo.firstName || 'Resume';
        const lastName = state.personalInfo.lastName || '';
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `${firstName}${lastName ? '_' + lastName : ''}_Resume_${timestamp}.pdf`;
        
        // Remove loading indicator
        document.body.removeChild(loadingElement);
        
        // Download the fallback PDF
        pdf.save(filename);
        
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
            ✅ Resume downloaded successfully! (Fallback method)
          </div>
          <style>
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          </style>
        `;
        document.body.appendChild(successElement);
        
        setTimeout(() => {
          if (document.body.contains(successElement)) {
            document.body.removeChild(successElement);
          }
        }, 3000);
        
        return; // Exit early for fallback method
      }

      // Remove PDF-specific class
      resumeElement.classList.remove('pdf-mode');

      // Create PDF with proper margins
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 15; // 15mm margins on all sides
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);
      
      // Add current date to PDF
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Set font for date
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      
      // Add date to top right
      pdf.text(currentDate, pageWidth - margin - 5, margin - 5);
      
      // Add date to bottom right
      pdf.text(currentDate, pageWidth - margin - 5, pageHeight - margin + 5);

      // Calculate dimensions to fit the content area
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = margin;

      // Add first page
      pdf.addImage(canvas, 'JPEG', margin, position, imgWidth, imgHeight, '', 'FAST'); // Use JPEG for smaller file size
      heightLeft -= contentHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = margin - (heightLeft - imgHeight);
        pdf.addPage();
        pdf.addImage(canvas, 'JPEG', margin, position, imgWidth, imgHeight, '', 'FAST');
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
      
      // Check file size and warn if too large
      const fileSizeMB = pdfBlob.size / (1024 * 1024);
      if (fileSizeMB > 10) {
        console.warn(`PDF file size is ${fileSizeMB.toFixed(2)}MB, which exceeds the 10MB limit. Consider reducing content.`);
      }
      
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
          ✅ Resume downloaded successfully! (${fileSizeMB.toFixed(2)}MB)
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