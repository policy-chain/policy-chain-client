import React from 'react';
import { Icon } from '../common/Icon';

export const RightSidebar: React.FC = () => {
  // 모의 지갑 주소 데이터
  const leaderboardData = [
    { address: '0x1a2b3c4d5e6f7890', score: 12450 },
    { address: '0x9876543210abcdef', score: 11230 },
    { address: '0xfedcba0987654321', score: 9870 }
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    alert('주소가 복사되었습니다!');
  };

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
          {leaderboardData.map((user, index) => (
            <div
              key={user.address}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderBottom: index < leaderboardData.length - 1 ? '1px solid var(--border-light)' : 'none',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(32, 178, 170, 0.05)';
                e.currentTarget.style.borderRadius = '8px';
                // 툴팁 표시
                const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                if (tooltip) {
                  tooltip.style.visibility = 'visible';
                  tooltip.style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderRadius = '0px';
                // 툴팁 숨김
                const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                if (tooltip) {
                  tooltip.style.visibility = 'hidden';
                  tooltip.style.opacity = '0';
                }
              }}
              onClick={() => copyToClipboard(user.address)}
              title={`클릭하여 주소 복사: ${user.address}`}
            >
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
                  overflow: 'hidden'
                }}>
                  <img 
                    src="/images/user-icon.png"
                    alt="User Profile"
                    style={{
                      width: '20px',
                      height: '20px',
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
                <div style={{
                  fontWeight: '500',
                  color: 'var(--text-dark)',
                  fontFamily: 'monospace'
                }}>
                  {formatAddress(user.address)}
                </div>
              </div>
              <div style={{
                fontWeight: '600',
                background: 'var(--gradient-teal)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {user.score.toLocaleString()}
              </div>
              
              {/* 툴팁 */}
              <div 
                className="tooltip"
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '8px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  visibility: 'hidden',
                  opacity: '0',
                  transition: 'opacity 0.3s ease, visibility 0.3s ease',
                  zIndex: 1000,
                  fontFamily: 'monospace'
                }}
              >
                {user.address}
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '4px solid rgba(0, 0, 0, 0.8)'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};