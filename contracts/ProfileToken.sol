// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ProfileToken is ERC721 {
    constructor() ERC721("ProfileToken", "NFTC") {}
}
