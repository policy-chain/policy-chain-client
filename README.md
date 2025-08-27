# PolicyChain Client
A decentralized platform where citizens can stake tokens to participate in policy decisions and earn rewards based on voting outcomes. Built for democratic participation through blockchain technology.

## Live Demo
**Live Site**: [https://www.policychain.kr](https://www.policychain.kr)

## Overview
PolicyChain enables democratic participation through a token-staking mechanism where users:
- Stake tokens on policy proposals they believe in
- Vote for support, opposition, or abstention
- Earn rewards when voting concludes based on participation and outcomes
- Build reputation through consistent civic engagement

## Supported Wallets
- **MetaMask** - Browser extension wallet
- **Phantom** - Multi-chain wallet with EVM support
- **Kaia Wallet** - Official Kaia blockchain wallet
- **Coinbase Wallet** - Self-custody wallet
- **Trust Wallet** - Mobile-first wallet
- **OKX Wallet** - Multi-chain wallet
- **WalletConnect** - Universal wallet connection (coming soon)

All wallets connect to the Kaia testnet automatically.

## Key Features
### Core Functionality
- **Wallet Integration**: Seamless connection with multiple wallet providers
- **Automatic Network Setup**: Auto-connects to Kaia testnet
- **Staking System**: Token-based voting with economic incentives
- **Reward Distribution**: Automated rewards based on participation and outcomes
- **Multi-language Support**: Korean and English interface
- **Responsive Design**: Optimized for desktop and mobile

### User Experience
- **Dashboard**: Overview of active policies and user stats
- **Policy Voting**: Browse and participate in policy decisions
- **Community**: Discussion forums for policy debate
- **Rewards**: Track earnings and claim rewards
- **My Page**: Personal voting history and stake management

## Technology Stack
- **Frontend**: React 18 with TypeScript
- **Blockchain**: Ethers.js for Web3 integration
- **Styling**: CSS3 with responsive design
- **Deployment**: Vercel with automatic CI/CD
- **Network**: Kaia blockchain testnet

## Installation and Development
### Prerequisites
- Node.js 16 or higher
- Wallet browser extension (MetaMask, Phantom, etc.)

### Setup
```bash
# Clone the repository
git clone [repository-url]
cd policy-chain-client

# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start

# Build for production
npm run build
# or
yarn build
```

The application will be available at `http://localhost:3000`

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (buttons, inputs, etc.)
│   ├── layout/         # Layout components (header, navigation)
│   ├── policy/         # Policy-specific components
│   └── discussion/     # Community discussion components
├── context/            # React Context providers
│   ├── WalletContext.tsx    # Wallet connection and state
│   └── LanguageContext.tsx  # Internationalization
├── pages/              # Main application pages
│   ├── Dashboard.tsx        # Overview and statistics
│   ├── Policies.tsx         # Policy voting interface
│   ├── Community.tsx        # Discussion forums
│   ├── Rewards.tsx          # Reward tracking and claiming
│   └── MyPage.tsx          # User profile and history
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── styles/             # Global CSS styles
```

## Configuration
### Wallet Setup
The application automatically configures supported wallets to connect to the Kaia testnet. Users need to:
1. Install a supported wallet extension
2. Create or import a wallet
3. Connect to the PolicyChain application
4. Approve the Kaia testnet addition if prompted

### Environment Variables
No additional environment variables are required for basic functionality.

## Deployment
### Automatic Deployment
This project uses Vercel for continuous deployment:
- Pushes to `main` branch automatically deploy to production
- Pull requests generate preview deployments
- Build configuration is handled by `vercel.json`

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to your preferred hosting platform
# (The build folder contains the static files)
```

## Smart Contract Integration
The application integrates with smart contracts on the Kaia blockchain for:
- Token staking and management
- Vote recording and validation
- Reward calculation and distribution
- Policy lifecycle management

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Ensure wallet compatibility across providers
- Test thoroughly on Kaia testnet
- Update documentation for new features

## Support
For technical support or questions:
- Check the live demo for current functionality
- Review the codebase for implementation details
- Test features on the Kaia testnet

## License
This project is part of a hackathon submission and is provided for educational and demonstration purposes.
