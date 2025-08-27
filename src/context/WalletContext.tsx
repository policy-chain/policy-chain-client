import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletContextType, WalletType } from '../types/wallet';
import { 
  switchToKaiaTestnet, 
  getNetworkName, 
  isMetamaskInstalled, 
  isPhantomInstalled,
  isKaiaInstalled,
  isCoinbaseInstalled,
  isTrustInstalled,
  isOKXInstalled
} from '../utils/wallet';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [network, setNetwork] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateNetworkInfo = useCallback(async (provider: ethers.BrowserProvider) => {
    try {
      const network = await provider.getNetwork();
      setNetwork(getNetworkName(Number(network.chainId)));
    } catch (error) {
      console.error('네트워크 정보 가져오기 실패:', error);
    }
  }, []);

  // 연결 상태 localStorage에 저장
  const saveConnectionState = useCallback((address: string, walletType: string) => {
    localStorage.setItem('walletConnected', 'true');
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('walletType', walletType);
  }, []);

  // 연결 상태 localStorage에서 제거
  const clearConnectionState = useCallback(() => {
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletType');
  }, []);

  // 페이지 로드시 이전 연결 상태 복원
  const restoreConnection = useCallback(async () => {
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    const savedAddress = localStorage.getItem('walletAddress');
    const walletType = localStorage.getItem('walletType') as WalletType;
    
    if (wasConnected && savedAddress && walletType) {
      try {
        let targetProvider;
        
        switch (walletType) {
          case 'metamask':
            if (isMetamaskInstalled()) {
              targetProvider = window.ethereum.providers?.find((provider: any) => provider.isMetaMask) || window.ethereum;
            }
            break;
          case 'phantom':
            if (isPhantomInstalled()) {
              targetProvider = window.phantom!.ethereum;
            }
            break;
          case 'kaia':
            if (isKaiaInstalled()) {
              targetProvider = window.kaia;
            }
            break;
          case 'coinbase':
            if (isCoinbaseInstalled()) {
              targetProvider = window.ethereum.providers?.find((provider: any) => provider.isCoinbaseWallet) || window.ethereum;
            }
            break;
          case 'trust':
            if (isTrustInstalled()) {
              targetProvider = window.ethereum.providers?.find((provider: any) => provider.isTrust) || window.ethereum;
            }
            break;
          case 'okx':
            if (isOKXInstalled()) {
              targetProvider = window.okxwallet;
            }
            break;
        }
        
        if (targetProvider) {
          // 현재 연결된 계정 확인
          const accounts = await targetProvider.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0 && accounts[0].toLowerCase() === savedAddress.toLowerCase()) {
            const provider = new ethers.BrowserProvider(targetProvider);
            await updateNetworkInfo(provider);
            
            setProvider(provider);
            setAddress(accounts[0]);
            setIsConnected(true);
            
            console.log(`${walletType} 지갑 연결 복원 완료:`, accounts[0]);
          } else {
            // 저장된 주소와 다르면 연결 상태 초기화
            clearConnectionState();
          }
        }
      } catch (error) {
        console.error('지갑 연결 복원 실패:', error);
        clearConnectionState();
      }
    }
  }, [updateNetworkInfo, clearConnectionState]);

  useEffect(() => {
    // 페이지 로드시 이전 연결 상태 복원
    restoreConnection();
  }, [restoreConnection]);

  useEffect(() => {
    // 지갑 이벤트 리스너 설정
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // disconnect 함수를 직접 호출하지 않고 상태를 직접 초기화
          setAddress(null);
          setProvider(null);
          setIsConnected(false);
          setNetwork(null);
          setError(null);
          clearConnectionState();
        } else if (isConnected) {
          setAddress(accounts[0]);
          // 계정 변경시 저장된 주소도 업데이트
          const walletType = localStorage.getItem('walletType');
          if (walletType) {
            saveConnectionState(accounts[0], walletType);
          }
        }
      };

      const handleChainChanged = () => {
        // 연결된 상태에서만 페이지 새로고침
        if (isConnected) {
          window.location.reload();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isConnected, saveConnectionState, clearConnectionState]);

  const connectMetamask = async () => {
    if (!isMetamaskInstalled()) {
      // MetaMask 설치 페이지로 리다이렉트
      window.open('https://metamask.io/download/', '_blank');
      setError('MetaMask를 먼저 설치해주세요.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // MetaMask 전용 provider를 직접 사용
      const metamaskProvider = window.ethereum.providers?.find((provider: any) => provider.isMetaMask) || window.ethereum;
      
      await metamaskProvider.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(metamaskProvider);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      await switchToKaiaTestnet(metamaskProvider);
      await updateNetworkInfo(provider);
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
      
      // 연결 상태를 localStorage에 저장
      saveConnectionState(address, 'metamask');
      
      console.log('메타마스크 연결 성공:', address);
    } catch (error: any) {
      console.error('메타마스크 연결 실패:', error);
      setError(error.message || '메타마스크 연결에 실패했습니다.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantom = async () => {
    if (!isPhantomInstalled()) {
      // Phantom 설치 페이지로 리다이렉트
      window.open('https://phantom.app/', '_blank');
      setError('Phantom 지갑을 먼저 설치해주세요.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await window.phantom!.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.phantom!.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      await switchToKaiaTestnet(window.phantom!.ethereum);
      await updateNetworkInfo(provider);
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
      
      // 연결 상태를 localStorage에 저장
      saveConnectionState(address, 'phantom');
      
      console.log('팬텀 지갑 연결 성공:', address);
    } catch (error: any) {
      console.error('팬텀 연결 실패:', error);
      setError(error.message || '팬텀 지갑 연결에 실패했습니다.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setProvider(null);
    setIsConnected(false);
    setNetwork(null);
    setError(null);
    
    // localStorage에서 연결 상태 제거
    clearConnectionState();
    
    console.log('지갑 연결 해제');
  };

  const connectKaia = async () => {
    if (!isKaiaInstalled()) {
      // Kaia Wallet 설치 페이지로 리다이렉트
      window.open('https://www.kaiawallet.io/ko_KR/', '_blank');
      setError('Kaia Wallet을 먼저 설치해주세요.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await window.kaia.enable();
      const provider = new ethers.BrowserProvider(window.kaia);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      await switchToKaiaTestnet(window.kaia);
      await updateNetworkInfo(provider);
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
      
      saveConnectionState(address, 'kaia');
      
      console.log('Kaia Wallet 연결 성공:', address);
    } catch (error: any) {
      console.error('Kaia Wallet 연결 실패:', error);
      setError(error.message || 'Kaia Wallet 연결에 실패했습니다.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    // WalletConnect 설치 가이드로 리다이렉트
    window.open('https://userguide.dcentwallet.com/kr/native-service/dapp-browser/using-wallet-connect', '_blank');
    setError('WalletConnect를 지원하는 모바일 지갑을 사용해주세요. (예: D\'CENT Wallet)');
  };

  const connectCoinbase = async () => {
    if (!isCoinbaseInstalled()) {
      // Coinbase Wallet 설치 페이지로 리다이렉트
      window.open('https://www.coinbase.com/wallet', '_blank');
      setError('Coinbase Wallet을 먼저 설치해주세요.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const coinbaseProvider = window.ethereum.providers?.find((provider: any) => provider.isCoinbaseWallet) || window.ethereum;
      
      await coinbaseProvider.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(coinbaseProvider);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      await switchToKaiaTestnet(coinbaseProvider);
      await updateNetworkInfo(provider);
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
      
      saveConnectionState(address, 'coinbase');
      
      console.log('Coinbase Wallet 연결 성공:', address);
    } catch (error: any) {
      console.error('Coinbase 연결 실패:', error);
      setError(error.message || 'Coinbase Wallet 연결에 실패했습니다.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectTrust = async () => {
    if (!isTrustInstalled()) {
      // Trust Wallet 설치 페이지로 리다이렉트
      window.open('https://trustwallet.com/', '_blank');
      setError('Trust Wallet을 먼저 설치해주세요.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const trustProvider = window.ethereum.providers?.find((provider: any) => provider.isTrust) || window.ethereum;
      
      await trustProvider.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(trustProvider);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      await switchToKaiaTestnet(trustProvider);
      await updateNetworkInfo(provider);
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
      
      saveConnectionState(address, 'trust');
      
      console.log('Trust Wallet 연결 성공:', address);
    } catch (error: any) {
      console.error('Trust Wallet 연결 실패:', error);
      setError(error.message || 'Trust Wallet 연결에 실패했습니다.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectOKX = async () => {
    if (!isOKXInstalled()) {
      // OKX Wallet 설치 페이지로 리다이렉트
      window.open('https://web3.okx.com/download', '_blank');
      setError('OKX Wallet을 먼저 설치해주세요.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await window.okxwallet.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.okxwallet);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      await switchToKaiaTestnet(window.okxwallet);
      await updateNetworkInfo(provider);
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
      
      saveConnectionState(address, 'okx');
      
      console.log('OKX Wallet 연결 성공:', address);
    } catch (error: any) {
      console.error('OKX Wallet 연결 실패:', error);
      setError(error.message || 'OKX Wallet 연결에 실패했습니다.');
    } finally {
      setIsConnecting(false);
    }
  };

  const value = {
    address,
    isConnected,
    isConnecting,
    connectMetamask,
    connectPhantom,
    connectKaia,
    connectWalletConnect,
    connectCoinbase,
    connectTrust,
    connectOKX,
    disconnect,
    provider,
    network,
    error
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet은 WalletProvider 내에서 사용되어야 합니다');
  }
  return context;
};