import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
// import { Link } from "react-router-dom";
import Header from '../components/header.js';
import Connected from '../components/connected.js'; // Connect Wallet Button
import { getBalance } from '../utils';
import { requestAccount } from '../utils/common.js';
import contractArtifact from '../abis/ProfileGraphContract.json';
import contractAddress from '../abis/contract-address.json';

export default function Home () {
  const [profileExist, setprofileExist] = useState(false);
  const [connected, setConnected] = useState(false); // MM Wallet connection state
  const [account, setAccount] = useState('0x');

  const CONTRACT_ADDR = contractAddress.ProfileGraph;

  async function handleConnectWallet () {
    const accounts = await requestAccount();
    const address = accounts[0];

    const balance = await getBalance(CONTRACT_ADDR, contractArtifact, address); // getBalanceOf(MM address)

    // console.log(balance);

    if (balance > 0) {
      setprofileExist(true); // if balance is non-zero setprofileExist = true
    } else {
      setprofileExist(false); // if balance is zero setprofileExist = false
    }
    setConnected(true);
    setAccount(address);
  }

  return (
    <div>
      <Header />  {/* Header section containing site name and desc. */}
      <Grid
        container
        flexDirection='column'
        justifyContent='center'
        sx={{
          pt: 5,
          pb: 60
        }}

        spacing={10}
      >
        <Grid item align='center' sx={{ pt: 3 }}>
          {/* If MM is not connected render 'Connect Wallet' btn else 'Connected btn'. */}
          {
                    !connected
                      ? <> 
                          <Grid item align='center' sx={{ pt: 3 }}>
                          <Button variant='contained' onClick={handleConnectWallet}>Connect Wallet</Button>
                          </Grid>
                        </>
                      : <>
                            <Grid item md={12} sx={{ pt: 5 }}>
                              <Button variant='outlined'>{account.substring(0, 7)} Connected</Button>
                            </Grid>
                              <Connected pExists={profileExist} />        {/* proped component to either link to '/mintprofile' or 'profilehome' */}
                       
                        </>
                }
        </Grid>
      </Grid>
    </div>
  );
}
