# 🔗 Chain Guard Funding

> **Revolutionary Supply Chain Finance with Zero-Knowledge Privacy**

Transform your supply chain financing with cutting-edge blockchain technology. Chain Guard Funding ensures complete data privacy while enabling seamless financial transactions across global supply networks.

## ✨ Core Innovations

- **🔐 Zero-Knowledge Invoice Processing**: Your sensitive financial data remains encrypted until approval
- **📦 Smart Supply Chain Verification**: AI-powered delivery confirmation and quality assurance
- **⚡ Instant Blockchain Settlement**: Automated payments with immutable transaction records
- **🏆 Dynamic Reputation Scoring**: Real-time assessment of all network participants
- **📊 Live Supply Chain Monitoring**: Track every shipment with complete transparency

## 🛠️ Advanced Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Blockchain**: Ethereum Sepolia, Wagmi, RainbowKit
- **Privacy**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with Zama FHE integration
- **UI/UX**: shadcn/ui, Radix UI, Lucide Icons

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
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
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
