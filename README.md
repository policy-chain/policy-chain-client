# PolicyChain Client

블록체인 기반 정책 제안 플랫폼의 프론트엔드 애플리케이션입니다.

## 주요 기능

- 지갑 연결 (MetaMask, Phantom)
- 카이아 테스트넷 자동 연결
- 정책 투표 시스템
- 다국어 지원 (한국어/영어)
- 반응형 디자인

## 기술 스택

- React 18
- TypeScript
- Ethers.js
- Yarn

## 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn start

# 빌드
yarn build
```

## 프로젝트 구조

```
src/
├── components/         # 재사용 가능한 컴포넌트
│   ├── common/        # 공통 컴포넌트
│   ├── layout/        # 레이아웃 컴포넌트
│   └── policy/        # 정책 관련 컴포넌트
├── context/           # React Context
├── hooks/             # Custom Hooks
├── pages/             # 페이지 컴포넌트
├── styles/            # 스타일 파일
├── types/             # TypeScript 타입 정의
└── utils/             # 유틸리티 함수
```

## 지갑 연결

- MetaMask: 브라우저 확장 프로그램
- Phantom: 브라우저 확장 프로그램 (EVM 지원 필요)
- 자동으로 카이아 테스트넷으로 연결됩니다

## 개발 환경

- Node.js 16+
- Yarn
- 지갑 확장 프로그램 설치 필요