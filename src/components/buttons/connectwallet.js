import React, { useState } from 'react';
import { Button } from '@mui/material';
import { requestAccount } from '../../utils/common.js';

export default function ConnectWallet () {
  const [connected, setConnected] = useState(false); // MM Wallet connection state
  const [account, setAccount] = useState('0x');

  async function handleConnectWallet () {
    const accounts = await requestAccount();
    setConnected(true);
    setAccount(accounts[0]);
  }

  return (
    <>
      {/* If MM is not connected render 'Connect Wallet' btn else 'Connected btn'. */}
      {
          !connected
            ? <Button variant='contained' onClick={handleConnectWallet}>Connect Wallet</Button>
            : <Button variant='outlined'>{account.substring(0, 7)} Connected</Button>
       }
    </>
  );
}
