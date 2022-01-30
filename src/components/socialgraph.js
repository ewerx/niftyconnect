// social graph component (on left portion of profilehome, below header)

import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { requestAccount } from '../utils/common';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Socialgraph () {
  const [account, setAccount] = useState('');

  useEffect(() => {
    async function doSomething () {
      const accounts = await requestAccount();
      setAccount(accounts[0]);
    }
    doSomething();
  }, []);

  return (
    <Grid container direction='row' justifyContent='center' spacing='50'>
      <Grid item md={12} textAlign='center'>
        <h1>Social Graph</h1>
      </Grid>
      <Grid item md={6} textAlign='center' sx={{ height: '40%', pt: 0 }}>
        {/* vv PFP token image should be mapped here */}
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIolqCfnkvob1BEoALzK3wZdwYAEmAvUuOtAi8IwSshYzogYSz6QO_TBPsyGScmKlMgg&usqp=CAU' alt='' />
        <h1>ape102.eth</h1>
      </Grid>
      <Grid item md={6} textAlign='center' sx={{ height: '40%', pt: 0 }}>
        <h3>Address</h3>
        <p>{account}</p>
      </Grid>
      <Grid item md={6} textAlign='center'>
        <h1>Followers</h1>  {/* List followers and follower count of connected user */}
      </Grid>
      <Grid item md={6} textAlign='center'>
        <h1>Following</h1>  {/* List followings and following count of connected user */}
      </Grid>
    </Grid>
  );
}
