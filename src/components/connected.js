import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

require('react-dom');
window.React2 = require('react');
// console.log(window.React1 === window.React2);

export default function Connected (props) {
  const status = props.pExists;

  if (status === true) {
    return (
      <Link to='/profilehome'>
        <Button>My Profile</Button>;
      </Link>
    );
  } else {
    return (
      <Link to='/mintprofile'>
        <Button>Mint Profile</Button>;
      </Link>
    );
  }
}
