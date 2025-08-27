import React, { useState } from 'react';
import { Policy } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Icon } from '../common/Icon';
import { DiscussionModal } from '../discussion/DiscussionModal';

interface PolicyCardProps {
  policy: Policy;
  onVote: (policy: Policy) => void;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({ policy, onVote }) => {
  const { t } = useLanguage();
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);

  const totalVotes = policy.votes.support + policy.votes.oppose + policy.votes.abstain;
  const supportPercentage = totalVotes > 0 ? (policy.votes.support / totalVotes * 100).toFixed(1) : 0;
  const opposePercentage = totalVotes > 0 ? (policy.votes.oppose / totalVotes * 100).toFixed(1) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: 'rgba(50, 205, 50, 0.1)', color: 'var(--green)' };
      case 'pending':
        return { bg: 'rgba(255, 193, 7, 0.1)', color: '#FFC107' };
      case 'closed':
        return { bg: 'rgba(108, 117, 125, 0.1)', color: '#6c757d' };
      default:
        return { bg: 'rgba(108, 117, 125, 0.1)', color: '#6c757d' };
    }
  };

  const statusStyle = getStatusColor(policy.status);

  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
        border: '1px solid var(--border-light)',
        borderRadius: '20px',
        padding: '2rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top stripe */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--gradient-teal)'
        }} />

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: '1rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '14px',
            color: 'var(--text-light)'
          }}>
            <span>{policy.department}</span>
            <span>•</span>
            <span>{t({ en: `Ends: ${policy.endDate}`, ko: `마감: ${policy.endDate}` })}</span>
          </div>
          <div style={{
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            background: statusStyle.bg,
            color: statusStyle.color
          }}>
            {policy.status}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '1rem',
          color: 'var(--text-dark)'
        }}>
          {t(policy.title)}
        </h3>

        {/* Description */}
        <p style={{
          color: 'var(--text-light)',
          marginBottom: '1.5rem',
          lineHeight: 1.6
        }}>
          {t(policy.description)}
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--text-light)'
            }}>
              <Icon name="users" size={16} />
              <span>{totalVotes} {t({ en: 'votes', ko: '투표' })}</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--text-light)'
            }}>
              <Icon name="award" size={16} />
              <span>{policy.reward} {t({ en: 'points', ko: '포인트' })}</span>
            </div>
          </div>
        </div>

        {/* Vote Progress */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'var(--bg-light)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <div style={{
            height: '100%',
            width: `${supportPercentage}%`,
            background: 'var(--gradient-green)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: 'var(--text-light)',
          marginBottom: '1.5rem'
        }}>
          <span>{t({ en: 'Support', ko: '찬성' })}: {supportPercentage}%</span>
          <span>{t({ en: 'Oppose', ko: '반대' })}: {opposePercentage}%</span>
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          <button
            onClick={() => onVote(policy)}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: '2px solid var(--primary-blue)',
              borderRadius: '12px',
              background: 'var(--primary-blue)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Icon name="vote" size={16} />
            <span>{t({ en: 'Vote Now', ko: '지금 투표' })}</span>
          </button>
          <button
            onClick={() => setIsDiscussionOpen(true)}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: '2px solid var(--primary-blue)',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--primary-blue)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Icon name="discuss" size={16} />
            <span>{t({ en: 'Discuss', ko: '토론' })}</span>
          </button>
        </div>
      </div>

      {/* Discussion Modal */}
      <DiscussionModal
        policy={policy}
        isOpen={isDiscussionOpen}
        onClose={() => setIsDiscussionOpen(false)}
      />
    </>
  );
};