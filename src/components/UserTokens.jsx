import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { userProfiles } from '../utils/queries';

import styled from '@emotion/styled';
import { Grid, Container } from '@mui/material';

import Socialgraph from './socialgraph';

const UserTokensWrapper = styled.div`
  border: 1px solid #000;
`;
export default function UserTokens ({ accountId }) {
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const { loading, error, data } = useQuery(userProfiles,
    { variables: { accountId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 😭</p>;
  if (!data.user.length) return <p>No user found</p>;

  const profiles = data?.user[0].profiles;
  return (
    <>
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <UserTokensWrapper>
              {profiles.map((profile, index) => (
                <UserToken
                  profile={profile}
                  key={`${profile.tokenID}-${index}`}
                  updateProfileId={setSelectedProfileId}
                  isSelected={profile.tokenID === selectedProfileId}
                />
              ))}
            </UserTokensWrapper>
          </Grid>
          <Grid item xs={8}>
            <Socialgraph selectedProfileId={selectedProfileId} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const UserTokenWrapper = styled.div`
  border: 1px solid ${({ isSelected }) => isSelected ? 'red' : 'transparent'};
`;
function UserToken ({ profile, updateProfileId, isSelected }) {
  const { tokenID, contentURI } = profile;
  const [tokenURI, setTokenURI] = useState('');
  useEffect(() => {
    fetchTokenURI(contentURI).then(tokenURI => {
      setTokenURI(tokenURI);
    });
  }, []);
  return (
    <UserTokenWrapper
      isSelected={isSelected}
      onClick={() => updateProfileId(tokenID)}
    >
      {
        tokenURI && (
          <img src={tokenURI} />
        )
      }
    </UserTokenWrapper>
  );
}

async function fetchTokenURI (contentURI) {
  let tokenURI = '';
  if (contentURI) {
    const res = await fetch(contentURI);
    const json = await res.json();
    debugger;
    tokenURI = json.image;
  }
  return tokenURI;
}
