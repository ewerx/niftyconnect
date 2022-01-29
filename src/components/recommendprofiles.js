import React from "react";
import Profile from "./profilecard";
import profiles from "../demoprofiles.js"; {/* Importing Demo profiles */}
import { Grid } from "@mui/material";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function Recommend() {
  return (
    <Grid container direction="row" justifyContent="center" spacing="50">
      {profiles.map((pfp) => (
        <Grid item>
          <Profile                                {/* Mapping demo profiles to Profile component */}
            key={pfp.key}
            ens={pfp.ens}
            img={pfp.imgURL}
            addr={pfp.addr}
          />
        </Grid>
      ))}
    </Grid>
  );
}
