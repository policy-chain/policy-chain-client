import React, { useState } from 'react';
import { WalletProvider } from './context/WalletContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Policies } from './pages/Policies';
import { Community } from './pages/Community';
import { Rewards } from './pages/Rewards';
import './styles/globals.css';

function App() {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'policies':
        return <Policies />;
      case 'community':
        return <Community />;
      case 'rewards':
        return <Rewards />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <WalletProvider>
      <LanguageProvider>
        <div className="App">
          <Header 
            currentSection={currentSection} 
            onSectionChange={setCurrentSection} 
          />
          
          <div style={{
            marginTop: '80px'
          }}>
            {renderCurrentSection()}
          </div>
        </div>
      </LanguageProvider>
    </WalletProvider>
  );
}

export default App;