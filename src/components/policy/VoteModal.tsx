import React, { useState } from 'react';
import { Policy, VoteType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';

interface VoteModalProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
  onVote: (policyId: number, voteType: VoteType) => void;
}

export const VoteModal: React.FC<VoteModalProps> = ({ policy, isOpen, onClose, onVote }) => {
  const { t } = useLanguage();
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);

  if (!isOpen || !policy) return null;

  const handleSubmit = () => {
    if (selectedVote && policy) {
      onVote(policy.id, selectedVote);
      setSelectedVote(null);
      onClose();
    }
  };

  const voteOptions = [
    { value: 'support', label: { en: 'Support (Yes)', ko: '찬성' } },
    { value: 'oppose', label: { en: 'Oppose (No)', ko: '반대' } },
    { value: 'abstain', label: { en: 'Abstain', ko: '기권' } }
  ] as const;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        background: 'var(--bg-white)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--text-dark)'
          }}>
            투표하기
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'var(--text-light)',
              padding: '8px',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Policy Info */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: 'var(--text-dark)'
          }}>
            {t(policy.title)}
          </h3>
          <p style={{
            color: 'var(--text-light)',
            lineHeight: '1.6'
          }}>
            {t(policy.description)}
          </p>
        </div>

        {/* Vote Options */}
        <div style={{
          display: 'grid',
          gap: '1rem',
          margin: '2rem 0'
        }}>
          {voteOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => setSelectedVote(option.value)}
              style={{
                padding: '1.5rem',
                border: `2px solid ${selectedVote === option.value ? 'var(--teal)' : 'var(--border-light)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: selectedVote === option.value ? 'rgba(32, 178, 170, 0.1)' : 'transparent'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                border: `2px solid ${selectedVote === option.value ? 'var(--teal)' : 'var(--border-light)'}`,
                borderRadius: '50%',
                position: 'relative'
              }}>
                {selectedVote === option.value && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '10px',
                    height: '10px',
                    background: 'var(--teal)',
                    borderRadius: '50%'
                  }} />
                )}
              </div>
              <div style={{
                fontWeight: '500',
                color: 'var(--text-dark)'
              }}>
                {t(option.label)}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          <Button
            onClick={onClose}
            variant="outline"
            style={{ flex: 1 }}
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            disabled={!selectedVote}
            style={{ flex: 1 }}
          >
            투표 제출
          </Button>
        </div>
      </div>
    </div>
  );
};