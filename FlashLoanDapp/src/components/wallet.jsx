
import Web3 from "web3";
import "../styles/wallet.css";
import { useState,useEffect } from "react";
import NavBar from "./navbar";
// how can I create a comnponent in react
const Wallet = () => {
    const web3 = new Web3(window.ethereum);
    const [address, setAddress] = useState(null);
    const [ethbalance,setEthBalance] = useState("100")
    
    
    useEffect(() => {
      getAccounts()

    }, []);


    async function getAccounts() {

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",  
        });
        setAddress(accounts[0])
        const balance = await web3.eth.getBalance(
          accounts[0]
        );
        const etherBalance =  web3.utils.fromWei(balance, "ether");
        const finalBalance = etherBalance.substring(0, 6);
        setEthBalance(finalBalance)
    }
  
    return (
      <div>
        <NavBar/>
        <div className="wrapper">
        <h3>My Wallet</h3>
        <p>Address: {address} </p>
        <p>Balance {ethbalance}</p>
      </div>
      </div>
    );
  };
  
  export default Wallet;