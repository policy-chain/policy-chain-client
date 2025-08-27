import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { Icon } from '../components/common/Icon';
import { Sidebar } from '../components/layout/Sidebar';
import { RightSidebar } from '../components/layout/RightSidebar';
import { Button } from '../components/common/Button';

export const MyPage: React.FC = () => {
  const { address } = useWallet();
  const [activeTab, setActiveTab] = useState('votes');

  // 주소 포맷팅 함수
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // 스테이킹 데이터 가져오기
  const getUserStakes = () => {
    const stakes = JSON.parse(localStorage.getItem('userStakes') || '[]');
    return stakes;
  };

  const handleClaimStake = (stakeId: number) => {
    const stakes = getUserStakes();
    const updatedStakes = stakes.map((stake: any) => 
      stake.id === stakeId 
        ? { ...stake, status: 'claimed' }
        : stake
    );
    localStorage.setItem('userStakes', JSON.stringify(updatedStakes));
    alert('스테이킹 토큰이 성공적으로 회수되었습니다!');
    // 컴포넌트 리렌더링을 위해 강제로 상태 업데이트
    window.location.reload();
  };

  // 컴포넌트가 마운트될 때 샘플 데이터 추가
  useEffect(() => {
    const existingStakes = getUserStakes();
    if (existingStakes.length === 0) {
      // 샘플 스테이킹 데이터 추가
      const sampleStakes = [
        {
          id: 1,
          policyId: 1,
          policyTitle: '2025년 탄소세 도입법',
          voteType: 'support',
          stakeAmount: 100,
          timestamp: '2025-08-25T10:00:00Z',
          status: 'active',
          earnedReward: 100
        },
        {
          id: 2,
          policyId: 2,
          policyTitle: '디지털 의료 현대화 계획',
          voteType: 'support',
          stakeAmount: 50,
          timestamp: '2025-08-24T15:30:00Z',
          status: 'claimable',
          earnedReward: 150
        },
        {
          id: 3,
          policyId: 3,
          policyTitle: '소상공인 지원 패키지',
          voteType: 'oppose',
          stakeAmount: 75,
          timestamp: '2025-08-20T09:15:00Z',
          status: 'claimable',
          earnedReward: 75
        }
      ];
      localStorage.setItem('userStakes', JSON.stringify(sampleStakes));
    }
  }, []);

  // 모의 데이터
  const myVotes = [
    {
      id: 1,
      title: '2025년 탄소세 도입법',
      voteType: 'support',
      date: '2025-08-25',
      points: 100,
      status: 'active'
    },
    {
      id: 2,
      title: '디지털 의료 현대화 계획',
      voteType: 'support',
      date: '2025-08-24',
      points: 150,
      status: 'active'
    },
    {
      id: 3,
      title: '소상공인 지원 패키지',
      voteType: 'oppose',
      date: '2025-08-23',
      points: 75,
      status: 'pending'
    }
  ];

  const myProposals = [
    {
      id: 1,
      title: '스마트시티 인프라 구축 계획',
      category: 'technology',
      description: '도시 전반에 IoT 센서와 스마트 기술을 도입하여 효율성을 높이는 정책',
      status: 'active',
      votes: { support: 234, oppose: 67, abstain: 23 },
      submitDate: '2025-08-20',
      points: 200
    },
    {
      id: 2,
      title: '청년 주택 지원 정책',
      category: 'housing',
      description: '청년층의 주거 안정을 위한 임대료 지원 및 주택 공급 확대',
      status: 'pending',
      votes: { support: 156, oppose: 34, abstain: 12 },
      submitDate: '2025-08-18',
      points: 150
    }
  ];

  const myDiscussions = [
    {
      id: 1,
      title: '탄소세가 소상공인에게 미치는 영향',
      category: 'environment',
      replies: 15,
      views: 89,
      lastActivity: '1시간 전'
    },
    {
      id: 2,
      title: '스마트시티 보안 문제 해결방안',
      category: 'technology',
      replies: 8,
      views: 45,
      lastActivity: '3시간 전'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'votes':
        const userStakes = getUserStakes();
        const activeStakes = userStakes.filter((stake: any) => stake.status === 'active');
        const claimableStakes = userStakes.filter((stake: any) => stake.status === 'claimable');

        return (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600' }}>
                투표 관리 ({myVotes.length + userStakes.length})
              </h3>
              <div style={{
                display: 'flex',
                gap: '1rem',
                fontSize: '14px'
              }}>
                <div style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(32, 178, 170, 0.1)',
                  borderRadius: '20px',
                  color: 'var(--teal)',
                  fontWeight: '600'
                }}>
                  진행중: {activeStakes.length}
                </div>
                <div style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(50, 205, 50, 0.1)',
                  borderRadius: '20px',
                  color: 'var(--green)',
                  fontWeight: '600'
                }}>
                  회수가능: {claimableStakes.length}
                </div>
              </div>
            </div>

            {/* Claimable Stakes - 가장 위에 표시 */}
            {claimableStakes.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: 'var(--green)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Icon name="download" size={16} />
                  토큰 회수 가능 ({claimableStakes.length})
                </h4>
                {claimableStakes.map((stake: any) => (
                  <div
                    key={stake.id}
                    style={{
                      background: 'linear-gradient(135deg, rgba(50, 205, 50, 0.1) 0%, rgba(50, 205, 50, 0.05) 100%)',
                      border: '2px solid var(--green)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      marginBottom: '1rem',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'var(--gradient-green)',
                      borderRadius: '16px 16px 0 0'
                    }} />
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <div style={{
                            padding: '2px 8px',
                            background: 'var(--green)',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            투표 완료
                          </div>
                          <div style={{
                            padding: '2px 8px',
                            background: stake.voteType === 'support' ? 'var(--green)' : 
                                      stake.voteType === 'oppose' ? '#dc3545' : 'var(--text-light)',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            {stake.voteType === 'support' ? '찬성' : 
                             stake.voteType === 'oppose' ? '반대' : '기권'}
                          </div>
                        </div>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: 'var(--text-dark)'
                        }}>
                          {stake.policyTitle}
                        </h4>
                        <div style={{
                          display: 'flex',
                          gap: '2rem',
                          fontSize: '14px',
                          marginBottom: '0.5rem'
                        }}>
                          <div>
                            <span style={{ color: 'var(--text-light)' }}>투표한 토큰:</span>
                            <span style={{ color: 'var(--teal)', fontWeight: '600', marginLeft: '0.5rem' }}>
                              {stake.stakeAmount} 토큰
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-light)' }}>보너스 리워드:</span>
                            <span style={{ color: 'var(--green)', fontWeight: '600', marginLeft: '0.5rem' }}>
                              +{stake.earnedReward}P
                            </span>
                          </div>
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: 'var(--text-light)'
                        }}>
                          투표일: {new Date(stake.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleClaimStake(stake.id)}
                        variant="primary"
                        style={{
                          background: 'var(--gradient-green)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.5rem'
                        }}
                      >
                        <Icon name="download" size={16} />
                        토큰 회수하기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active Stakes */}
            {activeStakes.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: 'var(--teal)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Icon name="lock" size={16} />
                  진행중인 투표 ({activeStakes.length})
                </h4>
                {activeStakes.map((stake: any) => (
                  <div
                    key={stake.id}
                    style={{
                      background: 'var(--bg-light)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <div style={{
                            padding: '2px 8px',
                            background: 'var(--teal)',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            투표 진행중
                          </div>
                          <div style={{
                            padding: '2px 8px',
                            background: stake.voteType === 'support' ? 'var(--green)' : 
                                      stake.voteType === 'oppose' ? '#dc3545' : 'var(--text-light)',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            {stake.voteType === 'support' ? '찬성' : 
                             stake.voteType === 'oppose' ? '반대' : '기권'}
                          </div>
                        </div>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: 'var(--text-dark)'
                        }}>
                          {stake.policyTitle}
                        </h4>
                        <div style={{
                          display: 'flex',
                          gap: '2rem',
                          fontSize: '14px',
                          marginBottom: '0.5rem'
                        }}>
                          <div>
                            <span style={{ color: 'var(--text-light)' }}>투표한 토큰:</span>
                            <span style={{ color: 'var(--teal)', fontWeight: '600', marginLeft: '0.5rem' }}>
                              {stake.stakeAmount} 토큰
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-light)' }}>예상 리워드:</span>
                            <span style={{ color: 'var(--green)', fontWeight: '600', marginLeft: '0.5rem' }}>
                              +{stake.earnedReward}P
                            </span>
                          </div>
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: 'var(--text-light)'
                        }}>
                          투표일: {new Date(stake.timestamp).toLocaleDateString()} • 투표 종료시 토큰 자동 회수 가능
                        </div>
                      </div>
                      <div style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: 'rgba(32, 178, 170, 0.1)',
                        color: 'var(--teal)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <Icon name="lock" size={12} />
                        토큰 잠김
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Regular Vote History */}
            {myVotes.length > 0 && (
              <div>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: 'var(--text-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Icon name="vote" size={16} />
                  일반 투표 기록 ({myVotes.length})
                </h4>
                {myVotes.map(vote => (
                  <div
                    key={vote.id}
                    style={{
                      background: 'var(--bg-light)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: 'var(--text-dark)'
                        }}>
                          {vote.title}
                        </h4>
                        <div style={{
                          display: 'flex',
                          gap: '1rem',
                          fontSize: '14px',
                          color: 'var(--text-light)'
                        }}>
                          <span>{vote.date}</span>
                          <span>•</span>
                          <span style={{
                            color: vote.voteType === 'support' ? 'var(--green)' : 
                                  vote.voteType === 'oppose' ? '#dc3545' : 'var(--text-light)',
                            fontWeight: '600'
                          }}>
                            {vote.voteType === 'support' ? '찬성' : 
                             vote.voteType === 'oppose' ? '반대' : '기권'}
                          </span>
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{
                          background: 'var(--gradient-teal)',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          +{vote.points}P
                        </div>
                        <div style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: vote.status === 'active' ? 'rgba(50, 205, 50, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                          color: vote.status === 'active' ? 'var(--green)' : '#FFC107'
                        }}>
                          {vote.status === 'active' ? '진행중' : '대기중'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {myVotes.length === 0 && userStakes.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: 'var(--text-light)'
              }}>
                <Icon name="vote" size={48} color="var(--text-light)" style={{ marginBottom: '1rem' }} />
                <p>아직 투표한 정책이 없습니다.</p>
                <p>정책 페이지에서 투표에 참여해보세요!</p>
              </div>
            )}
          </div>
        );

      case 'proposals':
        return (
          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '20px', fontWeight: '600' }}>
              내가 제안한 정책 ({myProposals.length})
            </h3>
            {myProposals.map(proposal => {
              const totalVotes = proposal.votes.support + proposal.votes.oppose + proposal.votes.abstain;
              const supportRate = totalVotes > 0 ? (proposal.votes.support / totalVotes * 100).toFixed(1) : 0;
              
              return (
                <div
                  key={proposal.id}
                  style={{
                    background: 'var(--bg-light)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '1.5rem',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'var(--gradient-teal)',
                    borderRadius: '16px 16px 0 0'
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: 'var(--text-dark)'
                      }}>
                        {proposal.title}
                      </h4>
                      <p style={{
                        color: 'var(--text-light)',
                        marginBottom: '1rem',
                        lineHeight: 1.6
                      }}>
                        {proposal.description}
                      </p>
                    </div>
                    <div style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: proposal.status === 'active' ? 'rgba(50, 205, 50, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                      color: proposal.status === 'active' ? 'var(--green)' : '#FFC107'
                    }}>
                      {proposal.status === 'active' ? '진행중' : '검토중'}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: 'var(--text-light)'
                    }}>
                      <Icon name="users" size={16} />
                      <span>{totalVotes} 투표</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: 'var(--text-light)'
                    }}>
                      <Icon name="calendar" size={16} />
                      <span>{proposal.submitDate}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: 'var(--green)',
                      fontWeight: '600'
                    }}>
                      <Icon name="award" size={16} />
                      <span>+{proposal.points}P</span>
                    </div>
                  </div>

                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'var(--bg-white)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${supportRate}%`,
                      background: 'var(--gradient-green)',
                    }} />
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--text-light)'
                  }}>
                    찬성 {supportRate}% • 반대 {(totalVotes > 0 ? (proposal.votes.oppose / totalVotes * 100).toFixed(1) : 0)}%
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'discussions':
        return (
          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '20px', fontWeight: '600' }}>
              내가 참여한 토론 ({myDiscussions.length})
            </h3>
            {myDiscussions.map(discussion => (
              <div
                key={discussion.id}
                style={{
                  background: 'var(--bg-light)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: 'var(--text-dark)'
                    }}>
                      {discussion.title}
                    </h4>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '14px',
                      color: 'var(--text-light)'
                    }}>
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
        );

      default:
        return null;
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
      <Sidebar activeCategory="all" onCategoryChange={() => {}} />

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
            마이페이지
          </h1>
        </div>

        {/* Profile Summary */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(32, 178, 170, 0.05) 0%, rgba(65, 105, 225, 0.05) 100%)',
          border: '1px solid var(--border-light)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--gradient-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img 
              src={`${process.env.PUBLIC_URL}/images/user-icon.png`}
              alt="User Profile"
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)' // 흰색으로 변경
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '0.5rem' }}>
              {address ? formatAddress(address) : '지갑 주소'}
            </h3>
            <div style={{
              display: 'flex',
              gap: '2rem',
              color: 'var(--text-light)'
            }}>
              <span>가입일: 2025.08.15</span>
              <span>•</span>
              <span>총 포인트: 2,450P</span>
              <span>•</span>
              <span>랭킹: 47위</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid var(--border-light)',
          marginBottom: '2rem'
        }}>
          {[
            { key: 'votes', label: '투표 관리' },
            { key: 'proposals', label: '제안한 정책' },
            { key: 'discussions', label: '토론 참여' }
          ].map(tab => (
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
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};