import React, { useState, useEffect } from 'react';
import { WalletProvider, useWallet } from './context/WalletContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Policies } from './pages/Policies';
import { Community } from './pages/Community';
import { Rewards } from './pages/Rewards';
import { MyPage } from './pages/MyPage';
import './styles/globals.css';

function AppContent() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const { isConnected } = useWallet();

  // 지갑 연결 해제시 마이페이지에서 대시보드로 리디렉트
  useEffect(() => {
    if (!isConnected && currentSection === 'mypage') {
      setCurrentSection('dashboard');
    }
  }, [isConnected, currentSection]);

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
      case 'mypage':
        // 지갑이 연결되지 않은 경우 대시보드로 리디렉트
        if (!isConnected) {
          return <Dashboard />;
        }
        return <MyPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
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
  );
}

function App() {
  return (
    <WalletProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </WalletProvider>
  );
}

export default App;