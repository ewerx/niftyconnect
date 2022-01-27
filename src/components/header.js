import React from "react";
import { Box, Typography, Grid } from "@mui/material/";
import { Link } from "react-router-dom";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function Header() {
  return (
    <>
      <Box
        sx={{
          height: 50
        }}
      >
        <Grid container direction="row" justifyContent="center">
          <Grid item md={12} textAlign="center">
            <Link to="/">
              <Typography variant="h4" color="#1976d2">
                NiftyConnect
              </Typography>
            </Link>
            <Grid item textAlign="center">
              <Typography
                variant="h6"
                color="black"
                sx={{ pt: 0,
                    pb: 2 }}
                
              >
                Create your decentralised social graph <span> 😎 </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
