import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { requestAccount } from "../../utils/common.js";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);



export default function ConnectWallet() {

  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState("0x");

async function handleConnectWallet() {
  const accounts = await requestAccount();
  setLogin(true);
  setAccount(accounts[0]);
}

  return (
    <>
      {
            !login
            ? <Button variant="contained" onClick={handleConnectWallet}>Connect Wallet</Button> 
            : <Button variant="outlined">{account.substring(0,7)} Connected</Button>
          }
          </>
  );
}
