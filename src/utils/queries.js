import { gql } from '@apollo/client';

/**
 * Get all profiles that belong to the user.
 * Pass the property `variables: { id: accountIdOfUser }` with the query.
 * i.e. 0x7c281214ea57273634b6f22a83958495be66b38e
 */
const userProfiles = gql`
  query getUserProfiles($accountId: String!) {
    user: users(where: {id: $accountId}) {
      id
      profiles {
        tokenID
        contentURI
      }
    }
  }
`;

/**
 * Filter a list of profiles by tokenId, to get "profiles followed by me".
 * Pass the property `variables: { tokenId: tokenIdOfUser }` with the query.
 */
const following = gql`
  query getFollowing($tokenId: String!) {
    following: followers(where:{tokenID: $tokenId}) {
      ...fields
    }
  }

  fragment fields on Follower {
    # this is the token being followed
    Token: following {
      tokenID
      contentURI
    }
  }
`;

/**
 * Get list of followers, "profiles that follow me"
 * Pass the property `variables: { tokenId: tokenIdOfUser }` with the query.
 */
const followers = gql`
  query getFollowers($tokenId: String!) {
    followers(where:{tokenID: $tokenId}) {
      tokenID
      profile: following {
        tokenID
        contentURI
      }
    }
  }
`;

export { userProfiles, followers, following };
