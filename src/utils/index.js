import { requestAccount, getContract } from './common';

async function getBalance (contractAddr, artifact, walletAddr) {
  let balance = 0;
  const contract = getContract(contractAddr, artifact);
  balance = await contract.balanceOf(walletAddr);
  // console.log(balance);

  try {
    balance = await contract.balanceOf(walletAddr);
    // console.log(balance);
  } catch (err) {
    console.error(err, 'follow error');
  }
  return balance;
}

async function mint(contractAddr, artifact) {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is not installed!");
    const accounts = await requestAccount();
    const address = accounts[0];

    const contract = getContract(contractAddr, artifact);

    try {
      const transaction = await contract.mint(address);
      await transaction.wait();
      console.log(transaction);
    } catch (err) {
      console.error(err, 'minting error');
    }
  }
}

async function follow (contractAddr, artifact, myTokenId, tokenIdToFollow) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount();

    const contract = getContract(contractAddr, artifact);

    try {
      const transaction = await contract.follow(myTokenId, tokenIdToFollow);
      await transaction.wait();
    } catch (err) {
      console.error(err, 'follow error');
    }
  }
}

async function unfollow (contractAddr, artifact, myTokenId, tokenIdToUnfollow) {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is not installed!');
    await requestAccount();

    const contract = getContract(contractAddr, artifact);

    try {
      const transaction = await contract.unfollow(myTokenId, tokenIdToUnfollow);
      await transaction.wait();
    } catch (err) {
      console.error(err, 'unfollow error');
    }
  }
}

export { mint, follow, unfollow, getBalance };
