# NFT ERC721 Smart Contract Deployment on Ethereum Sepolia

This repository contains a project for creating and deploying an ERC721 NFT smart contract on the Ethereum Sepolia network. The project includes a smart contract with a limited token supply, a basic frontend website for minting NFTs, and automatic contract verification on Etherscan.

## Features

- Deploys an ERC721 Smart Contract on Ethereum Sepolia network
- Token supply: 10
- Mint price: 0.01 ETH
- Maximum tokens allowed per wallet: 2
- Token URI and Symbol: A screenshot from the game Senua's Saga: Hellblade 2
- NFT image in PNG format stored using [NFT.Storage](https://app.nft.storage/)
- Basic frontend website built with Next.js for minting NFTs
- Hosted on firebase
- Automatic contract verification and publishing on Etherscan

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MetaMask or another Ethereum wallet
- Sepolia test network access and Sepolia ETH for gas fees

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Configuration

1. Set up your environment variables by creating a `.env` file in the root directory:
    ```env
    RPC_URL=obtained from alchemy
    PRIVATE_KEY=your_private_key
    ETHERSCAN_API_KEY=your_etherscan_api_key
    COINMARKETCAP_API_KEY=used for gas coverage fee converted to currency
    ```

2. Update the smart contract with your desired configurations (if needed).

### Deployment

1. Compile the smart contract:
    ```sh
    npx hardhat compile
    ```

2. Deploy the smart contract to the Sepolia network:
    ```sh
    npx hardhat run iginition/modules/deploy.js --network sepolia
    ```
3. Test the smart contract on hardhat local node:
   ```sh
    npx hardhat test
    ```



### Frontend Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

3. Run the Next.js development server:
    ```sh
    npm run dev
    ```
    or
    ```sh
    yarn dev
    ```

4. Open your browser and navigate to `http://localhost:3000` to view the minting website.

## Usage

- Connect your Ethereum wallet (e.g., MetaMask) to the Sepolia network.
- Use the frontend website to mint NFTs from the deployed smart contract.
- Each wallet can mint a maximum of 2 NFTs at a price of 0.01 ETH each.

##Output
- Verified Contract: [Etherscan](https://sepolia.etherscan.io/address/0xa94a3cD6E5CE80b3EA981083E7E3A284f306d00b#code)
- Token(NFT): [OpenSea](https://testnets.opensea.io/collection/nobin-s-token)
- Minting site: [Firebase](https://basic-nft-minting.web.app/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [NFT.Storage](https://nft.storage/)
- [Hardhat](https://hardhat.org/)
- [Next.js](https://nextjs.org/)
- [Ethers.js](https://docs.ethers.io/v5/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Feel free to customize this `README.md` further based on your specific project details and requirements.
