import React from "react";
import { Grid } from "@mui/material";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function Socialgraph() {
  return (
    <Grid container direction="row" justifyContent="center" spacing="50">
      <Grid item md={12} textAlign="center">
        <h1>Social Graph</h1>
      </Grid>
      <Grid item md={6} textAlign="center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIolqCfnkvob1BEoALzK3wZdwYAEmAvUuOtAi8IwSshYzogYSz6QO_TBPsyGScmKlMgg&usqp=CAU" alt="" />
      </Grid>
      <Grid item md={6} textAlign="center">
        <h1>ape102.eth</h1>
        <p>address</p>
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
