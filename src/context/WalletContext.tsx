import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletContextType } from '../types/wallet';
import { switchToKaiaTestnet, getNetworkName, isMetamaskInstalled, isPhantomInstalled } from '../utils/wallet';

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

  const checkConnection = useCallback(async () => {
    if (!isMetamaskInstalled()) return;
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        setAddress(accounts[0]);
        setIsConnected(true);
        await updateNetworkInfo(provider);
        
        // 네트워크가 카이아 테스트넷이 아니면 전환 시도
        const network = await provider.getNetwork();
        if (network.chainId !== BigInt(1001)) {
          await switchToKaiaTestnet();
        }
      }
    } catch (error) {
      console.error('지갑 연결 확인 실패:', error);
    }
  }, [updateNetworkInfo]);

  useEffect(() => {
    checkConnection();
    
    // 계정 변경 감지
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setAddress(accounts[0]);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [checkConnection]);

  const connectMetamask = async () => {
    if (!isMetamaskInstalled()) {
      setError('메타마스크가 설치되어 있지 않습니다.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      await switchToKaiaTestnet();
      await updateNetworkInfo(provider);
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
    } catch (error: any) {
      console.error('메타마스크 연결 실패:', error);
      setError(error.message || '메타마스크 연결에 실패했습니다.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantom = async () => {
    if (!isPhantomInstalled()) {
      setError('팬텀 지갑이 설치되어 있지 않습니다.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await window.phantom!.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.phantom!.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      await switchToKaiaTestnet();
      await updateNetworkInfo(provider);
      
      setProvider(provider);
      setAddress(address);
      setIsConnected(true);
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
  };

  const value = {
    address,
    isConnected,
    isConnecting,
    connectMetamask,
    connectPhantom,
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