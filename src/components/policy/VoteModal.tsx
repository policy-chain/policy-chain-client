import React, { useState } from 'react';
import { Policy, VoteType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';

interface VoteModalProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
  onVote: (policyId: number, voteType: VoteType, stakeAmount: number) => void;
}

export const VoteModal: React.FC<VoteModalProps> = ({ policy, isOpen, onClose, onVote }) => {
  const { t } = useLanguage();
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // 사용자 지갑 잔액 (실제로는 지갑에서 가져와야 함)
  const userBalance = 1000;

  if (!isOpen || !policy) return null;

  const handleSubmit = () => {
    if (selectedVote && policy) {
      const finalAmount = showCustomInput ? parseInt(customAmount) : stakeAmount;
      onVote(policy.id, selectedVote, finalAmount);
      setSelectedVote(null);
      setStakeAmount(10);
      setCustomAmount('');
      setShowCustomInput(false);
      onClose();
    }
  };

  const handleStakeAmountSelect = (amount: number) => {
    setStakeAmount(amount);
    setShowCustomInput(false);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setShowCustomInput(true);
    }
  };

  const getSelectedAmount = () => {
    return showCustomInput && customAmount ? parseInt(customAmount) : stakeAmount;
  };

  const voteOptions = [
    { 
      value: 'support' as const, 
      label: { en: 'Support (Yes)', ko: '찬성' },
      color: 'var(--green)',
      icon: 'thumbs-up'
    },
    { 
      value: 'oppose' as const, 
      label: { en: 'Oppose (No)', ko: '반대' },
      color: '#dc3545',
      icon: 'thumbs-down'
    },
    { 
      value: 'abstain' as const, 
      label: { en: 'Abstain', ko: '기권' },
      color: 'var(--text-light)',
      icon: 'minus'
    }
  ];

  const stakeAmountOptions = [10, 50, 100, 500];

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
        maxWidth: '600px',
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
            스테이킹 투표
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
        <div style={{ 
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'var(--bg-light)',
          borderRadius: '12px'
        }}>
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
            lineHeight: '1.6',
            fontSize: '14px'
          }}>
            {t(policy.description)}
          </p>
        </div>

        {/* Vote Options */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'var(--text-dark)'
          }}>
            투표 선택
          </h4>
          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {voteOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => setSelectedVote(option.value)}
                style={{
                  padding: '1rem',
                  border: `2px solid ${selectedVote === option.value ? option.color : 'var(--border-light)'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  backgroundColor: selectedVote === option.value ? `${option.color}15` : 'transparent'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: `2px solid ${selectedVote === option.value ? option.color : 'var(--border-light)'}`,
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
                      background: option.color,
                      borderRadius: '50%'
                    }} />
                  )}
                </div>
                <Icon name={option.icon} size={20} color={selectedVote === option.value ? option.color : 'var(--text-light)'} />
                <div style={{
                  fontWeight: '500',
                  color: selectedVote === option.value ? option.color : 'var(--text-dark)'
                }}>
                  {t(option.label)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stake Amount Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: 'var(--text-dark)'
          }}>
            스테이킹 금액
          </h4>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-light)',
            marginBottom: '1rem'
          }}>
            투표가 종료되면 스테이킹한 토큰을 돌려받습니다. 잔액: {userBalance} 토큰
          </p>

          {/* Preset amounts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            {stakeAmountOptions.map((amount) => (
              <button
                key={amount}
                onClick={() => handleStakeAmountSelect(amount)}
                style={{
                  padding: '0.75rem',
                  border: `2px solid ${!showCustomInput && stakeAmount === amount ? 'var(--teal)' : 'var(--border-light)'}`,
                  borderRadius: '8px',
                  background: !showCustomInput && stakeAmount === amount ? 'rgba(32, 178, 170, 0.1)' : 'transparent',
                  color: !showCustomInput && stakeAmount === amount ? 'var(--teal)' : 'var(--text-dark)',
                  fontWeight: !showCustomInput && stakeAmount === amount ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px'
                }}
              >
                {amount}
              </button>
            ))}
          </div>

          {/* Custom amount input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            border: `2px solid ${showCustomInput ? 'var(--teal)' : 'var(--border-light)'}`,
            borderRadius: '8px',
            background: showCustomInput ? 'rgba(32, 178, 170, 0.1)' : 'transparent'
          }}>
            <input
              type="number"
              placeholder="직접 입력"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '14px',
                color: 'var(--text-dark)'
              }}
              min="1"
              max={userBalance}
            />
            <span style={{
              fontSize: '12px',
              color: 'var(--text-light)',
              fontWeight: '500'
            }}>
              토큰
            </span>
          </div>
        </div>

        {/* Stake Preview */}
        <div style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(32, 178, 170, 0.05) 0%, rgba(65, 105, 225, 0.05) 100%)',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontSize: '14px', color: 'var(--text-light)' }}>스테이킹 금액:</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--teal)' }}>
              {getSelectedAmount()} 토큰
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '14px', color: 'var(--text-light)' }}>예상 리워드:</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--green)' }}>
              +{policy.reward} 포인트
            </span>
          </div>
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
            disabled={!selectedVote || getSelectedAmount() <= 0 || getSelectedAmount() > userBalance}
            style={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Icon name="lock" size={16} />
            {getSelectedAmount()} 토큰 스테이킹
          </Button>
        </div>
      </div>
    </div>
  );
};