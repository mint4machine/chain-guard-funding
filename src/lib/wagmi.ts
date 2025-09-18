import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';
import { http } from 'viem';
import { config as envConfig } from '../config/env';

export const config = getDefaultConfig({
  appName: 'Chain Guard Funding',
  projectId: envConfig.walletConnectProjectId,
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(envConfig.rpcUrl),
    [mainnet.id]: http(),
  },
  ssr: false,
});
