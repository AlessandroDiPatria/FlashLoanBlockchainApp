import './App.css';
import { useEffect } from 'react';
import React from 'react';
import Environment from "./components/wallet"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Swap from './pages/swap';
import Uniswap from './pages/uniswap';
import SushiSwap from './pages/sushiswap';






function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Swap/>}/>
        <Route path="/sushi" element={<SushiSwap/>}/>
        <Route path="/Environment" element={<Environment/>}/>
        <Route path="/uniswap" element={<Uniswap/>}/>
      
      </Routes>
    </BrowserRouter>
   
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/*
function App() {

  return (
    <div className="App">
      
     <Home/>
     
   
   
    </div>
    
  );
}*/

export default App;