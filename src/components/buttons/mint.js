// mint button in mintprofile page

import React, { useState } from 'react';
import { Button } from '@mui/material';
import contractArtifact from '../../abis/ProfileGraphContract.json';
import contractAddress from '../../abis/contract-address.json';
import { mint } from '../../utils';

export default function Mint () {
  const [, setMintLoading] = useState(false);

  const CONTRACT_ADDR = contractAddress.ProfileGraph;

  async function handleMint () {
    setMintLoading(true);
    try {
      await mint(CONTRACT_ADDR, contractArtifact, window.ethereum.selectedAddress);
    } catch (err) {
      console.error('handleMint error');
    }
    setMintLoading(false);
  }

  return (
    <Button variant='contained' color='primary' onClick={handleMint}>
      Mint Token
    </Button>
  );
}
