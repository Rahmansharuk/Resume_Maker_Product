import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

const ResumeContext = createContext();

// Initial state moved to useResume hook

function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, { id: Date.now(), ...action.payload }]
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu => 
          edu.id === action.payload.id ? { ...edu, ...action.payload } : edu
        )
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload)
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, { id: Date.now(), ...action.payload }]
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(exp => 
          exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
        )
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter(exp => exp.id !== action.payload)
      };
    case 'ADD_INTERNSHIP':
      return {
        ...state,
        internships: [...state.internships, { id: Date.now(), ...action.payload }]
      };
    case 'UPDATE_INTERNSHIP':
      return {
        ...state,
        internships: state.internships.map(intern => 
          intern.id === action.payload.id ? { ...intern, ...action.payload } : intern
        )
      };
    case 'REMOVE_INTERNSHIP':
      return {
        ...state,
        internships: state.internships.filter(intern => intern.id !== action.payload)
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, { id: Date.now(), ...action.payload }]
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project => 
          project.id === action.payload.id ? { ...project, ...action.payload } : project
        )
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload)
      };
    case 'UPDATE_LANGUAGES':
      return {
        ...state,
        languages: action.payload
      };
    case 'ADD_CERTIFICATE':
      return {
        ...state,
        certificates: [...state.certificates, { id: Date.now(), ...action.payload }]
      };
    case 'UPDATE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.map(cert => 
          cert.id === action.payload.id ? { ...cert, ...action.payload } : cert
        )
      };
    case 'REMOVE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.filter(cert => cert.id !== action.payload)
      };
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...state.achievements, { id: Date.now(), ...action.payload }]
      };
    case 'UPDATE_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(achievement => 
          achievement.id === action.payload.id ? { ...achievement, ...action.payload } : achievement
        )
      };
    case 'REMOVE_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.filter(achievement => achievement.id !== action.payload)
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        skills: action.payload
      };
    case 'LOAD_RESUME':
      return action.payload;
    default:
      return state;
  }
}

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, {
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
  });

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}