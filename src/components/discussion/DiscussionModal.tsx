import React, { useState } from 'react';
import { Policy, Discussion } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Icon } from '../common/Icon';
import { Button } from '../common/Button';

interface DiscussionModalProps {
  policy?: Policy;
  discussion?: Discussion;
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

export const DiscussionModal: React.FC<DiscussionModalProps> = ({
  policy,
  discussion,
  isOpen,
  onClose
}) => {
  const { t } = useLanguage();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: '김민수',
      content: policy ? 
        '이 정책이 소상공인에게 미칠 영향을 더 자세히 검토해야 할 것 같습니다. 추가적인 지원 방안도 함께 고려해보면 좋겠네요.' :
        '정말 중요한 주제네요. 더 많은 사람들이 이 문제에 관심을 가졌으면 좋겠습니다.',
      timestamp: '2시간 전',
      replies: []
    },
    {
      id: 2,
      author: '이영희',
      content: policy ?
        '찬성합니다. 장기적으로 보면 환경과 경제 모두에게 도움이 될 것 같아요.' :
        '실제 경험을 바탕으로 말씀드리면, 이런 정책 변화가 정말 필요한 시점인 것 같습니다.',
      timestamp: '1시간 전',
      replies: [
        {
          id: 21,
          author: '박준호',
          content: '좋은 의견이네요. 구체적인 실행 계획은 어떻게 생각하시나요?',
          timestamp: '30분 전'
        }
      ]
    }
  ]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: '나',
      content: newComment,
      timestamp: '방금 전',
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const title = policy ? t(policy.title) : discussion ? t(discussion.title) : '';
  const description = policy ? t(policy.description) : '';

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
        maxWidth: '800px',
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
            alignItems: 'start',
            marginBottom: '1rem'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              margin: 0,
              flex: 1
            }}>
              {title}
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
                transition: 'all 0.3s ease',
                marginLeft: '1rem'
              }}
            >
              <Icon name="x" size={20} />
            </button>
          </div>
          {description && (
            <p style={{
              color: 'var(--text-light)',
              marginBottom: '1rem',
              lineHeight: 1.6
            }}>
              {description}
            </p>
          )}
        </div>

        {/* Comments Section */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem 2rem'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: 'var(--text-dark)'
          }}>
            {t({ en: `Comments (${comments.length})`, ko: `댓글 (${comments.length})` })}
          </h3>

          {comments.map(comment => (
            <div key={comment.id} style={{
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--gradient-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {comment.author[0]}
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>
                    {comment.author}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                    {comment.timestamp}
                  </div>
                </div>
              </div>
              <div style={{
                marginLeft: '48px',
                padding: '12px 16px',
                background: 'var(--bg-light)',
                borderRadius: '12px',
                lineHeight: 1.5
              }}>
                {comment.content}
              </div>
              
              {/* Replies */}
              {comment.replies && comment.replies.map(reply => (
                <div key={reply.id} style={{
                  marginLeft: '48px',
                  marginTop: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '0.5rem'
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
                      fontWeight: '600',
                      fontSize: '12px'
                    }}>
                      {reply.author[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>
                        {reply.author}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        {reply.timestamp}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    marginLeft: '44px',
                    padding: '10px 14px',
                    background: 'rgba(65, 105, 225, 0.05)',
                    borderRadius: '10px',
                    fontSize: '14px',
                    lineHeight: 1.5
                  }}>
                    {reply.content}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div style={{
          padding: '1rem 2rem 2rem 2rem',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'end'
          }}>
            <div style={{ flex: 1 }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t({ en: 'Share your thoughts...', ko: '의견을 남겨주세요...' })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid var(--border-light)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  resize: 'vertical',
                  minHeight: '80px',
                  fontFamily: 'inherit'
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
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              style={{
                background: newComment.trim() ? 'var(--gradient-teal)' : '#ccc',
                color: 'white',
                border: 'none',
                minWidth: '100px'
              }}
            >
              {t({ en: 'Post', ko: '등록' })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};