export interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectMetamask: () => Promise<void>;
  connectPhantom: () => Promise<void>;
  disconnect: () => void;
  provider: any;
  network: string | null;
  error: string | null;
}