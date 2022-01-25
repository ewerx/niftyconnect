import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function ConnectWallet() {
  return (
    <Link to="/mintprofile">
      <Button variant="outlined" color="primary">
        Connect Wallet
      </Button>
    </Link>
  );
}
