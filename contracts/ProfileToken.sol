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

    // data

    Counters.Counter public _tokenIds;

    struct Avatar {
        address nftContract;
        uint256 tokenId;
    }

    // events

    event NewProfile(uint256 tokenId, address owner);

    // functions

    constructor() {
    }

    // contract owner can mint to anyone, anyone can mint to themself, unlimited supply
    function mint(address to) public returns (uint256) {
        require(msg.sender == owner() || msg.sender == to, "mint not allowed");

        uint256 newProfileId = _tokenIds.current();
        _safeMint(to, newProfileId);

        //console.log("Minted profile: %s", newProfileId);
        emit NewProfile(newProfileId, to);

        _tokenIds.increment();

        return newProfileId;
    }

    //TODO: interface to link avatar NFT to profile NFT

    //TODO: override ERC721 methods for fetching metadata to wrap the Avatar

    // modifiers
}
