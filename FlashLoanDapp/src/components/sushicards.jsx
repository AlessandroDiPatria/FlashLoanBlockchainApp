import React, { useState,useEffect } from "react";
import "../styles/card.css"
import logo from "./tether.png"
import TOKENS from "../utils/token.json";
import  Web3 from "web3";
import dexABI from "../utils/UniswapV3ABI.json"
const web3 = new Web3(window.ethereum);
//const provider = new Web3.providers.HttpProvider('');
//const web3 = new Web3(provider);


function SushiCard() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [amountA, setAmountA] = useState(100000000000000000000000n);
  const [amountB, setAmountB] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [selectedOption2, setSelectedOption2] = useState();
  const [token, setToken] = useState("0x65aFADD39029741B3b8f0756952C74678c9cEC93"); // USDC
  const [tokenB, setTokenB] = useState("0xBa8DCeD3512925e52FE67b1b5329187589072A55"); // DAI
  const [decimal, setDecimals] = useState(6);
  const [value,setValue] = useState();

  const tokenABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "_totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "acceptOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "safeSub", "outputs": [{ "name": "c", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "safeDiv", "outputs": [{ "name": "c", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "safeMul", "outputs": [{ "name": "c", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [], "name": "newOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokenAddress", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transferAnyERC20Token", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "safeAdd", "outputs": [{ "name": "c", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "tokenOwner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }];
  //console.log(amountA)
  const tokenAddress2 = '0xBa8DCeD3512925e52FE67b1b5329187589072A55'; // address of the IERC20 token contract
  const spenderAddress = '0x120b6Eb32f266DA04d6acfe585053767B3d06479'; // address of the spender
  const contractAddress = "0x120b6Eb32f266DA04d6acfe585053767B3d06479";
  //const uniswapAddress = "0xb39f2AbCa086Cdc4dC1a82DF4f3Dc6194e1aC3B7";



  useEffect(() => {
    getAccounts();



  }, []);



  async function connectWallet() {
    if (window.ethereum) {

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(window.ethereum);

        setAddress(accounts[0]);
        console.log("Connected to wallet:", accounts[0]);


      } catch (error) {
        setError(error);
      }
    }
  }
  //console.log("my address is :"  + address + "provider " + web3)
  async function getAccounts() {

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0]);
  } //*(10**decimal)

  async function SwapToken() {
    const tokenContract = new web3.eth.Contract(dexABI, contractAddress);

    const approveData = tokenContract.methods.swapStableToCoin(tokenB,token,amountA ).encodeABI();
    const gasEstimate = await tokenContract.methods.swapStableToCoin(tokenB,token,amountA ).estimateGas({ from: address });
    const tx = {
      from: address,
      to: contractAddress,
      data: approveData,
      gas: gasEstimate,


      
    };
    const receipt = await web3.eth.sendTransaction(tx);
    console.log(receipt.transactionHash);
    setError("https://goerli.etherscan.io/tx/" + String(receipt.transactionHash))
  };




    async function CreatePool() {
    const tokenContract = new web3.eth.Contract(dexABI, contractAddress);

    const approveData = tokenContract.methods.createPair(token,tokenB,value).encodeABI();
    const gasEstimate = await tokenContract.methods.createPair(token,tokenB,value).estimateGas({ from: address });
    const tx = {
      from: address,
      to: contractAddress,
      data: approveData,
      gas: gasEstimate,


      
    };
    const receipt = await web3.eth.sendTransaction(tx);
    console.log(receipt.transactionHash);
    setError("https://goerli.etherscan.io/tx/" + String(receipt.transactionHash))
  };


  async function DepositLiquidity() {
    const tokenContract = new web3.eth.Contract(dexABI, contractAddress);

    const approveData = tokenContract.methods.depositLiquidity(token,tokenB,amountA).encodeABI();
    const gasEstimate = await tokenContract.methods.depositLiquidity(token,tokenB,amountA).estimateGas({ from: address });
    const tx = {
      from: address,
      to: contractAddress,
      data: approveData,
      gas: gasEstimate,


      
    };
    const receipt = await web3.eth.sendTransaction(tx);
    console.log(receipt.transactionHash);
    setError("https://goerli.etherscan.io/tx/" + String(receipt.transactionHash))
  };





    async function ApproveTokens() {
      const tokenContract = new web3.eth.Contract(tokenABI, token);
  
      const approveData = tokenContract.methods.approve(spenderAddress, amountA ).encodeABI();
      const gasEstimate = await tokenContract.methods.approve(spenderAddress, amountA ).estimateGas({ from: address });
      const tx = {
        from: address,
        to: token,
        data: approveData,
        gas: gasEstimate,
      };
    const receipt = await web3.eth.sendTransaction(tx);
    console.log(receipt.transactionHash);
    setError("https://goerli.etherscan.io/tx/" + String(receipt.transactionHash))


  }



  async function findPrice() {
    const web3 = new Web3(window.ethereum);
    const tokenContract = new web3.eth.Contract(dexABI, token);
    const value = tokenContract.methods.getPricePool().call();
  
 


}



  const handleChange = (event) => {
    const tokenObject = handleTokenAddress(event.target.value);
    setSelectedOption(event.target.value);
    setToken(tokenObject.address);
    setDecimals(tokenObject.decimals);

  };

  const handleChangeB = (event) => {
    const tokenObject = handleTokenAddress(event.target.value);
    setSelectedOption2(event.target.value);
    setTokenB(tokenObject.address);

  };

  const handleTokenAddress = (value) => {
    const filteredData = TOKENS.filter(item => item.symbol == value);
    return filteredData[0];


  };


  console.log(selectedOption);
  console.log("token1" + "  " + token);
  console.log("token2" + "  " + tokenB);
  console.log("amountA" + "  " + amountA);
  console.log("AmountB" + "  " + amountB);
  console.log("decimals" + decimal);


  function handleSwap() {
    document.getElementById('operation1').style.display = 'block';
    document.getElementById('card').style.display = 'none';
    document.getElementById('operation2').style.display = 'none';
    document.getElementById('operation3').style.display = 'none';


  }
  function handleApprove() {
    document.getElementById('card').style.display = 'block';
    document.getElementById('operation1').style.display = 'none';
    document.getElementById('operation2').style.display = 'none';
    document.getElementById('operation3').style.display = 'none';


  }

  function handlePool() {
    document.getElementById('card').style.display = 'none';
    document.getElementById('operation1').style.display = 'none';
    document.getElementById('operation2').style.display = 'block';
    document.getElementById('operation3').style.display = 'none';


  }

  function handleLiquidity() {
    document.getElementById('card').style.display = 'none';
    document.getElementById('operation1').style.display = 'none';
    document.getElementById('operation2').style.display = 'none';
    document.getElementById('operation3').style.display = 'block';

  }



  return (

    <div className="wrapper">

      <div className="button-square">
        <button onClick={handleApprove} className="select-button">Approve </button>
        <button onClick={handleSwap} className="select-button">Swap</button>
        <button onClick={handlePool} className="select-button">Pool</button>
        <button onClick={handleLiquidity} className="select-button">Liquidity</button>
      </div>
      <div className="square" id="card">
        <h2 id="title " className="title">Approve</h2>

        <p> Hello {String(address).substring(0, 6) +
          "..." +
          String(address).substring(38)} for security reason choose tokens to approve</p>
         <a style={{color:"white",fontSize:"10px"}}href={error}> {error.substring(0,50)}</a>




        <div className="square-input">




          <select name="cars" id="cars" onChange={handleChange}>
            <option value="USDC">USDC</option>
            <option value="DAI">DAI</option>
            <option value="LINK">LINK</option>
            <option value="AAVE">AAVE</option>
            <option value="USDT">USDT</option>
            <option value="EURS">EURS</option>

          </select>



          <input onChange={(event) => setAmountA(event.target.value)}
            type="number"
            placeholder="Amount" />

        </div>

        <button className="submit" onClick={ApproveTokens}>Approve Tokens</button>

      </div>


      <div style={{ "display": "none" }} id="operation1">
        <h2 className="title">Swap</h2>
        <a style={{color:"white",fontSize:"10px"}}href={error}> {error.substring(0,50)}</a>
        <select name="cars" id="cars" onChange={handleChange}>
          <option value="USDC">USDC</option>
          <option value="DAI">DAI</option>
          <option value="LINK">LINK</option>
          <option value="AAVE">AAVE</option>
          <option value="USDT">USDT</option>
          <option value="EURS">EURS</option>

        </select>



        <input onChange={(event) => setAmountA(event.target.value)}
          type="number"
          placeholder="Amount" />

        <h3>⇅</h3>
        <select name="cars" id="cars" onChange={handleChangeB}>
          <option value="USDC">USDC</option>
          <option selected value="DAI">DAI</option>
          <option value="LINK">LINK</option>
          <option value="AAVE">AAVE</option>
          <option value="USDT">USDT</option>
          <option value="EURS">EURS</option>

        </select>



        <input onChange={(event) => setAmountB(event.target.value)}
          type="number"
          value={amountA}
          placeholder="Amount" />


        <button className="submit" onClick={SwapToken}>Swap Tokens</button>

      </div>
      <div style={{ "display": "none" }} id="operation2">
        <div className="inner-card">
          <h2 className="title">Create a Pool</h2>
          <a style={{color:"white",fontSize:"10px"}}href={error}> {error.substring(0,50)}</a>
          <select name="cars" id="cars" onChange={handleChange}>
            <option value="USDC">USDC</option>
            <option value="DAI">DAI</option>
            <option value="LINK">LINK</option>
            <option value="AAVE">AAVE</option>
            <option value="USDT">USDT</option>
            <option value="EURS">EURS</option>

          </select>
          <select name="cars" id="cars" onChange={handleChangeB}>
            <option value="USDC">USDC</option>
            <option selected value="DAI">DAI</option>
            <option value="LINK">LINK</option>
            <option value="AAVE">AAVE</option>
            <option value="USDT">USDT</option>
            <option value="EURS">EURS</option>

          </select>
          <input  onChange={(event) => setValue(event.target.value)}

            type="number"

            placeholder="Pool Pair Value" />
        </div>




        <button className="submit" onClick={CreatePool}>Create Pool</button>

      </div>

      <div style={{ "display": "none" }} id="operation3">
        <h2 className="title">Deposit Liquidity </h2>
        <a style={{color:"white",fontSize:"10px"}}href={error}> {error.substring(0,50)}</a>
        <select name="cars" id="cars" onChange={handleChange}>
          <option value="USDC">USDC</option>
          <option value="DAI">DAI</option>
          <option value="LINK">LINK</option>
          <option value="AAVE">AAVE</option>
          <option value="USDT">USDT</option>
          <option value="EURS">EURS</option>

        </select>



        <input onChange={(event) => setAmountA(event.target.value)}
          type="number"
          placeholder="Add Liquidity ..." />

        <select name="cars" id="cars" onChange={handleChangeB}>
          <option value="USDC">USDC</option>
          <option selected value="DAI">DAI</option>
          <option value="LINK">LINK</option>
          <option value="AAVE">AAVE</option>
          <option value="USDT">USDT</option>
          <option value="EURS">EURS</option>

        </select>



        <input
          type="number"
          placeholder="Stimated quantity" />
        <button className="submit" onClick={DepositLiquidity}>Add Liquidity</button>

      </div>

    </div>



  );

}

export default SushiCard; 


