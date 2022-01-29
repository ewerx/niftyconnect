// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ProfileToken is IERC165,ERC165,
    ERC721("NiftyConnect", "NFTC"),
    Ownable 
{
    using Counters for Counters.Counter;

    Counters.Counter public _tokenIds;

    struct Avatar {
        address nftContract;
        uint256 tokenId;
    }

    Avatar private _avatarInfo;

    event NewProfile(uint256 tokenId, address owner);

    constructor() {
    }

    // contract owner can mint to anyone, anyone can mint to themself, unlimited supply
    function mint(address to) public returns (uint256) 
    {
        require(msg.sender == owner() || msg.sender == to, "mint not allowed");

        uint256 newProfileId = _tokenIds.current();

        _safeMint(to, newProfileId);


        emit NewProfile(newProfileId, to);

        _tokenIds.increment();

        return newProfileId;
    }

    // Set the Avatar NFT details
    function setAvatar(address avatarContractAddrs, uint avatarTokenId ) public
    {
        require (avatarTokenId >= 0, "Invalid Token Id");

        IERC721 ercToken = IERC721(avatarContractAddrs);

        //Check if the Contract address is a valid ERC721 token address
        require (ercToken.supportsInterface(type(IERC721).interfaceId)==true,"Invalid Contract Address" );

         // Store the Avatar Contract Info
        _avatarInfo.nftContract = avatarContractAddrs;
        _avatarInfo.tokenId = avatarTokenId;
     
     }

    // Get the tokenURI of the Avatar

    function tokenURI(uint256 tokenId) public view virtual override(ERC721)
        returns (string memory)
    {
        IERC721Metadata avatarNFT = IERC721Metadata(_avatarInfo.nftContract);

        //Check if the Contract address is a valid ERC721 token address
        //require (avatarNFT.supportsInterface(type(IERC721).interfaceId)==true,"Invalid Contract Address" );
    
        return avatarNFT.tokenURI(_avatarInfo.tokenId);
    }

    // check if the interface is of type ERC721
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165,ERC721) returns (bool) 
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    
}

