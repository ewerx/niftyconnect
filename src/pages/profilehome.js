
import { Grid, Container } from '@mui/material';
import React, {useEffect, useState} from "react";
import UserTokens from '../components/UserTokens';
import { requestAccount } from '../utils/common.js';
import { UserTokens } from '../components/UserTokens';

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
    </>
  );
}
