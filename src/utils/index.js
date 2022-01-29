import { requestAccount, getContract } from "./common";

async function mint(contractAddr, artifact, walletAddr) {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    await requestAccount();

    const contract = getContract(contractAddr, artifact);

    try {
      const transaction = await contract.mint(walletAddr);
      await transaction.wait();
    } catch (err) {
      console.error(err, "minting error");
    }
  }
}

async function follow(contractAddr, artifact, myTokenId, tokenIdToFollow) {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();

    const contract = getContract(contractAddr, artifact);

    try {
      const transaction = await contract.follow(myTokenId, tokenIdToFollow);
      await transaction.wait();
    } catch (err) {
      console.error(err, "follow error");
    }
  }
}

async function unfollow(contractAddr, artifact, myTokenId, tokenIdToUnfollow) {
  if (typeof window.ethereum !== "undefined") {
    console.log('MetaMask is installed!');
    await requestAccount();

    const contract = getContract(contractAddr, artifact);

    try {
      const transaction = await contract.unfollow(myTokenId, tokenIdToUnfollow);
      await transaction.wait();
    } catch (err) {
      console.error(err, "unfollow error");
    }
  }
}

export { mint, follow, unfollow };
