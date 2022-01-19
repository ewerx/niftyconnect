const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sample Contract", () => {
    let ProfileGraph, profileGraph;

    beforeEach(async () => {
        ProfileGraph = await ethers.getContractFactory("ProfileGraph");
        profileGraph = await ProfileGraph.deploy();
    });

    it("emit greeting event when greet function is called", async () => {
        expect(profileGraph.greet())
            .to
            .emit(profileGraph, "Greet")
            .withArgs("Hello World!");
    });

});