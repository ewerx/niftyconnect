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
        sx={{ pt: 10,
          pb: 60 }}
      >
        <Grid item align="center" sx={{ pt: 6 }}>
          <ConnectWallet />
        </Grid>
        <Grid item align="center">
          <Link to="/profilehome">
            <Button variant="outlined" color="primary">
              Wallet Connected
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
