import { ApolloClient, InMemoryCache } from '@apollo/client'

const SUBGRAPH_API_URL = "https://api.thegraph.com/subgraphs/name/ewerx/niftyconnect-subgraph";

export default new ApolloClient({
  uri: SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
});