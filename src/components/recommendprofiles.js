// recommend profiles component on right side of profilehome page, below header

import React from "react";
import { Grid } from "@mui/material";
import Profile from "./profilecard";
import profiles from "../demoprofiles.js"; {/* Importing Demo profiles */}

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function Recommend() {
  return (
    <Grid container direction="row" justifyContent="center" spacing="50">
      {profiles.map((pfp) => (
        <Grid item>
        {/* Mapping demo profiles to Profile component */}
          <Profile                                
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
