import React from 'react';

export const Community: React.FC = () => {
  return (
    <div style={{
      background: 'var(--bg-white)',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: 'var(--shadow-light)'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        background: 'var(--gradient-teal)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '2rem'
      }}>
        커뮤니티 토론
      </h1>
      <p style={{ color: 'var(--text-light)' }}>커뮤니티 토론 페이지 구현 예정</p>
    </div>
  );
};