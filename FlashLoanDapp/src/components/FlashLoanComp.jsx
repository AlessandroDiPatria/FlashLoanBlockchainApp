import React, { useState, useEffect } from "react";
import Tokens from "../utils/token.json"
import Web3 from "web3";
import dexABI from "../utils/UniswapV3ABI.json"
import "../styles/listComponent.css"
import { useNavigate } from "react-router-dom";
import TOKENS from "../utils/token.json"
import contractABI from "../utils/FlashLoanABI.json"
var bolean = "false"
const web3 = new Web3(window.ethereum);
const provider = new Web3.providers.HttpProvider('');
const web4 = new Web3(provider); // change the second web3 with a different provider 

// DEX 
const uniswapAddress = "0xb39f2AbCa086Cdc4dC1a82DF4f3Dc6194e1aC3B7"
const sushiswapAddress = "0x120b6Eb32f266DA04d6acfe585053767B3d06479"
// 
const FlashLoanComp = () => {
  const [error, setError] = useState();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [tokenA, setToken] = useState("0x65aFADD39029741B3b8f0756952C74678c9cEC93")
  const [tokenB, setTokenB] = useState("0x65aFADD39029741B3b8f0756952C74678c9cEC93")
  const [setOption, setSelectedOption] = useState()
  const [setOption2, setSelectedOption2] = useState()
  const [amountA, setAmountA] = useState();
  const [amountB, setAmountB] = useState();
  const [default1, setDefault1] = useState();
  const [default2, setDefault2] = useState();
  //const contractAbi = ""
  const contractAddress = "0x6f6175C81c142714AbDB4527A9E95403F497D4DB"

  const [usdc_Dai, setUsdcDai] = useState()
  const [usdc_Aave, setUsdcAave] = useState()
  const [usdc_Link, setUsdcLink] = useState()
  const [usdc_Usdt, setUsdcUsdt] = useState()
  const [usdc_Eurs, setUsdcEurs] = useState()



  useEffect(() => {
    getAccounts()
    getPricesPool()

  }, []);


  async function getPricesPool() {
    const usdcDai = await findPrice(TOKENS[0].address, TOKENS[1].address, uniswapAddress)
    const usdcLink = await findPrice(TOKENS[0].address, TOKENS[2].address, uniswapAddress)
    const usdcUsdt = await findPrice(TOKENS[0].address, TOKENS[3].address, uniswapAddress)
    const usdcAave = await findPrice(TOKENS[0].address, TOKENS[4].address, uniswapAddress)
    const usdcEurs = await findPrice(TOKENS[0].address, TOKENS[5].address, uniswapAddress)


    const usdcDaiSushiswap = await findPrice(TOKENS[0].address, TOKENS[1].address, sushiswapAddress)
    const differenza = usdcDai - usdcDaiSushiswap
    const media = parseInt(usdcDai) + parseInt(usdcDaiSushiswap)
    console.log("average" + media, "difference" + differenza)
    const usdcLinkSushiswap = await findPrice(TOKENS[0].address, TOKENS[2].address, sushiswapAddress)
    const usdcUsdtSushiswap = await findPrice(TOKENS[0].address, TOKENS[3].address, sushiswapAddress)
    const usdcAaveSushiswap = await findPrice(TOKENS[0].address, TOKENS[4].address, sushiswapAddress)
    const usdcEursSushiswap = await findPrice(TOKENS[0].address, TOKENS[5].address, sushiswapAddress)
    console.log("uniswap" + "" + usdcDai, "sushiswap" + "" + usdcDaiSushiswap)
    //console.log("uniswap" + ""+ usdcLink, "sushiswap" + "" + usdcLinkSushiswap)
    //console.log("difference" + ""+ percentageDifference(usdcDai,usdcDaiSushiswap))

    setUsdcDai(percentageDifference(usdcDai, usdcDaiSushiswap).toFixed(1))
    setUsdcLink(percentageDifference(usdcLink, usdcLinkSushiswap).toFixed(1))
    setUsdcUsdt(percentageDifference(usdcUsdt, usdcUsdtSushiswap).toFixed(1))
    setUsdcAave(percentageDifference(usdcAave, usdcAaveSushiswap).toFixed(1))
    setUsdcEurs(percentageDifference(usdcEurs, usdcEursSushiswap).toFixed(1))

  }

  function percentageDifference(a, b) {
    const c = parseInt(a)
    const d = parseInt(b)
    const difference = Math.abs(c - d);
    const average = (c + d) / 2;
    console.log(100 * (difference / average))
    return 100 * (difference / average);


  }





  async function findPrice(token1, token2, address) {
    const web3 = new Web3(window.ethereum);
    const tokenContract = new web3.eth.Contract(dexABI, address);
    const priceValue = await tokenContract.methods.getPricePool(token1, token2).call();
    console.log(priceValue)
    return priceValue


  }





  const handleChange = (event) => {
    var address = handleTokenAddress(event.target.value)
    setSelectedOption(event.target.value);
    setToken(address)

  };
  web4.eth.getBalance("0xE097A7af3698dd242FFd5F7e3429305686c123F5").then(console.log)

  const handleChangeB = (event) => {
    var address = handleTokenAddress(event.target.value)
    setSelectedOption2(event.target.value)
    setTokenB(address)


  }

  function setDefaultValues(ta, tb) {
    setDefault1(ta)
    setDefault2(tb)


  }

  const handleTokenAddress = (value) => {
    const filteredData = TOKENS.filter(item => item.symbol == value);
    return filteredData[0].address


  }





  async function getAccounts() {

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0])
  }

  function handleLoan() {
    document.getElementById('loan').style.display = 'block';
    document.getElementById('swap').style.display = 'none';


  }
  function handleApprove() {
    document.getElementById('swap').style.display = 'block';
    document.getElementById('loan').style.display = 'none';



  }


  //#############  WEB3 FUNCTIONS ##################


  async function approveTokens() {
    const tokenContract = new web3.eth.Contract(contractABI, contractAddress);

    const approveData = tokenContract.methods.approveTokens(tokenA, amountA).encodeABI();
    const gasEstimate = await tokenContract.methods.approveTokens(tokenA, amountA).estimateGas({ from: address });
    const tx = {
      from: address,
      to: contractAddress,
      data: approveData,
      gas: gasEstimate,
    };



    const receipt = await web3.eth.sendTransaction(tx);
    setError("https://goerli.etherscan.io/tx/" + receipt)
    console.log(receipt.blockHash);


  }

  async function handleFlashLoan() {
    const tokenContract = new web3.eth.Contract(contractABI, contractAddress);

    const approveData = tokenContract.methods.requestFlashLoan(tokenA, amountA, tokenB).encodeABI();
    const gasEstimate = await tokenContract.methods.requestFlashLoan(tokenA, amountA, tokenB).estimateGas({ from: address });
    const tx = {
      from: address,
      to: contractAddress,
      data: approveData,
      gas: gasEstimate,
    };



    const receipt = await web3.eth.sendTransaction(tx);
    setError("https://goerli.etherscan.io/tx/" + receipt)
    console.log(receipt.blockHash);


  }
















  console.log("token1" + "  " + tokenA)
  console.log("token2" + "  " + tokenB)
  console.log("amountA" + "  " + amountA)
  console.log("AmountB" + "  " + amountB)
  console.log(" default1 " + default1 + " default2 " + default2)







  return (<div>
    <div className="divided-contents">
      <div className="card-component-1" >
        <div className="cardList" >
          <p className="h3-list-name">Token names Uniswap </p>
          <p className="h3-list-name">Token name SushiSwap</p>
          <p className="h3-list-name" >Opportunity </p>
          

        </div>
        <div className="cardList" >
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[1].logo} />
          <div class="vl"></div>
          <p className="h3-list">{Tokens[1].symbol} </p>
          <img className="token-img" src={Tokens[1].logo} />
          <p className="h3-list">{Tokens[1].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <div class="vr"></div>
          <p className="p-list">{usdc_Dai}%</p>

         
        </div>
        <div className="cardList" >
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[2].logo} />
          <p className="h3-list">{Tokens[2].symbol} </p>
          <div class="vl"></div>
          <img className="token-img" src={Tokens[2].logo} />
          <p className="h3-list">{Tokens[2].symbol}</p>
          <h3> ↔ </h3> 
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <div class="vr"></div>
          <p className="p-list">{usdc_Link}%</p>

         
        </div>
        <div className="cardList" >
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[3].logo} />
          <p className="h3-list">{Tokens[3].symbol} </p>
          <div class="vl"></div>
          <img className="token-img" src={Tokens[3].logo} />
          <p className="h3-list">{Tokens[3].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <div class="vl"></div>
          <div class="vr"></div>
          <p className="p-list">{usdc_Usdt}%</p>

          
        </div>
        <div className="cardList" >
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[4].logo} />
          <p className="h3-list">{Tokens[4].symbol} </p>
          <div class="vl"></div>
          <img className="token-img" src={Tokens[4].logo} />
          <p className="h3-list">{Tokens[4].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <div class="vl"></div>
          <div class="vr"></div>
          <p className="p-list">{usdc_Aave}%</p>

          
        </div>
        <div className="cardList" >
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[5].logo} />
          <p className="h3-list">{Tokens[5].symbol} </p>
          <div class="vl"></div>
          <img className="token-img" src={Tokens[5].logo} />
          <p className="h3-list">{Tokens[5].symbol}</p>
          <h3> ↔ </h3>
          <img className="token-img" src={Tokens[0].logo} />
          <p className="h3-list">{Tokens[0].symbol}</p>
          <div class="vr"></div>
          <p className="p-list">{usdc_Eurs}%</p>

          
        </div>

      </div>
    </div>

    <div className="card-swap" id="card">
      <div className="buttons-squared">
        <button onClick={handleApprove} className="selects-button">Approve </button>
        <button onClick={handleLoan} className="selects-button">Loan </button>
      </div>
      <div className="switch" id="swap">
        <h2 id="title " className="title">Approve</h2>

        <p className="disclaimer"> Hello {String(address).substring(0, 6) +
          "..." +
          String(address).substring(38)} for security reason choose tokens to approve</p>
        <p>{error}</p>




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

        <button className="submit-button" onClick={approveTokens}>Approve Tokens</button>

      </div>


      <div className="swatch" id="loan" style={{ "display": "none" }}>
        <h2 id="title " className="title">FlashLoan </h2>






        <div className="square-inputs">
          <p>{error}</p>




          <select name="cars" id="cars" onChange={handleChange} defaultValue={default1}>
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
          <select name="cars" id="cars" onChange={handleChangeB} defaultValue={default2}>
            <option value="USDC">USDC</option>
            <option value="DAI">DAI</option>
            <option value="LINK">LINK</option>
            <option value="AAVE">AAVE</option>
            <option value="USDT">USDT</option>
            <option value="EURS">EURS</option>

          </select>




          <input onChange={(event) => setAmountB(event.target.value)}
            type="number"
            placeholder="Amount" />


        </div>



        <button className="submit-button" onClick={handleFlashLoan}>Execute FlashLoan</button>

      </div>
    </div>


  </div>
  )

}
export default FlashLoanComp;

