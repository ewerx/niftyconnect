// profile home page

import * as React from 'react';
import { Grid } from '@mui/material';
import Header from '../components/header.js';
import RecommendProfiles from '../components/recommendprofiles';
import Socialgraph from '../components/socialgraph.js';

export default function ProfileHome () {
  return (
    <>
      {/* <StyledEngineProvider injectFirst> */}
      <Header />
      <Grid
        container
        direction='row'
        justifyContent='center'
        spacing='50'
        sx={{ pt: 10 }}
      >
        <Grid item md={8} alignItems='center'>
          <Socialgraph />      {/* Social Graph of the connected user */}
        </Grid>
        <Grid item md={4}>
          <h1>You may know</h1>
          <RecommendProfiles /> {/* Map users here from subgraph */}
        </Grid>
      </Grid>
      {/* </StyledEngineProvider> */}
    </>
  );
}
