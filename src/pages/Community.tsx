import React, { useState } from 'react';
import { Discussion } from '../types';
import { mockDiscussions } from '../utils/mockData';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from '../components/common/Icon';
import { Sidebar } from '../components/layout/Sidebar';
import { RightSidebar } from '../components/layout/RightSidebar';
import { DiscussionModal } from '../components/discussion/DiscussionModal';

export const Community: React.FC = () => {
  const { t } = useLanguage();
  const [discussions] = useState<Discussion[]>(mockDiscussions);
  const [category, setCategory] = useState('all');
  const [filter, setFilter] = useState('all');
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | undefined>(undefined);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = category === 'all' || discussion.category === category;
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'hot' && discussion.isHot) ||
      (filter === 'recent' && (discussion.lastActivity.includes('시간') || discussion.lastActivity.includes('분')));
    
    return matchesCategory && matchesFilter;
  });

  const filterTabs = [
    { key: 'all', label: { en: 'All Topics', ko: '전체 주제' } },
    { key: 'hot', label: { en: 'Hot Topics', ko: '인기 주제' } },
    { key: 'recent', label: { en: 'Recent', ko: '최근' } }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '280px 1fr 320px',
      minHeight: 'calc(100vh - 80px)',
      maxWidth: '1400px',
      marginLeft: 'auto',
      marginRight: 'auto',
      gap: '2rem',
      padding: '2rem'
    }}>
      {/* Left Sidebar */}
      <Sidebar 
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      {/* Main Content */}
      <div style={{
        background: 'var(--bg-white)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--shadow-light)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            background: 'var(--gradient-teal)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t({ en: 'Community Discussions', ko: '커뮤니티 토론' })}
          </h1>
        </div>

        {/* Discussion Categories */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {filterTabs.map(tab => (
            <div
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '6px 20px',
                border: '2px solid var(--border-light)',
                borderRadius: '25px',
                backgroundColor: filter === tab.key ? 'var(--teal)' : 'var(--bg-white)',
                color: filter === tab.key ? 'white' : 'var(--text-light)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                borderColor: filter === tab.key ? 'var(--teal)' : 'var(--border-light)'
              }}
            >
              {t(tab.label)}
            </div>
          ))}
        </div>

        {/* Discussion List */}
        <div>
          {filteredDiscussions.map(discussion => (
            <div
              key={discussion.id}
              onClick={() => {
                setSelectedDiscussion(discussion);
                setIsDiscussionModalOpen(true);
              }}
              style={{
                background: 'var(--bg-white)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    marginBottom: '0.5rem',
                    color: 'var(--text-dark)',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    {t(discussion.title)}
                    {discussion.isHot && (
                      <span style={{
                        marginLeft: '0.5rem',
                        color: 'var(--green)',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        HOT
                      </span>
                    )}
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '14px',
                    color: 'var(--text-light)'
                  }}>
                    <span>By {discussion.author}</span>
                    <span>•</span>
                    <span>{discussion.lastActivity}</span>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '1.5rem',
                  fontSize: '14px',
                  color: 'var(--text-light)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Icon name="discuss" size={16} />
                    <span>{discussion.replies}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Icon name="users" size={16} />
                    <span>{discussion.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create New Discussion Button */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <button
            style={{
              padding: '12px 24px',
              background: 'var(--gradient-teal)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Icon name="discuss" size={16} />
            {t({ en: 'Start New Discussion', ko: '새 토론 시작' })}
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />

      {/* Discussion Modal */}
      <DiscussionModal
        discussion={selectedDiscussion}
        isOpen={isDiscussionModalOpen}
        onClose={() => {
          setIsDiscussionModalOpen(false);
          setSelectedDiscussion(undefined);
        }}
      />
    </div>
  );
};