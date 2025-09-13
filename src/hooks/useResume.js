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
      printResume
    }
  };
}

export default useResume;