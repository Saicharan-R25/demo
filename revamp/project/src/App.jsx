import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ActionProvider } from './contexts/ActionContext';
import TopNavigation from './components/TopNavigation';
import Sidebar from './components/Sidebar';
import HomePage from './components/pages/HomePage';
import SyntheticDataPage from './components/pages/SyntheticDataPage';
import DataValidationPage from './components/pages/DataValidationPage';
import DataMappingPage from './components/pages/DataMappingPage';
import RunbookPage from './components/pages/RunbookPage';
import AuthPage from './components/pages/AuthPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen transition-all duration-500">
      <TopNavigation />
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Main Content */}
      <div className="relative z-10">
        {currentPage === 'home' && <HomePage onPageChange={setCurrentPage} />}
        {currentPage === 'synthetic' && <SyntheticDataPage />}
        {currentPage === 'validation' && <DataValidationPage />}
        {currentPage === 'mapping' && <DataMappingPage />}
        {currentPage === 'runbook' && <RunbookPage />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ActionProvider>
        <ThemeProvider>
         
            <AppContent />
         
        </ThemeProvider>
      </ActionProvider>
    </AuthProvider>
  );
}


export default App;