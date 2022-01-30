import React, { useState } from 'react';
import Header from '../components/header.js';
import { getContract } from '../utils/common';
import contractArtifact from '../abis/ProfileGraphContract.json';
import contractAddress from '../abis/contract-address.json';
import { mint } from '../utils';
import { Link } from "react-router-dom";
import { Grid, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';


export default function MintProfile () {
  const [minted, setMintStatus] = useState(false);
  const [tokenID, setTokenID] = useState(0);
  const [avatarThere, setavatarThere] = useState(false);
  const [avtContract, setavtContract] = useState("");
  const [avtID, setavtID] = useState(0);

  const CONTRACT_ADDR = contractAddress.ProfileGraph;
  const contract = getContract(CONTRACT_ADDR, contractArtifact);

  async function handleMint () {
    try {
      await mint(CONTRACT_ADDR, contractArtifact);
      alert("Minted!!");
      contract.on('NewProfile', (tokenId, owner, event) => {
        // Should be logging the event data.
        const eventDetails = {
          token: tokenId, 
          ownedBy: owner, 
          data: event
        };  
        const id = parseInt(eventDetails.token, 16);
        setTokenID(id);
      });
      
    } catch (err) {
      console.error('handleMint error');
    }
    setMintStatus(true);
    
  }

  function updateavtContract(e) {
    setavtContract(e.target.value);
  }

  function updateavtID(e) {
    setavtID(e.target.value);
  }


  async function callSetAvatar () {

    console.log(avtContract, avtID, tokenID);
    try {

      await contract.setAvatar(CONTRACT_ADDR, contractArtifact, avtContract, avtID, tokenID);
      alert("Avatar is set. Click the button to proceed to your social graph!!");
    } catch (err) {
      console.error('handleMint error');
    }

    setavatarThere(true);
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
            </Grid>
            </>
          : <>
            {
              !avatarThere
              ? <> 
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

                    {/* Input PFP contract address */}

                    <TextField
                      id='avatar'
                      placeholder='0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            
                          </InputAdornment>
                        )
                      }}
                      variant='standard'
                      onChange={updateavtContract}
                    />
                    <Typography variant='h5' color='#1976d2' sx={{ pt: 3 }}>
                      TokenID  
                    </Typography>

                      {/* Input PFP TokenID */}

                    <TextField
                      id='ens'
                      placeholder='e.g. 45'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            
                          </InputAdornment>
                        )
                      }}
                      variant='standard'
                      onChange={updateavtID}
                    />
                  </form>
                  <Grid item lg={12} sx={{ pt: 3 }}> 
                    <Button variant='contained' color='primary' onClick={callSetAvatar}> 
                      Set PFP
                    </Button>
                  </Grid>
                </Grid>             
               </>
              : <> 
                  <Grid item lg={12} sx={{ pt: 3 }}>
                      <Link to='/profilehome'>
                        <Button variant="contained">My Profile</Button>;
                      </Link>
                  </Grid>
                </> 
            }
            
            </>
        }

      </Grid>
    </div>
  );
}
