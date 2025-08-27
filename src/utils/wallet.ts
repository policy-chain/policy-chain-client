import { KAIA_TESTNET } from './constants';

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const isMetamaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.ethereum !== 'undefined' && 
         window.ethereum.isMetaMask;
};

export const isPhantomInstalled = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.phantom?.ethereum !== 'undefined';
};

export const switchToKaiaTestnet = async (provider?: any): Promise<void> => {
  const targetProvider = provider || window.ethereum;
  if (!targetProvider) throw new Error('지갑이 설치되어 있지 않습니다');
  
  try {
    await targetProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: KAIA_TESTNET.chainId }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      await targetProvider.request({
        method: 'wallet_addEthereumChain',
        params: [KAIA_TESTNET],
      });
    } else {
      throw switchError;
    }
  }
};

export const getNetworkName = (chainId: number): string => {
  switch (chainId) {
    case 1001:
      return 'Kaia Testnet';
    case 1:
      return 'Ethereum Mainnet';
    case 5:
      return 'Goerli Testnet';
    default:
      return `Unknown (${chainId})`;
  }
};

// Window 객체 타입 확장
declare global {
  interface Window {
    ethereum?: any;
    phantom?: {
      ethereum?: any;
    };
  }
}