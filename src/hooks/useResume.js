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

  // Alternative PDF generation method using direct data rendering
  const generatePDFFromData = useCallback(async () => {
    try {
      const jsPDF = (await import('jspdf')).default;
      
      // Create PDF with proper margins
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 20; // 20mm margins on all sides
      const contentWidth = pageWidth - (margin * 2);
      let currentY = margin;
      
      // Helper function to add text with word wrapping
      const addText = (text, x, y, maxWidth, fontSize = 12, fontStyle = 'normal') => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', fontStyle);
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + (lines.length * fontSize * 0.4);
      };
      
      // Helper function to add a line
      const addLine = (x1, y1, x2, y2) => {
        pdf.line(x1, y1, x2, y2);
      };
      
      // Helper function to check if we need a new page
      const checkNewPage = (requiredHeight) => {
        if (currentY + requiredHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
          return true;
        }
        return false;
      };
      
      // Header Section
      const fullName = `${state.personalInfo.firstName || ''} ${state.personalInfo.lastName || ''}`.trim();
      if (fullName) {
        currentY = addText(fullName, margin, currentY, contentWidth, 20, 'bold');
        currentY += 5;
      }
      
      // Contact Information
      const contactInfo = [];
      if (state.personalInfo.email) contactInfo.push(`Email: ${state.personalInfo.email}`);
      if (state.personalInfo.phone) contactInfo.push(`Phone: ${state.personalInfo.phone}`);
      if (state.personalInfo.address) contactInfo.push(`Address: ${state.personalInfo.address}`);
      if (state.personalInfo.linkedin) contactInfo.push(`LinkedIn: ${state.personalInfo.linkedin}`);
      
      if (contactInfo.length > 0) {
        const contactText = contactInfo.join(' | ');
        currentY = addText(contactText, margin, currentY, contentWidth, 10);
        currentY += 10;
        
        // Add a line under contact info
        addLine(margin, currentY, pageWidth - margin, currentY);
        currentY += 10;
      }
      
      // Professional Summary
      if (state.personalInfo.summary) {
        checkNewPage(20);
        currentY = addText('PROFESSIONAL SUMMARY', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        currentY = addText(state.personalInfo.summary, margin, currentY, contentWidth, 11);
        currentY += 10;
      }
      
      // Education Section
      const validEducation = state.education.filter(edu => edu.institution && edu.institution.trim());
      if (validEducation.length > 0) {
        checkNewPage(20);
        currentY = addText('EDUCATION', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        
        validEducation.forEach(edu => {
          checkNewPage(15);
          const degreeText = `${edu.degree || ''} ${edu.field ? `in ${edu.field}` : ''}`.trim();
          const institutionText = edu.institution;
          const dateText = `${edu.startDate || ''} - ${edu.endDate || 'Present'}`.replace(/^ - | - $/, '');
          
          currentY = addText(institutionText, margin, currentY, contentWidth, 12, 'bold');
          if (degreeText) {
            currentY = addText(degreeText, margin, currentY, contentWidth, 11, 'italic');
          }
          if (dateText) {
            currentY = addText(dateText, margin, currentY, contentWidth, 10);
          }
          if (edu.description) {
            currentY = addText(edu.description, margin, currentY, contentWidth, 10);
          }
          currentY += 5;
        });
        currentY += 5;
      }
      
      // Work Experience Section
      const validExperience = state.experience.filter(exp => exp.company && exp.company.trim());
      if (validExperience.length > 0) {
        checkNewPage(20);
        currentY = addText('WORK EXPERIENCE', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        
        validExperience.forEach(exp => {
          checkNewPage(15);
          const positionText = exp.position || '';
          const companyText = exp.company;
          const dateText = `${exp.startDate || ''} - ${exp.endDate || 'Present'}`.replace(/^ - | - $/, '');
          
          currentY = addText(companyText, margin, currentY, contentWidth, 12, 'bold');
          if (positionText) {
            currentY = addText(positionText, margin, currentY, contentWidth, 11, 'italic');
          }
          if (dateText) {
            currentY = addText(dateText, margin, currentY, contentWidth, 10);
          }
          if (exp.description) {
            currentY = addText(exp.description, margin, currentY, contentWidth, 10);
          }
          currentY += 5;
        });
        currentY += 5;
      }
      
      // Internships Section
      const validInternships = state.internships.filter(intern => intern.company && intern.company.trim());
      if (validInternships.length > 0) {
        checkNewPage(20);
        currentY = addText('INTERNSHIPS', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        
        validInternships.forEach(intern => {
          checkNewPage(15);
          const positionText = intern.position || '';
          const companyText = intern.company;
          const dateText = `${intern.startDate || ''} - ${intern.endDate || 'Present'}`.replace(/^ - | - $/, '');
          
          currentY = addText(companyText, margin, currentY, contentWidth, 12, 'bold');
          if (positionText) {
            currentY = addText(positionText, margin, currentY, contentWidth, 11, 'italic');
          }
          if (dateText) {
            currentY = addText(dateText, margin, currentY, contentWidth, 10);
          }
          if (intern.description) {
            currentY = addText(intern.description, margin, currentY, contentWidth, 10);
          }
          currentY += 5;
        });
        currentY += 5;
      }
      
      // Projects Section
      const validProjects = state.projects.filter(project => project.title && project.title.trim());
      if (validProjects.length > 0) {
        checkNewPage(20);
        currentY = addText('PROJECTS', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        
        validProjects.forEach(project => {
          checkNewPage(15);
          const titleText = project.title;
          const techText = project.technologies ? `Technologies: ${project.technologies}` : '';
          const dateText = `${project.startDate || ''} - ${project.endDate || 'Present'}`.replace(/^ - | - $/, '');
          
          currentY = addText(titleText, margin, currentY, contentWidth, 12, 'bold');
          if (techText) {
            currentY = addText(techText, margin, currentY, contentWidth, 11, 'italic');
          }
          if (dateText) {
            currentY = addText(dateText, margin, currentY, contentWidth, 10);
          }
          if (project.description) {
            currentY = addText(project.description, margin, currentY, contentWidth, 10);
          }
          currentY += 5;
        });
        currentY += 5;
      }
      
      // Skills Section
      if (state.skills && state.skills.length > 0) {
        checkNewPage(15);
        currentY = addText('SKILLS', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        const skillsText = state.skills.join(', ');
        currentY = addText(skillsText, margin, currentY, contentWidth, 11);
        currentY += 10;
      }
      
      // Languages Section
      const validLanguages = state.languages.filter(lang => lang.language && lang.language.trim());
      if (validLanguages.length > 0) {
        checkNewPage(15);
        currentY = addText('LANGUAGES', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        
        validLanguages.forEach(lang => {
          checkNewPage(10);
          const langText = `${lang.language}${lang.proficiency ? ` - ${lang.proficiency}` : ''}`;
          currentY = addText(langText, margin, currentY, contentWidth, 11);
          currentY += 3;
        });
        currentY += 5;
      }
      
      // Certificates Section
      const validCertificates = state.certificates.filter(cert => cert.name && cert.name.trim());
      if (validCertificates.length > 0) {
        checkNewPage(20);
        currentY = addText('CERTIFICATES', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        
        validCertificates.forEach(cert => {
          checkNewPage(15);
          const nameText = cert.name;
          const issuerText = cert.issuer ? `Issued by: ${cert.issuer}` : '';
          const dateText = cert.date || '';
          
          currentY = addText(nameText, margin, currentY, contentWidth, 12, 'bold');
          if (issuerText) {
            currentY = addText(issuerText, margin, currentY, contentWidth, 11, 'italic');
          }
          if (dateText) {
            currentY = addText(dateText, margin, currentY, contentWidth, 10);
          }
          currentY += 5;
        });
        currentY += 5;
      }
      
      // Achievements Section
      const validAchievements = state.achievements.filter(achievement => achievement.title && achievement.title.trim());
      if (validAchievements.length > 0) {
        checkNewPage(20);
        currentY = addText('ACHIEVEMENTS & AWARDS', margin, currentY, contentWidth, 14, 'bold');
        currentY += 5;
        
        validAchievements.forEach(achievement => {
          checkNewPage(15);
          const titleText = achievement.title;
          const dateText = achievement.date || '';
          
          currentY = addText(titleText, margin, currentY, contentWidth, 12, 'bold');
          if (dateText) {
            currentY = addText(dateText, margin, currentY, contentWidth, 10);
          }
          if (achievement.description) {
            currentY = addText(achievement.description, margin, currentY, contentWidth, 10);
          }
          currentY += 5;
        });
        currentY += 5;
      }
      
      return pdf;
    } catch (error) {
      console.error('Error generating PDF from data:', error);
      throw error;
    }
  }, [state]);

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

      let pdf;
      
      try {
        // Try the data-based PDF generation first (more reliable)
        console.log('Attempting data-based PDF generation...');
        pdf = await generatePDFFromData();
        console.log('Data-based PDF generation successful');
      } catch (dataError) {
        console.warn('Data-based PDF generation failed, trying DOM-based method:', dataError);
        
        // Fallback to DOM-based method
        const html2canvas = (await import('html2canvas')).default;
        
        // Try multiple selectors to find the resume element
        let resumeElement = document.querySelector('.resume-template');
        if (!resumeElement) {
          resumeElement = document.querySelector('.resume-container .resume-template');
        }
        if (!resumeElement) {
          resumeElement = document.querySelector('.resume-viewer-content .resume-template');
        }
        if (!resumeElement) {
          resumeElement = document.querySelector('[class*="resume-template"]');
        }
        
        if (!resumeElement) {
          throw new Error('Resume template not found. Please make sure you are on the Resume Viewer page and the resume preview is visible.');
        }

        console.log('Found resume element:', resumeElement);
        console.log('Resume element content:', resumeElement.textContent);

        // Debug: Check if resume has content
        const hasContent = resumeElement.textContent.trim().length > 0;
        console.log('Has content:', hasContent, 'Content length:', resumeElement.textContent.trim().length);
        
        if (!hasContent) {
          throw new Error('Resume appears to be empty. Please add some content to your resume before downloading.');
        }

        // Create a temporary container for PDF generation
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '210mm';
        tempContainer.style.height = 'auto';
        tempContainer.style.backgroundColor = '#ffffff';
        tempContainer.style.fontFamily = 'Arial, Helvetica, sans-serif';
        tempContainer.style.fontSize = '12px';
        tempContainer.style.lineHeight = '1.4';
        tempContainer.style.color = '#000000';
        tempContainer.style.padding = '20mm';
        tempContainer.style.boxSizing = 'border-box';
        
        // Clone the resume element
        const clonedElement = resumeElement.cloneNode(true);
        
        // Apply PDF-specific styles to the cloned element
        clonedElement.style.width = '100%';
        clonedElement.style.maxWidth = '100%';
        clonedElement.style.margin = '0';
        clonedElement.style.padding = '0';
        clonedElement.style.backgroundColor = '#ffffff';
        clonedElement.style.color = '#000000';
        clonedElement.style.fontFamily = 'Arial, Helvetica, sans-serif';
        clonedElement.style.fontSize = '12px';
        clonedElement.style.lineHeight = '1.4';
        clonedElement.style.position = 'static';
        clonedElement.style.transform = 'none';
        clonedElement.style.display = 'block';
        clonedElement.style.visibility = 'visible';
        clonedElement.style.opacity = '1';
        
        // Apply styles to all child elements
        const allElements = clonedElement.querySelectorAll('*');
        allElements.forEach(el => {
          el.style.color = '#000000';
          el.style.backgroundColor = 'transparent';
          el.style.position = 'static';
          el.style.transform = 'none';
          el.style.display = el.style.display || 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        });
        
        // Ensure specific elements have correct display properties
        const flexElements = clonedElement.querySelectorAll('.contact-info, .skills-list, .languages-list, .item-header');
        flexElements.forEach(el => {
          el.style.display = 'flex';
        });
        
        const inlineElements = clonedElement.querySelectorAll('span, .item-date, .item-subtitle, .language-proficiency');
        inlineElements.forEach(el => {
          el.style.display = 'inline';
        });
        
        // Append to temporary container
        tempContainer.appendChild(clonedElement);
        document.body.appendChild(tempContainer);
        
        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 200));

        console.log('Temporary container content:', tempContainer.textContent);
        console.log('Temporary container dimensions:', tempContainer.offsetWidth, tempContainer.offsetHeight);

        // Generate canvas from the temporary container
        const canvas = await html2canvas(tempContainer, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: tempContainer.offsetWidth,
          height: tempContainer.offsetHeight,
          logging: true, // Enable logging for debugging
          removeContainer: false,
          imageTimeout: 15000,
          foreignObjectRendering: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: tempContainer.offsetWidth,
          windowHeight: tempContainer.offsetHeight
        });

        // Remove temporary container
        document.body.removeChild(tempContainer);

        console.log('Canvas dimensions:', canvas.width, canvas.height);

        // Debug: Check canvas dimensions
        if (canvas.width === 0 || canvas.height === 0) {
          throw new Error('Failed to capture resume content. The canvas is empty.');
        }

        // Create PDF with proper margins
        const jsPDF = (await import('jspdf')).default;
        pdf = new jsPDF('p', 'mm', 'a4');
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
        pdf.addImage(canvas, 'JPEG', margin, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= contentHeight;

        // Add additional pages if needed
        while (heightLeft >= 0) {
          position = margin - (heightLeft - imgHeight);
          pdf.addPage();
          pdf.addImage(canvas, 'JPEG', margin, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= contentHeight;
        }
      }

      // Generate filename with user's name if available
      const firstName = state.personalInfo.firstName || 'Resume';
      const lastName = state.personalInfo.lastName || '';
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${firstName}${lastName ? '_' + lastName : ''}_Resume_${timestamp}.pdf`;

      // Remove loading indicator
      document.body.removeChild(loadingElement);

      // Enhanced download functionality for different platforms
      const pdfBlob = pdf.output('blob');
      
      // Check file size and warn if too large
      const fileSizeMB = pdfBlob.size / (1024 * 1024);
      console.log('PDF file size:', fileSizeMB.toFixed(2), 'MB');
      
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
  }, [state, generatePDFFromData]);

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