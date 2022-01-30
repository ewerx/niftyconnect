import React from 'react';
import { Link } from 'react-router-dom';
import { Button,Grid } from '@mui/material';

require('react-dom');
window.React2 = require('react');
// console.log(window.React1 === window.React2);

export default function Connected (props) {
  const status = props.pExists;

  if (status === true) {
    return (
      <>
      <Grid item md={12} sx={{ pt: 5 }}>
        <Link to='/profilehome'>
          <Button variant ="contained">My Profile</Button>
        </Link>
      </Grid>
      <Grid item md={12} sx={{ pt: 5, pb: 10 }}>
        <Link to='/mintprofile'>
          <Button variant ="contained">Mint Profile</Button>
        </Link>
      </Grid>
      </>
    );
  } else {
    return (
      <>
      <Grid item md={12} sx={{ pt: 5, pb: 10 }}>
        <Link to='/mintprofile'>
          <Button variant ="contained">Mint Profile</Button>
        </Link>
      </Grid>
      <Grid item md={12} sx={{ pt: 5 }}>
        <Link to='/profilehome'>
          <Button variant ="contained">My Profile</Button>
        </Link>
      </Grid>
      </>
    );
  }
}
