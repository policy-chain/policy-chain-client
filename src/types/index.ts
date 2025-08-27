export interface Policy {
  id: number;
  title: {
    en: string;
    ko: string;
  };
  description: {
    en: string;
    ko: string;
  };
  category: string;
  status: 'active' | 'pending' | 'closed';
  votes: {
    support: number;
    oppose: number;
    abstain: number;
  };
  endDate: string;
  department: string;
  reward: number;
}

export interface Discussion {
  id: number;
  title: {
    en: string;
    ko: string;
  };
  category: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  isHot: boolean;
}

export interface PointHistory {
  action: {
    en: string;
    ko: string;
  };
  points: number;
  date: string;
}

export interface Achievement {
  id: number;
  name: {
    en: string;
    ko: string;
  };
  description: {
    en: string;
    ko: string;
  };
  icon: string;
  unlocked: boolean;
}

export type Language = 'en' | 'ko';
export type Section = 'dashboard' | 'policies' | 'community' | 'rewards';
export type VoteType = 'support' | 'oppose' | 'abstain';