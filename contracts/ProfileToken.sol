// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ProfileToken is 
    ERC721("NiftyConnect", "NFTC"),
    Ownable 
{
    using Counters for Counters.Counter;

    Counters.Counter public _tokenIds;

    event NewProfile(uint256 tokenId, address owner);

    constructor() {
    }

    // contract owner can mint to anyone, anyone can mint to themself, unlimited supply
    function mint(address to) public returns (uint256) {
        require(msg.sender == owner() || msg.sender == to, "mint not allowed");

        uint256 newProfileId = _tokenIds.current();
        _safeMint(to, newProfileId);

        // console.log("Minted profile: %s to %s", newProfileId, to);
        emit NewProfile(newProfileId, to);

        _tokenIds.increment();

        return newProfileId;
    }
}
