import React, { useState } from 'react';
import Header from '../components/header.js';
import contractArtifact from '../abis/ProfileGraphContract.json';
import contractAddress from '../abis/contract-address.json';
import { mint } from '../utils';
import { requestAccount } from '../utils/common.js';
// import { Link } from "react-router-dom";
// import MintProfile from "../components/buttons/mint.js";
import { Grid, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// import EditIcon from "@mui/icons-material/Edit";

export default function MintProfile () {
  const [minted, setMintStatus] = useState(false);

  const CONTRACT_ADDR = contractAddress.ProfileGraph;

  async function handleMint () {
    try {
      await requestAccount();
      await mint(CONTRACT_ADDR, contractArtifact, window.ethereum.selectedAddress);
    } catch (err) {
      console.error('handleMint error');
    }
    setMintStatus(true);
  }

  return (
    <div className='Minter'>
      <Header />
      <br />
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >

        {
        !minted
          ? <>
            <Grid item lg={12} sx={{ pt: 10 }} textAlign='center'>
              <Typography variant='h4' color='#1976d2'>
                🧙‍♂️ Profile Minter
              </Typography>
            </Grid>
            <Grid item md={12} sx={{ pt: 5 }}>

              <Button variant='contained' color='primary' onClick={handleMint}>
                Mint Token
              </Button>
              {/* {alert("Minted!! Welcome to NiftyConnect :)")} */}
            </Grid>
            </>
          : <>
            <Grid item lg={12} sx={{ pt: 10 }} textAlign='center'>
              <Typography variant='h4' color='#1976d2'>
                Set Your PFP Avatar
              </Typography>
            </Grid>

            `<Grid item lg={12}>
              <form>
                <Typography variant='h5' color='#1976d2' sx={{ pt: 5 }}>
                  Contract Address
                </Typography>
                <TextField
                  id='avatar'
                  placeholder='0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {/* <AccountCircle /> */}
                      </InputAdornment>
                    )
                  }}
                  variant='standard'
                />
                <Typography variant='h5' color='#1976d2' sx={{ pt: 3 }}>
                  tokenID
                </Typography>

                <TextField
                  id='ens'
                  placeholder='e.g. name.eth'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {/* <AlternateEmailIcon /> */}
                      </InputAdornment>
                    )
                  }}
                  variant='standard'
                />
              </form>
              <Grid item lg={12} sx={{ pt: 3 }}>
                <Button variant='contained' color='primary'>
                  Set
                </Button>
              </Grid>
             </Grid>
            </>
        }

      </Grid>`
    </div>
  );
}
