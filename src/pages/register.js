import { useEffect, useState } from "react";
import './register.css';

const Register = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [url, setURL] = useState("");

  const connectWalletPressed = async () => { //TODO: connect to wallet
   
  };

  const onMintPressed = async () => { //TODO: mint profile token
    
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ Profile Minter</h1>
     
      <form>
        <h2>🌈 Avatar </h2>
        <input
          id="avatar"
          type="text"
          placeholder="e.g. https://opensea.io/assets/your-asset"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>⚡ENS Address: </h2>
        <input
          id="ens"
          type="text"
          placeholder="e.g. name.eth"
          onChange={(event) => setName(event.target.value)}
        />
        
        <h2>✍️ Tagline: </h2>
        <input
          id='tagline'
          type="text"
          placeholder="e.g. To the moon🚀 ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint Profile
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Register;
