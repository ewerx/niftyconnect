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
    Avatar private _avatarInfo;

    // events

    event NewProfile(uint256 tokenId, address owner);
    event SetAvatar(uint256 tokenId, address avatarContract, uint256 avatarId, string avatarURI);

    // functions

    constructor() {
    }

    // contract owner can mint to anyone, anyone can mint to themself, unlimited supply
    function mint(address to) external returns (uint256) {
        require(msg.sender == owner() || msg.sender == to, "mint not allowed");

        uint256 newProfileId = _tokenIds.current();
        _safeMint(to, newProfileId);

        //console.log("Minted profile: %s", newProfileId);
        emit NewProfile(newProfileId, to);

        _tokenIds.increment();

        return newProfileId;
    }

    // associate an avatar with a profile. must be owner of both tokens.
    function setAvatar(address avatarContractAddrs, uint avatarTokenId, uint niftyTokenId) public {
        require(msg.sender == ERC721.ownerOf(niftyTokenId), "not profile owner");

        ERC721 avatarNFT = ERC721(avatarContractAddrs);
        require(msg.sender == avatarNFT.ownerOf(avatarTokenId), "not avatar owner");

        _avatarInfo.nftContract = avatarContractAddrs;
        _avatarInfo.tokenId = avatarTokenId;

        emit SetAvatar(niftyTokenId, avatarContractAddrs, avatarTokenId, tokenURI(niftyTokenId));

        // console.log("avatar: %s/%s => profile %s", avatarContractAddrs, avatarTokenId, niftyTokenId);
    }

    // pass through to avatar contract
    function tokenURI(uint256 /*tokenId*/) public view virtual override(ERC721) returns (string memory) {
        //TODO: return a default profile URI if avatar is not set
        IERC721Metadata avatarNFT = IERC721Metadata(_avatarInfo.nftContract);
        return avatarNFT.tokenURI(_avatarInfo.tokenId);
    }

    // modifiers
}
