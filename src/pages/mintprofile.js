import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/header.js";
import MintProfile from "../components/buttons/mint.js";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EditIcon from "@mui/icons-material/Edit";

export default function mintProfile() {
  return (
    <div className="Minter">
      <Header />
      <br></br>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={12} sx={{ pt: 10 }} textAlign="center">
          <Typography variant="h4" color="#1976d2">
            🧙‍♂️ Profile Minter
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <form>
            <Typography variant="h5" color="#1976d2" sx={{ pt: 5 }}>
              🌈 Avatar
            </Typography>
            <TextField
              id="avatar"
              placeholder="e.g. https://opensea.io/assets/your-asset"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
              variant="standard"
            />
            <Typography variant="h5" color="#1976d2" sx={{ pt: 3 }}>
              ⚡ENS Address:
            </Typography>

            <TextField
              id="ens"
              placeholder="e.g. name.eth"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                )
              }}
              variant="standard"
            />

            <Typography variant="h5" color="#1976d2" sx={{ pt: 3 }}>
              ✍️ Tagline:
            </Typography>

            <TextField
              id="tagline"
              placeholder="e.g. To the moon🚀 ;)"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                )
              }}
              variant="standard"
            />
          </form>
        </Grid>
        <Grid item md={12} sx={{ pt: 5 }}>
         
            <MintProfile />
         
        </Grid>
      </Grid>
      {/* <p id="status">
        {status}
      </p> */}
    </div>
  );
}
