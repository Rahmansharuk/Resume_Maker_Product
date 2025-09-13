// src/App.js
import React, { memo } from 'react';
import { ResumeProvider } from './contexts/ResumeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Navbar from './components/Layout/Navbar';
import './App.css';

const App = memo(function App() {
  return (
    <ResumeProvider>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Navbar />
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
        <Footer />
      </div>
    </ResumeProvider>
  );
});

export default App;