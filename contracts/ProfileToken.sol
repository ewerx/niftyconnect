// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/Extension/ERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ProfileToken is 
    ERC721("NiftyConnect", "NFTC"), 
    Ownable
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    // data

    Counters.Counter public _tokenIds;

    struct Avatar {
        address nftContract;
        uint256 tokenId;
     }

    Avatar private _AvatarInfo;

    // mapping for tekneURIs
    mapping(uint => string) _tokenURIs;

    // Base URI
    string private _baseURIextended;
    
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

        console.log("Minted profile: %d", newProfileId);
        emit NewProfile(newProfileId, to);

        _tokenIds.increment();

        return newProfileId;
    }

    //TODO: interface to link avatar NFT to profile NFT
    function setAvatar(address avatarContractAddrs, uint avatarTokenId, uint niftyTokenId) public
    {
        _AvatarInfo.nftContract = avatarContractAddrs;
        _AvatarInfo.tokenId = avatarTokenId;

        console.log("contract address %s",avatarContractAddrs);
        console.log("avatar token id %s",avatarTokenId);
        console.log("Nifty token id %s",niftyTokenId);  

        //Create the ERC token from the contract address
        IERC721Metadata AvatarNFT = IERC721Metadata(avatarContractAddrs);

        // Get the TokenURI for the Avatar NFT
        string memory tokenURI = AvatarNFT.tokenURI(avatarTokenId);

        console.log("Tokenuri for Avatar%s", tokenURI);

          // Set the TokenURI of the Avatar NFT to the Profile NFT 
        _setTokenURI( niftyTokenId,  tokenURI);

    }

    //TODO: override ERC721 methods for fetching metadata to wrap the Avatar
      
   function tokenURI(uint256 tokenId) public view virtual  override(ERC721)
        returns (string memory)
    {
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
            
         // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) 
        {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) 
        {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
       
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual 
    {
            require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");

            _tokenURIs[tokenId] = _tokenURI;
    }


    function setBaseURI(string memory baseURI) external onlyOwner()
    {
            _baseURIextended = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) 
    {
            return _baseURIextended;
    }
    
    function _burn(uint256 tokenId) internal virtual override(ERC721)
    {
        super._burn(tokenId);
    }
    // modifiers
}