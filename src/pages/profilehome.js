import { Grid, Container } from '@mui/material';
import React, {useEffect, useState} from "react";
import UserTokens from '../components/UserTokens';
import { requestAccount } from '../utils/common.js';

export default function ProfileHome () {

  const[address, setAddress] = useState('0x');

  useEffect(() => {
    async function fetchAccount() {
      const accounts = await requestAccount();
      setAddress(accounts[0]);
    }
    fetchAccount();
    
  }, [address]);

  return (
    <>
      <UserTokens accountId={address} />
      {/* <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={4}>

          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4} />
        </Grid>
      </Container> */}
    </>
  );
}
