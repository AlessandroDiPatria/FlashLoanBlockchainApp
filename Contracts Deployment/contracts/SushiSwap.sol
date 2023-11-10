// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";


// Define IERC20 Library

contract Dex {
    address payable public owner;
    // Stable Coin
    address private immutable usdcAddress = 0x65aFADD39029741B3b8f0756952C74678c9cEC93;
    address private immutable tetherAddress = 0x2E8D98fd126a32362F2Bd8aA427E59a1ec63F780;

    // inizialize tokenAddress  
    IERC20 private usdc;
  
    IERC20 private tether;

    // Given two tokens tells the price ratio  between them 
    mapping(address => mapping(address => uint256)) public poolPairs; 
    /// Given address of user and the tokens gives the amount
    mapping(address => mapping(address => uint256)) public reserves;


    constructor() {
        owner = payable(msg.sender);
        // inizialize token contracts 
        usdc = IERC20(usdcAddress);
        tether = IERC20(tetherAddress);
        // Creation of first Pools with its values 
        //USDT token
 
    }


event CreatePair(address tokenA, address tokenB);
event LiquidityDeposited(address tokenA,address tokenB, uint256 amountA);
event AddReserve(address tokenA,address tokenB,uint256 amount);

// Create tokens pair
function createPair(address tokenA, address tokenB,uint256 values) external {
        require(values > 0 , "UNISWAP V3 : Amount Error : Must be > 0 ");
        require(tokenA == usdcAddress || tokenA == tetherAddress,"UNISWAP V2 : TokenError : First StableCoins");
        
        poolPairs[tokenA][tokenB] = values;
        poolPairs[tokenB][tokenA] = values; 
        require(tokenA != tokenB, "UNISWAP V3 : TokenError : Same Tokens");
        emit CreatePair(tokenA,tokenB);
}


// Add liquidity to existed pool 
function depositLiquidity(address tokenA, address tokenB, uint256 amountA) external {
    require(tokenA != tokenB,  "UNISWAP V3 : TokenError : Same Tokens");
    require(tokenA == usdcAddress || tokenA == tetherAddress,"UNISWAP V2 : TokenError : First StableCoins");
    require(amountA > 0 ,  "UNISWAP V3 : TokenError :Overflow");
    IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
    IERC20(tokenB).transferFrom(msg.sender, address(this), amountA * poolPairs[tokenA][tokenB]*(10**12)/100);
    addReserve(tokenA,tokenB,amountA);
    emit LiquidityDeposited(tokenA,tokenB,amountA);
}


// internal function called by deposit liquidity
function addReserve(address tokenA, address tokenB,uint256 amountA ) internal {  
    reserves[tokenA][tokenB] += amountA;
    reserves[tokenB][tokenA] += amountA * poolPairs[tokenA][tokenB]*(10**12)/100 ;
    emit AddReserve(tokenA, tokenB, amountA);
}

// return the price of the pool 
function getPricePool(address token1,address token2) external view returns (uint256){
    return poolPairs[token1][token2];
}
// return the reserve of a pool 
function getPoolReserves(address token1,address token2 ) external view returns (uint256,uint256){
    return (reserves[token1][token2],reserves[token2][token1]);
}


// Swap Stable coins to Coin  
function swapStableToCoin(address buyToken, address sellToken, uint256 amount) external {
    require(sellToken == usdcAddress || sellToken == tetherAddress,"UNISWAP: NO STABLECOINS DETECTED");
    require(buyToken != sellToken,  "UNISWAP V3 : TokenError : Same Tokens");
    require(amount > 0 ,  "UNISWAP V3 : TokenError :Overflow");
    IERC20(sellToken).transferFrom(msg.sender, address(this), amount);
    uint256 tokenToReceive = amount * poolPairs[buyToken][sellToken]*(10**12)/100;
    require(tokenToReceive < reserves[buyToken][sellToken],"UNISWAP : UNDERFLOW"); 
    reserves[buyToken][sellToken] -= tokenToReceive; 
    reserves[sellToken][buyToken] += amount;  
    IERC20(buyToken).transfer(msg.sender, tokenToReceive); 
}
// Swap coins to stable coin
function swapCoinsToStable(address buyToken, address sellToken, uint256 amount) external {
    require(buyToken == usdcAddress || buyToken == tetherAddress,"UNISWAP: NO STABLECOINS DETECTED");
    require(buyToken != sellToken,  "UNISWAP V3 : TokenError : Same Tokens");
    require(amount > 0 ,  "UNISWAP V3 : TokenError :Overflow");
    require(amount < reserves[sellToken][buyToken],"UNISWAP : NOT ALLOWED  ");
    IERC20(sellToken).transferFrom(msg.sender, address(this), amount);
    uint256 tokenToReceive = (amount / poolPairs[buyToken][sellToken])/(10**12)*100; // change to /
    require(tokenToReceive < reserves[buyToken][sellToken],"UNISWAP : UNDERFLOW"); 
    reserves[buyToken][sellToken] -= tokenToReceive; 
    reserves[sellToken][buyToken] += amount;  
    IERC20(buyToken).transfer(msg.sender, tokenToReceive); 
}

// get the balance of the contract
    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }


   

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    receive() external payable {}
}

   