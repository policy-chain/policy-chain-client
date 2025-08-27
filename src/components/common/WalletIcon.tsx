import React from 'react';
import { WalletType } from '../../types/wallet';

interface WalletIconProps {
  wallet: WalletType;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const WalletIcon: React.FC<WalletIconProps> = ({ 
  wallet, 
  size = 24, 
  className = '', 
  style = {} 
}) => {
  // 실제 이미지가 있는 지갑들
  const imageWallets = ['metamask', 'phantom'];
  
  if (imageWallets.includes(wallet)) {
    const imageSrc = wallet === 'metamask' 
      ? process.env.PUBLIC_URL + '/images/metamask.webp' 
      : process.env.PUBLIC_URL + '/images/phantom.png';
    
    const altText = wallet === 'metamask' ? 'MetaMask' : 'Phantom';

    return (
      <img
        src={imageSrc}
        alt={altText}
        width={size}
        height={size}
        className={className}
        style={{
          objectFit: 'contain',
          borderRadius: '5px',
          ...style
        }}
      />
    );
  }

  // SVG 아이콘으로 처리할 지갑들
  const renderSvgIcon = () => {
    switch (wallet) {
      case 'kaia':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style}>
            <defs>
              <linearGradient id="kaiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4AA" />
                <stop offset="100%" stopColor="#4ECDC4" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#kaiaGradient)"/>
            <path d="M16 6L8 12v8l8 6 8-6v-8L16 6zm0 3l5.5 4.5v5L16 23l-5.5-4.5v-5L16 9z" fill="white"/>
            <circle cx="16" cy="16" r="2.5" fill="white"/>
          </svg>
        );
      
      case 'walletconnect':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style}>
            <rect width="32" height="32" rx="8" fill="#3B99FC"/>
            <path d="M10 13.5c3.5-3.5 9.5-3.5 13 0l.5.5-2 2-.5-.5c-2.5-2.5-6.5-2.5-9 0l-.5.5-2-2 .5-.5zm6.5 6.5c1-1 2.5-1 3.5 0 1 1 1 2.5 0 3.5s-2.5 1-3.5 0-1-2.5 0-3.5z" fill="white"/>
          </svg>
        );
      
      case 'coinbase':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style}>
            <rect width="32" height="32" rx="8" fill="#0052FF"/>
            <rect x="12" y="12" width="8" height="8" rx="2" fill="white"/>
          </svg>
        );
      
      case 'trust':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style}>
            <rect width="32" height="32" rx="8" fill="#0500FF"/>
            <path d="M16 6l8 4v8c0 5-3.5 9-8 10-4.5-1-8-5-8-10V10l8-4z" fill="white"/>
          </svg>
        );
      
      case 'okx':
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style}>
            <rect width="32" height="32" rx="8" fill="black"/>
            <rect x="8" y="8" width="6" height="6" fill="white"/>
            <rect x="18" y="8" width="6" height="6" fill="white"/>
            <rect x="13" y="13" width="6" height="6" fill="white"/>
            <rect x="8" y="18" width="6" height="6" fill="white"/>
            <rect x="18" y="18" width="6" height="6" fill="white"/>
          </svg>
        );
      
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style}>
            <rect width="32" height="32" rx="8" fill="#6B7280"/>
            <path d="M16 8c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z" fill="white"/>
          </svg>
        );
    }
  };

  return renderSvgIcon();
};