// 카이아 테스트넷 네트워크 설정
export const KAIA_TESTNET = {
  chainId: '0x3e9', // 1001 in hex
  chainName: 'Kaia Testnet',
  nativeCurrency: {
    name: 'KLAY',
    symbol: 'KLAY',
    decimals: 18
  },
  rpcUrls: ['https://public-en.node.kaia.io:8651'],
  blockExplorerUrls: ['https://baobab.klaytnscope.com/']
};

export const WALLET_TYPES = {
  METAMASK: 'MetaMask',
  PHANTOM: 'Phantom'
} as const;

export const SECTIONS = {
  DASHBOARD: 'dashboard',
  POLICIES: 'policies', 
  COMMUNITY: 'community',
  REWARDS: 'rewards'
} as const;

export const POLICY_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  CLOSED: 'closed'
} as const;

export const VOTE_TYPES = {
  SUPPORT: 'support',
  OPPOSE: 'oppose',
  ABSTAIN: 'abstain'
} as const;