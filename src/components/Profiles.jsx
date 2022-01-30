import { useQuery, gql } from '@apollo/client';

export default function Profiles () {
  const profiles = gql`
    query GetProfiles {
      profiles {
        tokenID
        contentURI
        followers {
          tokenID
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(profiles);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 😭</p>;

  return data.profiles.map(({ tokenID, contentURI, followers }) => (
    <div key={tokenID}>
      <p>contentURI: {contentURI}</p>
    </div>
  ));
}
