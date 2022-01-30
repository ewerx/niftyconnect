import React, { useState, useEffect } from 'react';
import contractAddress from '../abis/contract-address.json';
import contractArtifact from '../abis/ProfileGraphContract.json';
import { useQuery } from '@apollo/client';
import { Button, Grid } from '@mui/material';
import { followers, following }  from '../utils/queries';
import { follow, unfollow } from '../utils';

export default function SocialGraph ({ tokenId }) {
  const [unfollowRequester, setUnfollowRequester] = useState('');
  const [, setUnfollowLoading] = useState(false);
  const [unfollowed, setUnfollowed] = useState('');
  const CONTRACT_ADDR = contractAddress.ProfileGraph;

  const { loading, error, data } = useQuery(followers,
    { variables: { tokenId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Select Profile Token!</p>;
  if (!data.followers.length) return <p>No followers found</p>;

  const followerList = data.followers.map(({ profile }) => profile);

  async function handleUnfollow (unfollowed, unfollowRequester) {
    setUnfollowLoading(true);
    try {
      await unfollow(CONTRACT_ADDR, contractArtifact, unfollowed, unfollowRequester);
    } catch (err) {
      console.error('handleUnfollow error');
    }
    setUnfollowLoading(false);
    setUnfollowRequester('');
    setUnfollowed('');
  }
  
  return (
    <Grid container direction='row' justifyContent='center' spacing='50'>
      <Grid item md={12} textAlign='center'>
        <h1>Social Graph</h1>
      </Grid>
      <Grid item md={6} textAlign='center' sx={{ height: '40%', pt: 0 }}>
        <h1>Followers</h1>
        {followerList.map((profile, index) => (
          <Follower 
            profile={profile}
            myTokenId={tokenId}
            key={`${profile.tokenID}-${index}`}
            handleUnfollow={handleUnfollow}
          />
        ))}
      </Grid>
      <Grid item md={6} textAlign='center' sx={{ height: '40%', pt: 0 }}>
        {/** TODO */}
      </Grid>
    </Grid>
  );
}

const Follower = function({ profile, myTokenId, handleUnfollow }) {
  const { tokenID, contentURI } = profile;
  const [tokenURI, setTokenURI] = useState('');
  
  useEffect(() => {
    fetchTokenURI(contentURI).then(tokenURI => {
      setTokenURI(tokenURI);
    });
  }, []);

  return (
    <>
      <p>{`NFTC#${tokenID}`}</p>
      {
        tokenURI && (
          <img src={tokenURI} />
        )
      }
      <Button variant='text' onClick={() => handleUnfollow(tokenID, myTokenId)}>Unfollow</Button>
    </>
  );
}

const fetchTokenURI = async function (contentURI) {
  let tokenURI = '';
  if (contentURI) {
    const res = await fetch(contentURI);
    const json = await res.json();
    tokenURI = json.image;
  }
  return tokenURI;
}
