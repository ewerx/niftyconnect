import * as React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/header.js";
import ConnectWallet from "../components/buttons/connectwallet.js";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/0/05/Sna_large.png")`
      }}
    >
      <Header />
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        sx={{ pt: 5,
          pb: 60 }}
      >
        <Grid item align="center" sx={{ pt: 3 }}>
          <ConnectWallet />                               // Redirects user to social graph page if already have address=>tokenID else to mint profile page.
        </Grid>
        {/* <Grid item align="center" sx={{pt: 1}}>
          <Link to="/mintprofile">
          <Button variant="contained" color="primary">
      Mint Token
    </Button>
          </Link>
        </Grid> */}
      </Grid>
    </div>
  );
}
