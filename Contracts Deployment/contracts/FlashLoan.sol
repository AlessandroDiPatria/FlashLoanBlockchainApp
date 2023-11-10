// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import {FlashLoanSimpleReceiverBase} from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

interface IDex {
    // import functions from dex contract
function swapStableToCoin(address buyToken, address sellToken, uint256 amount) external;
function swapCoinsToStable(address buyToken, address sellToken, uint256 amount) external;
function getPricePool(address token1,address token2) external view returns (uint256);

    // these funcions are the functions modified for the DEXs that allow to deposit and sell differents tokens
}

contract FlashLoanArbitrage is FlashLoanSimpleReceiverBase {
    address payable owner;
    // Stable Coin
    

//  The  two contracts address (DEXs)
    address private dexContractAddress = 0xb39f2AbCa086Cdc4dC1a82DF4f3Dc6194e1aC3B7;
    address private dexContractAddress2 = 0x120b6Eb32f266DA04d6acfe585053767B3d06479;

// Dex Definitions 
 
    IDex private dexContract;
    IDex private dexContract2;

    constructor(address _addressProvider)
        FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider))
    {
        owner = payable(msg.sender);
        dexContract = IDex(dexContractAddress);
        dexContract2 = IDex(dexContractAddress2);
    }

    /**
        This function is called after your contract has received the flash loaned amount
     */
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {

        (address tokenAddr) = abi.decode(params,(address)); 
        dexContract.swapStableToCoin(tokenAddr,asset,amount);
        dexContract2.swapCoinsToStable(asset, tokenAddr, IERC20(tokenAddr).balanceOf(address(this)));


 
        

         
        // Approve the Pool contract allowance to *pull* the owed amount
        uint256 amountOwed = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwed);
        return true;
    }

    function requestFlashLoan(address _token, uint256 _amount, address _tokenSwap) public {
        address receiverAddress = address(this);
        address asset = _token;
        uint256 amount = _amount;
        bytes memory params = abi.encode(_tokenSwap,msg.sender);
        uint16 referralCode = 0;

        POOL.flashLoanSimple( // with this function we call a pool function that call execute operation function inside the contract
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }




    // APPROVE MULTI-TOKENS
    function approveTokens(address _token, uint256 _amount) external returns (bool,bool){
        return( IERC20(_token).approve(dexContractAddress2, _amount), IERC20(_token).approve(dexContractAddress, _amount));
    }

     // ALLOWANCE
    function allowance(address token) external view returns(uint256, uint256){
        return (IERC20(token).allowance(address(this), dexContractAddress), IERC20(token).allowance(address(this), dexContractAddress2));
    }

    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
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