# PolicyChain Client

PolicyChain: Stake tokens to participate in policy decisions, earn rewards when voting concludes.

## Live Demo

Live Site: [https://policy-chain-client.vercel.app](https://policy-chain-client.vercel.app)

## 지원하는 지갑

- MetaMask (메타마스크)
- Phantom (팬텀)
- Kaia Wallet (카이아 지갑 - 공식)
- Coinbase Wallet (코인베이스 월렛)
- Trust Wallet (트러스트 월렛)
- OKX Wallet (OKX 월렛)
- WalletConnect (월렛커넥트) - 추후 지원 예정

모든 지갑은 카이아(Kaia) 테스트넷을 지원합니다.

## 주요 기능

- 지갑 연결 (MetaMask, Phantom)
- 카이아 테스트넷 자동 연결
- 스테이킹 투표 시스템
- 토큰 회수 및 리워드 시스템
- 다국어 지원 (한국어/영어)
- 반응형 디자인

## 기술 스택

- React 18
- TypeScript
- Ethers.js
- Vercel (자동 배포)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

## 자동 배포

이 프로젝트는 `main` 브랜치에 push할 때마다 Vercel에서 자동으로 배포됩니다.

## 프로젝트 구조

```
src/
├── components/         # 재사용 가능한 컴포넌트
│   ├── common/        # 공통 컴포넌트
│   ├── layout/        # 레이아웃 컴포넌트
│   ├── policy/        # 정책 관련 컴포넌트
│   └── discussion/    # 토론 관련 컴포넌트
├── context/           # React Context
├── pages/             # 페이지 컴포넌트
├── types/             # TypeScript 타입 정의
└── utils/             # 유틸리티 함수
```

## 지갑 연결

- MetaMask: 브라우저 확장 프로그램
- Phantom: 브라우저 확장 프로그램 (EVM 지원 필요)
- 자동으로 카이아 테스트넷으로 연결됩니다

## 개발 환경

- Node.js 16+
- 지갑 확장 프로그램 설치 필요