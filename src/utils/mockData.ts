import { Policy, Discussion, PointHistory, Achievement } from '../types';

export const mockPolicies: Policy[] = [
  {
    id: 1,
    title: {
      en: "Carbon Tax Implementation Act 2025",
      ko: "2025년 탄소세 도입법"
    },
    description: {
      en: "A comprehensive policy to implement a nationwide carbon tax to reduce greenhouse gas emissions and promote clean energy adoption.",
      ko: "온실가스 배출을 줄이고 청정에너지 채택을 촉진하기 위한 전국적인 탄소세 도입을 위한 종합 정책입니다."
    },
    category: "environment",
    status: "active",
    votes: { support: 847, oppose: 234, abstain: 67 },
    endDate: "2025-09-15",
    department: "환경부",
    reward: 100
  },
  {
    id: 2,
    title: {
      en: "Digital Healthcare Modernization Plan",
      ko: "디지털 의료 현대화 계획"
    },
    description: {
      en: "Strategic initiative to digitize healthcare infrastructure and improve patient care through technology integration.",
      ko: "의료 인프라를 디지털화하고 기술 통합을 통해 환자 치료를 개선하는 전략적 이니셔티브입니다."
    },
    category: "healthcare",
    status: "active",
    votes: { support: 1203, oppose: 89, abstain: 43 },
    endDate: "2025-08-30",
    department: "보건복지부",
    reward: 150
  },
  {
    id: 3,
    title: {
      en: "Small Business Support Package",
      ko: "소상공인 지원 패키지"
    },
    description: {
      en: "Financial assistance and tax incentives for small and medium enterprises affected by economic changes.",
      ko: "경제 변화로 영향받은 중소기업을 위한 금융 지원 및 세제 혜택입니다."
    },
    category: "economy",
    status: "pending",
    votes: { support: 567, oppose: 123, abstain: 34 },
    endDate: "2025-09-01",
    department: "중소벤처기업부",
    reward: 75
  },
  {
    id: 4,
    title: {
      en: "Public Transport Electrification",
      ko: "대중교통 전기화 사업"
    },
    description: {
      en: "Initiative to replace diesel buses with electric alternatives across major cities to reduce air pollution.",
      ko: "대기 오염을 줄이기 위해 주요 도시의 디젤 버스를 전기 버스로 교체하는 이니셔티브입니다."
    },
    category: "environment",
    status: "closed",
    votes: { support: 2134, oppose: 456, abstain: 123 },
    endDate: "2025-08-20",
    department: "국토교통부",
    reward: 200
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: 1,
    title: {
      en: "Carbon Tax Impact on Small Businesses",
      ko: "탄소세가 소상공인에게 미치는 영향"
    },
    category: "environment",
    author: "김민수",
    replies: 23,
    views: 156,
    lastActivity: "2시간 전",
    isHot: true
  },
  {
    id: 2,
    title: {
      en: "Digital Healthcare Privacy Concerns",
      ko: "디지털 의료의 개인정보 우려사항"
    },
    category: "healthcare",
    author: "이영희",
    replies: 45,
    views: 289,
    lastActivity: "5시간 전",
    isHot: true
  },
  {
    id: 3,
    title: {
      en: "Public Transport Accessibility",
      ko: "대중교통 접근성 개선"
    },
    category: "transport",
    author: "박준호",
    replies: 12,
    views: 87,
    lastActivity: "1일 전",
    isHot: false
  }
];

export const mockPointHistory: PointHistory[] = [
  {
    action: { en: "Voted on Carbon Tax Policy", ko: "탄소세 정책 투표" },
    points: 100,
    date: "2025-08-25"
  },
  {
    action: { en: "Policy Proposal Submitted", ko: "정책 제안 제출" },
    points: 200,
    date: "2025-08-24"
  },
  {
    action: { en: "Community Discussion", ko: "커뮤니티 토론 참여" },
    points: 50,
    date: "2025-08-23"
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 1,
    name: { en: "First Vote", ko: "첫 투표" },
    description: { en: "Cast your first vote", ko: "첫 번째 투표 참여" },
    icon: "VOTE",
    unlocked: true
  },
  {
    id: 2,
    name: { en: "Policy Creator", ko: "정책 제안자" },
    description: { en: "Submit your first policy", ko: "첫 번째 정책 제안" },
    icon: "IDEA",
    unlocked: true
  },
  {
    id: 3,
    name: { en: "Discussion Leader", ko: "토론 리더" },
    description: { en: "Start 10 discussions", ko: "10개 토론 시작" },
    icon: "CROWN",
    unlocked: false
  }
];