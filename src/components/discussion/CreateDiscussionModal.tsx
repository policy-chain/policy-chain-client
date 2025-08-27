import React, { useState } from 'react';
import { Icon } from '../common/Icon';

interface CreateDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (discussionData: {
    title: string;
    category: string;
    content: string;
  }) => void;
}

export const CreateDiscussionModal: React.FC<CreateDiscussionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [content, setContent] = useState('');

  const categories = [
    { value: 'general', label: '일반' },
    { value: 'economy', label: '경제' },
    { value: 'environment', label: '환경' },
    { value: 'healthcare', label: '의료' },
    { value: 'technology', label: '기술' },
    { value: 'education', label: '교육' }
  ];

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    onSubmit({
      title,
      category,
      content
    });

    // 폼 초기화
    setTitle('');
    setCategory('general');
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

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
      zIndex: 2000,
      padding: '2rem'
    }}>
      <div style={{
        background: 'var(--bg-white)',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem 2rem 1rem 2rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              margin: 0
            }}>
              새 토론 시작
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
        </div>

        {/* Form */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem'
        }}>
          {/* 제목 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--text-dark)'
            }}>
              토론 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="토론 주제를 입력하세요..."
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid var(--border-light)',
                borderRadius: '12px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                background: 'var(--bg-white)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--teal)';
                e.target.style.boxShadow = '0 0 0 3px rgba(32, 178, 170, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-light)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* 카테고리 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--text-dark)'
            }}>
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid var(--border-light)',
                borderRadius: '12px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                background: 'var(--bg-white)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--teal)';
                e.target.style.boxShadow = '0 0 0 3px rgba(32, 178, 170, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-light)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* 내용 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--text-dark)'
            }}>
              토론 내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="토론하고 싶은 내용을 자세히 작성해주세요..."
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid var(--border-light)',
                borderRadius: '12px',
                fontSize: '16px',
                resize: 'vertical',
                minHeight: '120px',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                background: 'var(--bg-white)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--teal)';
                e.target.style.boxShadow = '0 0 0 3px rgba(32, 178, 170, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-light)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 2rem 2rem 2rem',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '2px solid var(--border-light)',
                borderRadius: '12px',
                background: 'transparent',
                color: 'var(--text-light)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim()}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '12px',
                background: (!title.trim() || !content.trim()) ? '#ccc' : 'var(--gradient-teal)',
                color: 'white',
                fontWeight: '600',
                cursor: (!title.trim() || !content.trim()) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Icon name="discuss" size={16} />
              토론 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};