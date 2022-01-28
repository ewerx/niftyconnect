import React, { useState, useEffect} from "react";
import { Grid, Button } from "@mui/material";
import { requestAccount } from "../utils/common";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function Socialgraph() {

  const [account, setAccount] = useState("");

  useEffect(async () => {
    const accounts = await requestAccount();
    setAccount(accounts[0]);
  });

  return (
    <Grid container direction="row" justifyContent="center" spacing="50">
      <Grid item md={12} textAlign="center">
        <h1>Social Graph</h1>
        <Button variant="outlined" sx={{height: '15%', pb: 0}}>
          <p>{account.substring(0,4)}***{account.substring(4,7)} Connected</p>
        </Button>
      </Grid>
      <Grid item md={6} textAlign="center" sx={{height: '40%', pt: 0}}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIolqCfnkvob1BEoALzK3wZdwYAEmAvUuOtAi8IwSshYzogYSz6QO_TBPsyGScmKlMgg&usqp=CAU" alt="" />
      </Grid>
      <Grid item md={6} textAlign="center" sx={{height: '40%', pt: 0}}>
        <h1>ape102.eth</h1>
      </Grid>
      <Grid item md={6} textAlign="center">
        <h1>Followers</h1>
      </Grid>
      <Grid item md={6} textAlign="center">
        <h1>Following</h1>
      </Grid>
    </Grid>
  );
}
