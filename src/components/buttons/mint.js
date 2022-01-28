//mint button in mintprofile page

import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import contractArtifact from "../../abis/ProfileGraphContract.json";
import contractAddress from "../../abis/contract-address.json";
import { mint, follow, unfollow } from "../../utils";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function Mint() {

  const [, setMintLoading] = useState(false);

  const CONTRACT_ADDR = contractAddress.ProfileGraph;

  async function handleMint() {
    setMintLoading(true);
    try {
      await mint(CONTRACT_ADDR, contractArtifact, window.ethereum.selectedAddress);
    } catch (err) {
      console.error("handleMint error");
    }
    setMintLoading(false);
  }

  return (
    <Button variant="contained" color="primary" onClick={handleMint}>
      Mint Token
    </Button>
  );
}
