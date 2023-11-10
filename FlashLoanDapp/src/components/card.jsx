import React, { useState,useEffect } from "react";
import "../styles/card.css"
import logo from "./tether.png"
import TOKENS from "../utils/token.json";
import  Web3 from "web3"
const web3 = new Web3(window.ethereum);
//const provider = new Web3.providers.HttpProvider('');
//const web3 = new Web3(provider);


const  Card = () => {
  const [address, setAddress] = useState("");
  const [error,setError] = useState("");
  const[amountA,setAmountA] = useState(100000000000000000000000n);
  const[amountB,setAmountB] = useState("");
  const [token,setCurrentToken] = useState("USDC")


  const tokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
  //console.log(amountA)
  const tokenAddress2 = '0xBa8DCeD3512925e52FE67b1b5329187589072A55'; // address of the IERC20 token contract
  const spenderAddress = '0x9dFf059Dfcc4e83339958244BA8c70d31336F234'; // address of the spender
  const tokenAddress = "0x65aFADD39029741B3b8f0756952C74678c9cEC93"


    useEffect(() => {
      getAccounts()
        


    }, []);



    async function connectWallet() {
      if (window.ethereum) {
          
          try {
              const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",  
              });
              const web3 = new Web3(window.ethereum);
           
              setAddress(accounts[0])
              console.log("Connected to wallet:", accounts[0]);
              
              
          } catch (error) {
              setError(error)
          }
      } 
  }
  console.log("my address is :"  + address + "provider " + web3)


  async function getAccounts() {

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",  
      });
      setAddress(accounts[0])
  }

async function ApproveTokens() {
  const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

  const approveData = tokenContract.methods.approve(spenderAddress, amountA).encodeABI();
  const gasEstimate = await tokenContract.methods.approve(spenderAddress, amountA).estimateGas({from: address});
  const tx = {
      from: address,
      to: tokenAddress,
      data: approveData,
      gas: gasEstimate,
  };



    const receipt = await web3.eth.sendTransaction(tx);
    console.log(receipt.blockHash);


}





return (
  
    <div className="wrapper">
        <div className="square">
        <h2 className="title">Approve</h2>
        </div>
        <p> Hello ${String(address).substring(0, 6) +
                  "..." +
                  String(address).substring(38)} for security reason choose tokens to approve</p>
        <p>{error}</p>
    <form className="form">

    <div className="square-input">
   
  <select name="cars" id="cars">
    <option value="volvo">USDT</option>
    <option thumbnail="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/LetterA.svg/2000px-LetterA.svg.png" value="saab">Saab</option>
    <option value="opel">USDT</option>
    <option value="audi">Audi</option>
   
  </select>

  

   <input onChange = {(event)=>setAmountA(event.target.value)}
          type="number"
          placeholder="Amount"/>
  <select name="cars2" id="cars">
    <option value="volvo">DAI</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>
  <input type="number" placeholder="Amount"
  onChange = {(event)=>setAmountB(event.target.value)}
  />
  </div>

  <button className="submit" onClick={ApproveTokens}>Approve Tokens</button>
    </form>
    
    <div class="dropdown">
    <button class="dropbtn"><img className ="img-button" src={TOKENS[0].logo}/> {TOKENS[0].symbol }</button>
    <div className="dropdown-content">
    {TOKENS.map(item => (
            
                <div className="content" onClick={setCurrentToken} key={item.symbol} >
                  
  
                
                  <a >
                    <p>{item.name}</p>
                    <img className ="token-img"src={item.logo} style = {{"height":"12px","width":"12px"}} />
                    </a></div>
         
                
            ))}</div>
          
            </div>

   
  </div>

)

};

export default Card; 


/*
<div>
        <div className="card">
    <form  className="log-Form">
    <div className="log-Input">
      <input
        type="text"
        placeholder=" Name and Surname"
        onChange={(event) => setName(event.target.value)} // setting the new state in form
      />

</div>
<div className="log-Input">
      <input
        type="text"
        placeholder="Choose the event name"
        onChange = {(event)=>setEvent(event.target.value)} // setting the new state in form
      /></div> 
    </form>
    

    <button className="logout" onClick={handleGallery}>
            Go to Gallery
          </button  ></div>
        </div>
    */