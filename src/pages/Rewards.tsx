import React, { useState } from 'react';
import { PointHistory, Achievement } from '../types';
import { mockPointHistory, mockAchievements } from '../utils/mockData';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from '../components/common/Icon';
import { Sidebar } from '../components/layout/Sidebar';
import { RightSidebar } from '../components/layout/RightSidebar';

export const Rewards: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('history');
  const [category, setCategory] = useState('all');

  const tabs = [
    { key: 'history', label: { en: 'Point History', ko: '포인트 히스토리' } },
    { key: 'leaderboard', label: { en: 'Leaderboard', ko: '리더보드' } },
    { key: 'achievements', label: { en: 'Achievements', ko: '업적' } }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Kim J.', points: 12450 },
    { rank: 2, name: 'Lee S.', points: 11230 },
    { rank: 3, name: 'Park M.', points: 9870 },
    { rank: 4, name: 'You', points: 2450 },
    { rank: 5, name: 'Choi H.', points: 2100 },
    { rank: 6, name: 'Jung K.', points: 1950 }
  ];

  const getAchievementIcon = (iconType: string) => {
    switch (iconType) {
      case 'VOTE': return 'vote';
      case 'IDEA': return 'policy';
      case 'CROWN': return 'award';
      default: return 'check';
    }
  };

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
            {t({ en: 'Rewards & Achievements', ko: '보상 & 업적' })}
          </h1>
        </div>

        {/* Points Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            border: '1px solid var(--border-light)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 1rem',
              background: 'var(--gradient-teal)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <Icon name="award" size={32} />
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              2,450
            </div>
            <div>
              {t({ en: 'Total Points', ko: '총 포인트' })}
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            border: '1px solid var(--border-light)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 1rem',
              background: 'var(--gradient-teal)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <Icon name="users" size={32} />
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              47
            </div>
            <div>
              {t({ en: 'Current Rank', ko: '현재 순위' })}
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            border: '1px solid var(--border-light)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 1rem',
              background: 'var(--gradient-teal)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <Icon name="vote" size={32} />
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              +150
            </div>
            <div>
              {t({ en: 'This Month', ko: '이번 달' })}
            </div>
          </div>
        </div>

        {/* Tabs for Rewards */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid var(--border-light)',
          marginBottom: '2rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '1rem 2rem',
                background: 'none',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer',
                color: activeTab === tab.key ? 'var(--teal)' : 'var(--text-light)',
                borderBottom: activeTab === tab.key ? '2px solid var(--teal)' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'history' && (
          <div>
            {/* Points Chart */}
            <div style={{
              background: 'var(--bg-white)',
              padding: '2rem',
              borderRadius: '16px',
              marginBottom: '2rem',
              border: '1px solid var(--border-light)'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>
                {t({ en: 'Points Earned Over Time', ko: '시간별 포인트 획득' })}
              </h3>
              <div style={{
                height: '200px',
                background: 'var(--bg-light)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'space-around',
                padding: '1rem',
                margin: '1rem 0'
              }}>
                {[60, 80, 45, 100, 75, 90, 65].map((height, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'var(--gradient-teal)',
                      width: '30px',
                      height: `${height}%`,
                      borderRadius: '4px 4px 0 0',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Recent Transactions */}
            <div>
              {mockPointHistory.map((item, index) => (
                <div key={index} style={{
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--gradient-teal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    <Icon name="award" size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      color: 'var(--text-dark)',
                      marginBottom: '4px'
                    }}>
                      {t(item.action)}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--text-light)'
                    }}>
                      {item.date}
                    </div>
                  </div>
                  <div style={{
                    color: 'var(--green)',
                    fontWeight: '600'
                  }}>
                    +{item.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            {leaderboardData.map((user) => (
              <div key={user.rank} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderBottom: user.rank === leaderboardData.length ? 'none' : '1px solid var(--border-light)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: user.name === 'You' ? 'var(--gradient-teal)' : 'var(--gradient-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {user.rank}
                  </div>
                  <div style={{
                    fontWeight: user.name === 'You' ? '700' : '500',
                    color: user.name === 'You' ? 'var(--teal)' : 'var(--text-dark)'
                  }}>
                    {user.name}
                  </div>
                </div>
                <div style={{
                  fontWeight: '600',
                  background: 'var(--gradient-teal)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {user.points.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {mockAchievements.map((achievement) => (
              <div key={achievement.id} style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: achievement.unlocked ? 'var(--gradient-purple)' : '#ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: achievement.unlocked ? 'white' : '#999',
                  fontSize: '32px',
                  margin: '0 auto 1rem'
                }}>
                  <Icon name={getAchievementIcon(achievement.icon)} size={32} />
                </div>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                  {t(achievement.name)}
                </h4>
                <p style={{
                  color: 'var(--text-light)',
                  fontSize: '14px'
                }}>
                  {t(achievement.description)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};