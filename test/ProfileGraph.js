const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Profile Graph", () => {
    let ProfileGraph, profileGraph;
    let owner, account1, account2, account3;

    beforeEach(async () => {
        ProfileGraph = await ethers.getContractFactory("ProfileGraph");
        profileGraph = await ProfileGraph.deploy();

        const accounts = await ethers.getSigners();
		owner = accounts[0];
		account1 = accounts[1];
        account2 = accounts[2];
        account3 = accounts[3];

        await profileGraph.deployed();
    });

    describe("profile token", function () {
		it("should mint from owner or mint account holder", async function () {
			await expect(profileGraph.connect(owner).mint(account1.address))
                .to.emit(profileGraph, "NewProfile")
                .withArgs(0, account1.address);
            await expect(profileGraph.connect(account1).mint(account1.address))
                .to.emit(profileGraph, "NewProfile")
                .withArgs(1, account1.address);
		})

        it("should revert when minting to another account", async function () {
			await expect(profileGraph.connect(account1).mint(account2.address))
                .to.be.revertedWith("mint not allowed");
		})

        it("should emit follow event on follow", async function () {
            await profileGraph.mint(account1.address) // 0
            await profileGraph.mint(account2.address) // 1
			await expect(profileGraph.connect(account1).follow(1, 0))
                .to.emit(profileGraph, "Follow")
                .withArgs(0, 1);
            await expect(profileGraph.connect(account2).follow(0, 1))
                .to.emit(profileGraph, "Follow")
                .withArgs(1, 0);
		})

        it("should emit unfollow event on follow", async function () {
            await profileGraph.mint(account1.address) // 0
            await profileGraph.mint(account2.address) // 1
            await profileGraph.connect(account1).follow(1, 0)
			await expect(profileGraph.connect(account1).unfollow(1, 0))
                .to.emit(profileGraph, "Unfollow")
                .withArgs(0, 1);
		})

        it("should throw error when trying to repeat follow again", async function () {
            await profileGraph.mint(account1.address) // 0
            await profileGraph.mint(account2.address) // 1
            await expect(profileGraph.connect(account1).follow(1, 0))
                .to.emit(profileGraph, "Follow")
                .withArgs(0, 1);
            await expect(profileGraph.connect(account1).follow(1, 0))
                .to.be.revertedWith("duplicate");           
            })

        it("should throw error when trying to follow herself", async function () {
            await profileGraph.mint(account1.address) // 0
            await expect(profileGraph.connect(account1).follow(0, 0))
                .to.be.revertedWith("self");     
        })

        it("should throw error when unfollow on nonexsiting follow (1)", async function () {
            await profileGraph.mint(account1.address) // 0
            await profileGraph.mint(account2.address) // 1
            await expect(profileGraph.connect(account1).unfollow(1, 0))
                .to.be.revertedWith("not followed");                  
        })

        it("should throw error when unfollow on nonexsiting follow (2)", async function () {
            await profileGraph.mint(account1.address) // 0
            await profileGraph.mint(account2.address) // 1
            await profileGraph.mint(account2.address) // 2
            await profileGraph.connect(account1).follow(1, 0) // 0 follows 1
            await expect(profileGraph.connect(account1).unfollow(2, 0))
                .to.be.revertedWith("not followed");                  
        })
	});

});