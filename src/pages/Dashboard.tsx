import React, { useState } from 'react';
import { Policy, VoteType } from '../types';
import { mockPolicies } from '../utils/mockData';
import { PolicyCard } from '../components/policy/PolicyCard';
import { VoteModal } from '../components/policy/VoteModal';
import { Sidebar } from '../components/layout/Sidebar';
import { RightSidebar } from '../components/layout/RightSidebar';

export const Dashboard: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');

  const filteredPolicies = policies.filter(policy => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'voting' && policy.status === 'active') ||
      (filter === 'pending' && policy.status === 'pending') ||
      (filter === 'closed' && policy.status === 'closed');
    
    const matchesCategory = category === 'all' || policy.category === category;
    
    return matchesFilter && matchesCategory;
  });

  const handleVoteClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsVoteModalOpen(true);
  };

  const handleVote = (policyId: number, voteType: VoteType) => {
    setPolicies(prevPolicies =>
      prevPolicies.map(policy =>
        policy.id === policyId
          ? {
              ...policy,
              votes: {
                ...policy.votes,
                [voteType]: policy.votes[voteType] + 1
              }
            }
          : policy
      )
    );
    
    alert(`투표가 성공적으로 제출되었습니다! ${selectedPolicy?.reward}포인트를 획득했습니다.`);
  };

  const filterTabs = [
    { key: 'all', label: '전체' },
    { key: 'voting', label: '투표중' },
    { key: 'pending', label: '대기중' },
    { key: 'closed', label: '종료됨' }
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
          marginBottom: '2rem',
          gap: '2rem'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            background: 'var(--gradient-teal)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            활성 정책 제안
          </h1>
          
          <div style={{
            display: 'flex',
            gap: '10px'
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
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {/* Policy Grid */}
        <div style={{
          display: 'grid',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {filteredPolicies.map(policy => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              onVote={handleVoteClick}
            />
          ))}
        </div>

        {/* Vote Modal */}
        <VoteModal
          policy={selectedPolicy}
          isOpen={isVoteModalOpen}
          onClose={() => {
            setIsVoteModalOpen(false);
            setSelectedPolicy(null);
          }}
          onVote={handleVote}
        />
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};