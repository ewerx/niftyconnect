const hre = require("hardhat");

async function main() {
    if (!network.name) {
        console.warn(
            "Use the hardhat option '--network name', from hardhat.config.js -> networks"
        );
    }

    const [deployer] = await hre.ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const [ProfileToken, ProfileGraph] = await Promise.all([
        await hre.ethers.getContractFactory("ProfileToken"),
        await hre.ethers.getContractFactory("ProfileGraph")
    ]);

    const [tokenContract, graphContract] = await Promise.all([
        await ProfileToken.deploy(),
        await ProfileGraph.deploy()
    ]);

    await Promise.all([
        await tokenContract.deployed(),
        await graphContract.deployed()
    ]);

    console.log("ProfileToken Contract address:", tokenContract.address);
    console.log("ProfileGraph Contract address:", graphContract.address);

    saveFrontendFiles(tokenContract, "ProfileToken");
    saveFrontendFiles(graphContract, "ProfileGraph");
}

function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const path = require("path");

    const contractsDir = path.join(__dirname, "..", "/src/abis");

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    let artifact = {};
    // if artifact already exists, we use it and just add a new key to it
    if (fs.existsSync(`${contractsDir}/contract-address.json`)) {
        artifact = JSON.parse(fs.readFileSync(`${contractsDir}/contract-address.json`));
    }
    artifact[name] = contract.address;

    fs.writeFileSync(
        `${contractsDir}/contract-address.json`,
        JSON.stringify(artifact, undefined, 2)
    );

    const ContractArtifact = artifacts.readArtifactSync(name);

    fs.writeFileSync(
        `${contractsDir}/${name}Contract.json`,
        JSON.stringify(ContractArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });