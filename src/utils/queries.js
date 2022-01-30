import { gql } from '@apollo/client';

// TODO: get profiles that match an owner.id
const profiles = gql`
  query getProfiles {
    profiles {
      id
      tokenID
      owner {
        id
      }
    }
  }
`;

const following = gql`
  query getFollowingList {
    followingList: followers(where:{tokenID: $tokenId}) {
      ...fields
    }
  }

  fragment fields on Follower {
    # this is the token being followed
    Token: following {
      tokenID
      contentURI
      metadataURI
    }
  }
`;
