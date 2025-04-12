import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        setWalletAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
        setWalletConnected(true);

        // Switch to Somnia Testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xc4d8' }], // 50312 in hex
        });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Somnia Voting DApp</h1>
        {!walletConnected ? (
          <button className="wallet-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-connected">
            Connected: {walletAddress}
          </div>
        )}
      </header>

      <main>
        {/* Polls/Voting Section - Next Step Mein Add Karenge */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>Ready to create and vote on polls!</p>
        </div>
      </main>
    </div>
  );
}

export default App;
