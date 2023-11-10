# FlashLoanBlockchainApp

## Introduction 
The application presented, FlashLoanSwap proposes an innovative system for cryptocurrency arbitrage using a decentralized application called AAVE and a transaction type called FlashLoan. The application will allow the end user to borrow tokens from AAVE and employ them in arbitrage transactions between two Decentralized Exchanges to make a profit. All this is done in a single transaction making the operation truly secure. If something goes wrong the entire transaction is not written to the blockchain, as if it never happened.
The application presented was created purely for academic purposes. In fact, arbitrage takes place between two exchanges created by me and slightly simplified compared to traditional Decentralized exchanges. The end user will then be able to interact with them through the application.

## Logic 
FlashSwap Dapp enables users to borrow tokens from the AAVE pool for arbitrage operations between Sushiswap and Uniswap. This is accomplished in a single, atomic transaction. Users can choose from various arbitrage opportunities, with the system calculating potential profitability based on price differences between exchanges. Users specify the borrowed amount, execute a flash loan transaction, and the app automatically returns the tokens to the Aave pool for withdrawal. Additionally, the demo allows users to interact with connected Decentralized Exchanges, creating new pools, exchanging tokens, and adding liquidity to pairs.

## Use Cases

### FlashLoan Application
• **Login**: The system must allow the user to login into the system with a web3
provider.
14
• **Select Token Pair**: The system must allow the user to select the tokens pairs
that want to trade.
• **Approve tokens**: The system must allow the user to approve the amount of
token that the smart contract have to use for the user.
• **Execute FlashLoan**: The system must execute for the user a flashloan with
the value and token pairs selected.
• **Withdraw**: The system must allow the user to withdraw his funds after the
operations executed

### Decentralized Application 


• **Login**: The system must allow the user to login into the system.
• **Create Token Pair**: The system must allow the user to create a token pair
pool.
• **Approve tokens**: The system must allow the user to approve the amount of
token that the smart contract have to use for the user.
• **Deposit Liquidity**: The system must allow the user to Deposit liquidity into
a pool .
• **Swap tokens** : The system allow the user to swap a tokanA from a tokenB
taking tokens from the corresponding pool.


## Technologies

1. Metamask.io is a browser extension that securely manages Ethereum-based tokens and Dapps, serving as a bridge between the Ethereum blockchain and the user's browser. It facilitates transactions in the FlashLoan Dapp platform.

2. React is a JavaScript library for building user interfaces, making it easy to create complex interfaces with minimal code. It promotes reusable components and has a supportive developer community.

3. The CSS-HTML-Javascript paradigm combines HTML for content structure, CSS for styling, and Javascript for interactivity, enabling the creation of powerful and responsive websites.

4. Web3.js is a set of libraries allowing interaction with Ethereum nodes through HTTP, IPC, or WebSocket connections. It provides an API for working with smart contracts and the blockchain, making it convenient for developers to build decentralized applications

## Application 

### FlashSwap Application
The FlashSwap page is designed for user convenience. The main section includes a header for logging in via Metamask and navigating the app. On the left, users can view calculated arbitrage options. The app fetches data from decentralized exchange smart contracts, identifying profitable opportunities. Users select the best option, saving settings for future trades. On the right, React components (cards) handle actions such as token approval and flash loans. The workflow involves choosing a trade on the left, approving token delegation on the right, and executing the trade by specifying the borrowed amount. The wallet section displays the user's balance.

### Decentralized Exchange Application

These two sections of the application provide access to the decentralized exchanges Uniswap and SushiSwap. It initially consists of a header where the user can login via metamusk and browse the other pages that make up the application. We created a React component for each functionality of the decentralized exchanges. One to approve tokens, one to swap ,one to deposit funds and one to create the pool.
