import React from 'react';

interface WalletIconProps {
  wallet: 'metamask' | 'phantom';
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
  const imageSrc = wallet === 'metamask' 
    ? '/images/metamask.webp' 
    : '/images/phantom.png';
  
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
};