import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  style = {}
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-weight-600 border-radius-12 transition-all cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-primary-blue text-white border-2 border-primary-blue hover:bg-primary-blue-hover',
    secondary: 'bg-gray-100 text-text-dark border-2 border-gray-100 hover:bg-gray-200',
    outline: 'bg-transparent text-primary-blue border-2 border-primary-blue hover:bg-primary-blue hover:text-white'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? 'var(--primary-blue)' : variant === 'outline' ? 'transparent' : '#f1f5f9',
        color: variant === 'primary' ? 'white' : variant === 'outline' ? 'var(--primary-blue)' : 'var(--text-dark)',
        borderColor: variant === 'outline' ? 'var(--primary-blue)' : 'transparent',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '12px',
        padding: size === 'small' ? '6px 12px' : size === 'medium' ? '12px 24px' : '16px 32px',
        fontWeight: '600',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? '0.5' : '1',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          if (variant === 'primary') {
            (e.target as HTMLElement).style.backgroundColor = 'var(--primary-blue-hover)';
          } else if (variant === 'outline') {
            (e.target as HTMLElement).style.backgroundColor = 'var(--primary-blue)';
            (e.target as HTMLElement).style.color = 'white';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          if (variant === 'primary') {
            (e.target as HTMLElement).style.backgroundColor = 'var(--primary-blue)';
          } else if (variant === 'outline') {
            (e.target as HTMLElement).style.backgroundColor = 'transparent';
            (e.target as HTMLElement).style.color = 'var(--primary-blue)';
          }
        }
      }}
    >
      {loading && (
        <div style={{ 
          width: '16px', 
          height: '16px', 
          border: '2px solid currentColor', 
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite' 
        }} />
      )}
      {children}
    </button>
  );
};