import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Icon } from '../common/Icon';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange }) => {
  const { t } = useLanguage();

  const categories = [
    { 
      key: 'all', 
      label: { en: 'All Policies', ko: '전체 정책' },
      icon: 'check'
    },
    { 
      key: 'economy', 
      label: { en: 'Economy', ko: '경제' },
      icon: 'policy'
    },
    { 
      key: 'environment', 
      label: { en: 'Environment', ko: '환경' },
      icon: 'award'
    },
    { 
      key: 'healthcare', 
      label: { en: 'Healthcare', ko: '의료' },
      icon: 'check'
    }
  ];

  return (
    <aside style={{
      background: 'var(--bg-white)',
      borderRadius: '16px',
      padding: '2rem',
      height: 'fit-content',
      position: 'sticky',
      top: '100px',
      boxShadow: 'var(--shadow-light)'
    }}>
      <div style={{
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '1rem',
          color: 'var(--text-dark)'
        }}>
          카테고리
        </h3>
        {categories.map(category => (
          <div
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '8px',
              color: activeCategory === category.key ? 'var(--teal)' : 'var(--text-light)',
              backgroundColor: activeCategory === category.key ? 'rgba(32, 178, 170, 0.1)' : 'transparent'
            }}
          >
            <Icon name={category.icon} size={20} />
            <span>{t(category.label)}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};