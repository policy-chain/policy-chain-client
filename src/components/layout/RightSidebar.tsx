import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { useLanguage } from '../../context/LanguageContext';
import { Icon } from '../common/Icon';

export const RightSidebar: React.FC = () => {
  const { isConnected } = useWallet();
  const { t } = useLanguage();

  return (
    <aside style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      {/* Stats Widget */}
      <div style={{
        background: 'var(--bg-white)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--shadow-light)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '1.5rem',
          color: 'var(--text-dark)'
        }}>
          당신의 영향력
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(32, 178, 170, 0.05)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              12
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--text-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              투표 참여
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(32, 178, 170, 0.05)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              2.4k
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--text-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              획득 포인트
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(32, 178, 170, 0.05)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              8
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--text-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              제안
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(32, 178, 170, 0.05)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              #47
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--text-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              순위
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div style={{
        background: 'var(--bg-white)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--shadow-light)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '1.5rem',
          color: 'var(--text-dark)'
        }}>
          최근 활동
        </h3>
        <div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem 0',
            borderBottom: '1px solid var(--border-light)'
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
              <Icon name="vote" size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'var(--text-dark)',
                marginBottom: '4px'
              }}>
                탄소세 정책에 새 투표
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-light)'
              }}>
                2분 전
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem 0',
            borderBottom: '1px solid var(--border-light)'
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
                참여로 50포인트 획득
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-light)'
              }}>
                1시간 전
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem 0'
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
              <Icon name="check" size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: 'var(--text-dark)',
                marginBottom: '4px'
              }}>
                정책 제안이 승인됨
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-light)'
              }}>
                3시간 전
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{
        background: 'var(--bg-white)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--shadow-light)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '1.5rem',
          color: 'var(--text-dark)'
        }}>
          상위 기여자
        </h3>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
            borderBottom: '1px solid var(--border-light)'
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
                background: 'var(--gradient-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                K
              </div>
              <div style={{
                fontWeight: '500',
                color: 'var(--text-dark)'
              }}>
                Kim J.
              </div>
            </div>
            <div style={{
              fontWeight: '600',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              12,450
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
            borderBottom: '1px solid var(--border-light)'
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
                background: 'var(--gradient-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                L
              </div>
              <div style={{
                fontWeight: '500',
                color: 'var(--text-dark)'
              }}>
                Lee S.
              </div>
            </div>
            <div style={{
              fontWeight: '600',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              11,230
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0'
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
                background: 'var(--gradient-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                P
              </div>
              <div style={{
                fontWeight: '500',
                color: 'var(--text-dark)'
              }}>
                Park M.
              </div>
            </div>
            <div style={{
              fontWeight: '600',
              background: 'var(--gradient-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              9,870
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};