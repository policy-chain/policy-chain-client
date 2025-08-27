import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatAddress } from '../../utils/wallet';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentSection, onSectionChange }) => {
  const { address, isConnected, isConnecting, connectMetamask, connectPhantom, disconnect } = useWallet();
  const { currentLang, toggleLanguage, t } = useLanguage();
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  const menuItems = [
    { key: 'dashboard', label: { en: 'Dashboard', ko: '대시보드' } },
    { key: 'policies', label: { en: 'Policies', ko: '정책' } },
    { key: 'community', label: { en: 'Community', ko: '커뮤니티' } },
    { key: 'rewards', label: { en: 'Rewards', ko: '보상' } }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-light)',
      zIndex: 1000,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--text-dark)',
          textDecoration: 'none',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--gradient-teal)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px'
          }}>
            P
          </div>
          PolicyChain
        </div>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => onSectionChange(item.key)}
              style={{
                color: currentSection === item.key ? 'var(--primary-blue)' : 'var(--text-light)',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                backgroundColor: currentSection === item.key ? 'rgba(32, 178, 170, 0.1)' : 'transparent'
              }}
            >
              {t(item.label)}
            </div>
          ))}
        </nav>

        {/* User Menu */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            style={{
              background: 'var(--gradient-teal)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {currentLang === 'en' ? '한국어' : 'EN'}
          </button>

          {/* Wallet Connection */}
          {isConnected ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                style={{
                  background: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Icon name="wallet" size={16} />
                {t({ en: `Connected: ${formatAddress(address!)}`, ko: `연결됨: ${formatAddress(address!)}` })}
                <Icon name="chevronDown" size={16} />
              </button>
              
              {showWalletDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  minWidth: '200px',
                  boxShadow: 'var(--shadow-medium)',
                  borderRadius: '12px',
                  zIndex: 1001,
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  marginTop: '8px'
                }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(address!);
                      setShowWalletDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {t({ en: 'Copy Address', ko: '주소 복사' })}
                  </button>
                  <button
                    onClick={() => {
                      disconnect();
                      setShowWalletDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#dc3545'
                    }}
                  >
                    {t({ en: 'Disconnect', ko: '연결 해제' })}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                disabled={isConnecting}
                style={{
                  background: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: isConnecting ? 0.7 : 1
                }}
              >
                {isConnecting ? (
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid currentColor', 
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite' 
                  }} />
                ) : (
                  <Icon name="wallet" size={16} />
                )}
                {t({ en: 'Connect Wallet', ko: '지갑 연결' })}
              </button>
              
              {showWalletDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  minWidth: '200px',
                  boxShadow: 'var(--shadow-medium)',
                  borderRadius: '12px',
                  zIndex: 1001,
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  marginTop: '8px'
                }}>
                  <button
                    onClick={() => {
                      connectMetamask();
                      setShowWalletDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Icon name="metamask" size={20} />
                    MetaMask
                  </button>
                  <button
                    onClick={() => {
                      connectPhantom();
                      setShowWalletDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Icon name="phantom" size={20} />
                    Phantom
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};