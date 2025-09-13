// src/App.js
import React, { memo, useState } from 'react';
import { ResumeProvider } from './contexts/ResumeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import ResumeViewer from './components/ResumeViewer';
import Navbar from './components/Layout/Navbar';
import './App.css';

const App = memo(function App() {
  const [currentView, setCurrentView] = useState('builder'); // 'builder' or 'viewer'

  const renderMainContent = () => {
    if (currentView === 'viewer') {
      return <ResumeViewer />;
    }
    
    return (
      <main className="container flex flex-col flex-md-row gap-2" style={{ flex: 1 }}>
        <div className="flex flex-col flex-md-row gap-2" style={{ width: '100%' }}>
          <div className="flex-1">
            <ResumeForm />
          </div>
          <div className="flex-1">
            <ResumePreview />
          </div>
        </div>
      </main>
    );
  };

  return (
    <ResumeProvider>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        {renderMainContent()}
        <Footer />
      </div>
    </ResumeProvider>
  );
});

export default App;