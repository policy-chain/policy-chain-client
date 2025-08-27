export type WalletType = 'metamask' | 'phantom' | 'kaia' | 'walletconnect' | 'coinbase' | 'trust' | 'okx';

export interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectMetamask: () => Promise<void>;
  connectPhantom: () => Promise<void>;
  connectKaia: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  connectCoinbase: () => Promise<void>;
  connectTrust: () => Promise<void>;
  connectOKX: () => Promise<void>;
  disconnect: () => void;
  provider: any;
  network: string | null;
  error: string | null;
}