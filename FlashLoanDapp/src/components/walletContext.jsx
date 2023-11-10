import React from "react";
import { useState,useEffect } from "react";
export  const TransactionContext = React.createContext()



let eth;
if(typeof window != "undefined"){
    eth = window.ethereum
}
export const TransactionProvider= ({children}) => {
    const [currentAccount, setCurrentAccount] = useState() 
    useEffect(()=>{
        checkIfWalletIsConnected()

    },[])
    const connectWallet = async (metamask = eth ) => {
        try {
            if(!metamask) return alert("please install Metamusk")
            const accounts =  await metamask.request({method : "eth_requestAccounts"})
            setCurrentAccount(accounts[0])
        }catch(error) {
            console.log(error)

        }



    }
    const checkIfWalletIsConnected = async(metamask = eth ) => {
        try {
            if (!metamask) return alert("please install metamask")
            const accounts =  await metamask.request({method : "eth_Accounts"})
        
        if (accounts.length){
            setCurrentAccount(accounts[0])
            console.log("wallet is already connected")
        }}
        catch (error) {
            console.log(error)

        }
    }




    return (
        <TransactionContext.Provider
        value= {{
            currentAccount,connectWallet,
        }}
        
        > {children}

        </TransactionContext.Provider>
    )

}


