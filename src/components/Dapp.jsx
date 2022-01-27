import { useState } from "react";
import contractArtifact from "../abis/ProfileGraphContract.json";
import contractAddress from "../abis/contract-address.json"
import { mint, follow, unfollow } from "../utils";
import { requestAccount } from "../utils/common";
import { Button, Container, Grid, Stack, TextField } from "@mui/material";

export default function Dapp() {
  // state
  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState("0x");
  const [, setMintLoading] = useState(false);
  const [followRequester, setFollowRequester] = useState("");
  const [followed, setFollowed] = useState("");
  const [, setFollowLoading] = useState(false);
  const [, setUnfollowLoading] = useState(false);
  const [unfollowRequester, setUnfollowRequester] = useState("");
  const [unfollowed, setUnfollowed] = useState("");

  const CONTRACT_ADDR = contractAddress.ProfileGraph;

  async function handleConnectWallet() {
    const accounts = await requestAccount();
    setLogin(true);
    setAccount(accounts[0]);
  }

  async function handleMint() {
    setMintLoading(true);
    try {
      await mint(CONTRACT_ADDR, contractArtifact, window.ethereum.selectedAddress);
    } catch (err) {
      console.error("handleMint error");
    }
    setMintLoading(false);
  }

  async function handleFollow() {
    setFollowLoading(true);
    try {
      await follow(CONTRACT_ADDR, contractArtifact, followRequester, followed);
    } catch (err) {
      console.error("handleFollow error");
    }
    setFollowRequester("");
    setFollowed("");
    setFollowLoading(false);
  }

  async function handleUnfollow() {
    setUnfollowLoading(true);
    try {
      await unfollow(CONTRACT_ADDR, contractArtifact, unfollowRequester, unfollowed);
    } catch (err) {
      console.error("handleUnfollow error");
    }
    setUnfollowLoading(false);
    setUnfollowRequester("");
    setUnfollowed("");
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Grid>
          {
            !login
            ? <Button variant="contained" onClick={handleConnectWallet}>Connect Wallet</Button> 
            : <Button variant="outlined">{account}</Button>
          }
        </Grid>
        <Grid>
          <Button variant="contained" onClick={handleMint}>Mint NFT</Button>
        </Grid>
        <Grid>
          <TextField id="standard-basic" label="from TokenId" variant="standard" onChange={(e) => setFollowRequester(e.target.value)}/>
          <TextField id="standard-basic" label="to TokenId" variant="standard" onChange={(e) => setFollowed(e.target.value)}/>
          <Button variant="text" onClick={handleFollow}>Follow</Button>
        </Grid>
        <Grid>
          <TextField id="standard-basic" label="from TokenId" variant="standard" onChange={(e) => setUnfollowRequester(e.target.value)}/>
          <TextField id="standard-basic" label="to TokenId" variant="standard" onChange={(e) => setUnfollowed(e.target.value)}/>
          <Button variant="text" onClick={handleUnfollow}>Follow</Button>
        </Grid>
      </Stack>
    </Container>
    
  );
}
