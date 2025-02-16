# Partnr-Subscription-Task

This project implements a **subscription actions** using Solidity. Users can **subscribe and cancel** their subscriptions via a deployed smart contract.

## 🚀 Features

- **Subscribe** by paying a fixed fee
- **Cancel** a subscription and receive a refund
- **Events** to track subscription activities
- **Interact using Ethers.js**.

## Setup

### Clone the Repository
```sh
git clone https://github.com/chang96/partnr-subscription.git
cd partnr-subscription
```

### Install Dependencies
```sh
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
SEPOLIA_RPC_URL=YOUR_ALCHEMY_OR_INFURA_URL
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
CONTRACT_ADDRESS=DEPLOYED_CONTRACT_ADDRESS
```

## Deployment
To deploy the contract to a testnet (e.g., Sepolia):
```sh
npx hardhat run scripts/deploy.ts --network sepolia
```

## Interaction with the Smart Contract

Use **Ethers.js** to interact with the contract. The functions are located in `etherjs-sample.ts`.

### Available Functions (in `etherjs-sample.ts`):

- **Subscribe**: `subscribe()`
- **Cancel Subscription**: `cancelSubscription()`
- **Check Subscription Status**: `checkSubscription(userAddress)`

## Testing
Run automated tests using Hardhat:
```sh
npx hardhat test
```

## License

MIT

