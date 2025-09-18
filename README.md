# Chain Guard Funding

A confidential supply chain financing platform powered by blockchain technology and Fully Homomorphic Encryption (FHE).

## Features

- **Encrypted Invoice Processing**: Invoice data is encrypted using zero-knowledge proofs until financing approval
- **Supply Chain Verification**: Smart contracts verify delivery and goods authenticity
- **Blockchain Settlement**: Automated payment release through smart contracts
- **Reputation System**: Track supplier, buyer, and financier reputation scores
- **Real-time Tracking**: Monitor supply chain data and financing status

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Blockchain**: Ethereum, Wagmi, RainbowKit
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support
- **UI Components**: shadcn/ui, Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- MetaMask or compatible wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mint4machine/chain-guard-funding.git
cd chain-guard-funding
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://1rpc.io/sepolia
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

4. Start the development server:
```bash
npm run dev
```

### Smart Contract Deployment

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
└── config/             # Environment configuration

contracts/
├── ChainGuardFunding.sol    # Main smart contract
└── scripts/
    └── deploy.ts            # Deployment script
```

## Key Features

### Invoice Management
- Create encrypted invoices with FHE
- Track invoice status and payment terms
- Maintain confidentiality until approval

### Financing Workflow
- Request financing for invoices
- Automated approval process
- Secure fund release

### Supply Chain Tracking
- Submit encrypted supply chain data
- Verify delivery and quality
- Track shipments in real-time

### Reputation System
- Track supplier performance
- Monitor buyer reliability
- Assess financier credibility

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_CHAIN_ID` | Ethereum chain ID | `11155111` (Sepolia) |
| `VITE_RPC_URL` | RPC endpoint | `https://1rpc.io/sepolia` |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Required |

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
