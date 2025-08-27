import React, { useState } from 'react';
import { Policy } from '../types';
import { mockPolicies } from '../utils/mockData';
import { useLanguage } from '../context/LanguageContext';
import { PolicyCard } from '../components/policy/PolicyCard';
import { VoteModal } from '../components/policy/VoteModal';
import { Button } from '../components/common/Button';
import { Icon } from '../components/common/Icon';
import { Sidebar } from '../components/layout/Sidebar';
import { RightSidebar } from '../components/layout/RightSidebar';

export const Policies: React.FC = () => {
  const { t } = useLanguage();
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [category, setCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('active');
  const [showPolicyForm, setShowPolicyForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'economy',
    description: ''
  });

  const filteredPolicies = policies.filter(policy => {
    const matchesCategory = category === 'all' || policy.category === category;
    const matchesTab = 
      activeTab === 'active' ? policy.status === 'active' :
      activeTab === 'my' ? true : // 모든 정책을 내 제안으로 가정
      activeTab === 'history' ? policy.status === 'closed' : true;
    
    return matchesCategory && matchesTab;
  });

  const handleVoteClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsVoteModalOpen(true);
  };

  const handleVote = (policyId: number, voteType: 'support' | 'oppose' | 'abstain') => {
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
    
    alert(t({ 
      en: `Vote submitted successfully! You earned ${selectedPolicy?.reward} points.`,
      ko: `투표가 성공적으로 제출되었습니다! ${selectedPolicy?.reward}포인트를 획득했습니다.`
    }));
  };

  const handleSubmitPolicy = () => {
    if (!formData.title || !formData.description) {
      alert(t({ en: 'Please fill all fields', ko: '모든 필드를 채워주세요' }));
      return;
    }

    const newPolicy: Policy = {
      id: Date.now(),
      title: {
        en: formData.title,
        ko: formData.title
      },
      description: {
        en: formData.description,
        ko: formData.description
      },
      category: formData.category,
      status: 'pending',
      votes: { support: 0, oppose: 0, abstain: 0 },
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30일 후
      department: t({ en: 'User Proposal', ko: '사용자 제안' }),
      reward: 100
    };

    setPolicies(prev => [newPolicy, ...prev]);
    setFormData({ title: '', category: 'economy', description: '' });
    setShowPolicyForm(false);
    
    alert(t({ 
      en: 'Policy proposal submitted! It will be reviewed within 3 business days.',
      ko: '정책 제안이 제출되었습니다! 3영업일 내에 검토됩니다.'
    }));
  };

  const tabs = [
    { key: 'active', label: { en: 'Active Policies', ko: '진행중 정책' } },
    { key: 'my', label: { en: 'My Proposals', ko: '내 제안' } },
    { key: 'history', label: { en: 'History', ko: '히스토리' } }
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
            {t({ en: 'Policy Management', ko: '정책 관리' })}
          </h1>
        </div>

        {/* Create New Policy */}
        <div 
          onClick={() => setShowPolicyForm(!showPolicyForm)}
          style={{
            background: 'linear-gradient(135deg, rgba(32, 178, 170, 0.05) 0%, rgba(65, 105, 225, 0.05) 100%)',
            border: '2px dashed var(--teal)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '2rem'
          }}
        >
          <Icon name="policy" size={48} color="var(--teal)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--teal)', marginBottom: '0.5rem' }}>
            {t({ en: 'Propose New Policy', ko: '새 정책 제안' })}
          </h3>
          <p style={{ color: 'var(--text-light)' }}>
            {t({ en: 'Share your ideas to improve public services', ko: '공공 서비스 개선 아이디어를 공유하세요' })}
          </p>
        </div>

        {/* Policy Creation Form */}
        {showPolicyForm && (
          <div style={{
            background: 'var(--bg-white)',
            padding: '2rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            border: '1px solid var(--border-light)'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>
              {t({ en: 'Create New Policy Proposal', ko: '새 정책 제안 작성' })}
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--text-dark)'
              }}>
                {t({ en: 'Policy Title', ko: '정책 제목' })}
              </label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={t({ en: 'Enter policy title...', ko: '정책 제목을 입력하세요...' })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid var(--border-light)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  background: 'var(--bg-white)'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--text-dark)'
              }}>
                {t({ en: 'Category', ko: '카테고리' })}
              </label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid var(--border-light)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  background: 'var(--bg-white)'
                }}
              >
                <option value="economy">{t({ en: 'Economy', ko: '경제' })}</option>
                <option value="environment">{t({ en: 'Environment', ko: '환경' })}</option>
                <option value="healthcare">{t({ en: 'Healthcare', ko: '의료' })}</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--text-dark)'
              }}>
                {t({ en: 'Policy Description', ko: '정책 설명' })}
              </label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={t({ en: 'Describe your policy proposal in detail...', ko: '정책 제안을 자세히 설명해주세요...' })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid var(--border-light)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  background: 'var(--bg-white)',
                  resize: 'vertical',
                  minHeight: '120px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={() => setShowPolicyForm(false)}
                variant="outline"
                style={{ flex: 1 }}
              >
                {t({ en: 'Cancel', ko: '취소' })}
              </Button>
              <Button
                onClick={handleSubmitPolicy}
                variant="primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Icon name="check" size={16} />
                {t({ en: 'Submit Proposal', ko: '제안 제출' })}
              </Button>
            </div>
          </div>
        )}

        {/* Policy Tabs */}
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

        {/* Policy Grid */}
        <div style={{
          display: 'grid',
          gap: '2rem'
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