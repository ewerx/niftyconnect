import React from "react";
import { Button } from "@mui/material";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function Mint() {
  return (
    <Button variant="contained" color="primary">
      Mint Token
    </Button>
  );
}
