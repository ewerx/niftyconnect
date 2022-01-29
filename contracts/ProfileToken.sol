// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ProfileToken is ERC721("NiftyConnect", "NFTC"), Ownable {
    using Counters for Counters.Counter;

    // data

    Counters.Counter public _tokenIds;

    struct Avatar {
        address nftContract;
        uint256 tokenId;
    }
    // map NiftyConnect tokens to Avatars
    mapping(uint256 => Avatar) private _avatars;

    // events

    event NewProfile(uint256 tokenId, address owner);
    event SetAvatar(
        uint256 indexed tokenId,
        address avatarContract,
        uint256 avatarId,
        string avatarURI
    );

    // functions

    constructor() {}

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
    function setAvatar(
        address avatarContractAddrs,
        uint256 avatarTokenId,
        uint256 niftyTokenId
    ) public {
        require(
            msg.sender == ERC721.ownerOf(niftyTokenId),
            "not profile owner"
        );

        ERC721 avatarNFT = ERC721(avatarContractAddrs);
        require(
            msg.sender == avatarNFT.ownerOf(avatarTokenId),
            "not avatar owner"
        );

        _avatars[niftyTokenId].nftContract = avatarContractAddrs;
        _avatars[niftyTokenId].tokenId = avatarTokenId;

        // Get the TokenURI for the Avatar NFT
        string memory avatartokenURI = avatarNFT.tokenURI(avatarTokenId);

        emit SetAvatar(
            niftyTokenId,
            avatarContractAddrs,
            avatarTokenId,
            avatartokenURI
        );
    }

    // pass through to avatar contract
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721)
        returns (string memory)
    {
        require(_exists(tokenId), "non-existent token");
        IERC721Metadata avatarNFT = IERC721Metadata(_avatars[tokenId].nftContract);
        return avatarNFT.tokenURI(_avatars[tokenId].tokenId);
    }

    // modifiers
}
