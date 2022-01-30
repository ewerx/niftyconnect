// profile cards used in recommendprofiles.js

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function ProfileCard (props) {
  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            height='200'
            image={props.img}
            // alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {props.ens}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {props.addr}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            Follow
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
