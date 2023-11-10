import React, { useState,useEffect } from "react";
import logo from  "../styles/header.css"
import logo2 from "./ethereum.svg"
import "../components/tether.png"
import "./wallet"
import { useNavigate } from 'react-router-dom';
import Web3 from "web3";


//const Web3 = require('web3');
//const provider = new Web3.providers.HttpProvider('');
//const web3 = new Web3(provider);




function NavBarDex2() {
const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const [defaultAccount,setDefaultAccount] = useState("")
  const [userBalance,setUserBalance] = useState(null)
  const [connectButtonText,setConnectButtonText] = useState(null)
  const [network,setNetwork] = useState("Ethereum") 
  const [goerli,setGoerliBalance ] = useState(0)




console.log(defaultAccount)
  useEffect(() => {
   
    window.ethereum.on('accountsChanged', async () => {
        initialise();
       
    });
    getAccounts()


  });

   
  async function getAccounts() {

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",  
      });
      setDefaultAccount(accounts[0])
  }

 
async function initialise() {
  setDefaultAccount("")
}


function isMetaMaskInstalled() {
  return Boolean(window.ethereum && window.ethereum.isMetaMask);
}

  async function requestAccount() {
    console.log('Requesting account...');
    if (isMetaMaskInstalled() == false)  {
      alert("Injected Web3 Wallet is installed!");
    }
    

    // ❌ Check if Meta Mask Extension exists 
    if (window.ethereum) {
      console.log('detected');

      try {
        const web3 = new Web3(window.ethereum);
        console.log(web3)
        var a = await web3.eth.getAccounts();
        
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setDefaultAccount(accounts[0]);
        //console.log(accounts)
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

const setGoerli = () => {
    setNetwork("Goerli")
}
const setEthereum = () => {
    setNetwork("Ethereum")
}

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a exact to="/" className="nav-logo" onClick={() => {navigate("/sushi")}}>
            Sushiswap
            
            <i className="fas fa-code"></i>
          </a>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            
          
            <li className="nav-item">
              <a
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={() => {navigate("/uniswap")}}
              >
                Uniswap
              </a>
            </li>
            
           
            <li className="nav-item">
              <a
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={() => {navigate("/")}}
              >
                FlashSwap
              </a>
            </li>
           

            <li className="nav-item">
                <div class="dropdown">
                <button class="dropbtn"><img className ="img-button"src={logo2} /> {network}</button>
                <div class="dropdown-content">
                    <a href="#" onClick={setGoerli}><img className ="img-button"src={logo2} /> Goerli </a>
                    <a href="#"  onClick={setEthereum} > <img className ="img-button"src={logo2} /> Ethereum</a>
                </div>
                </div>

                
            </li>
           

         
            <li className="nav-item">
            <button onClick={requestAccount} className="bottone">
            {defaultAccount.length > 0 ? (
                  
                  String(defaultAccount).substring(0, 6) +
                  "..." +
                  String(defaultAccount).substring(38)
                ) : (
                  <span>Connect your Wallet </span>
                )}</button>

<div class="dropdown-content">
                    <a href="#" onClick={setGoerli}><img className ="img-button"src={logo2} /> Goerli </a>
                    <a href="#"  onClick={setEthereum} > <img className ="img-button"src={logo2} /> Ethereum</a>
                </div>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
         <svg viewBox="0 0 100 80" width="40" height="40">
    <rect width="80" height="10"></rect>
    <rect y="30" width="80" height="10"></rect>
    <rect y="60" width="80" height="10"></rect>
</svg>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBarDex2;