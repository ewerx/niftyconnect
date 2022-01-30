import { Grid, Container } from '@mui/material';
import UserTokens from '../components/UserTokens';

export default function ProfileHome () {
  return (
    <>
      <UserTokens accountId='0x7c281214ea57273634b6f22a83958495be66b38e' />
      {/* <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={4}>

          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4} />
        </Grid>
      </Container> */}
    </>
  );
}
