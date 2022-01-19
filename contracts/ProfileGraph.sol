// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./ProfileToken.sol";

contract ProfileGraph is ProfileToken {
    mapping(uint256 => uint256[]) public followers;
    mapping(uint256 => uint256[]) public following;

    event NewFollower(uint256 follower, uint256 following);
    event RemovedFollower(uint256 follower, uint256 following);

    function follow(uint256 _followed, uint256 _follower) public tokenOwner(_follower) {
        //TODO: check existing?
        following[_follower].push(_followed);
        followers[_followed].push(_follower);
        emit NewFollower(_follower, _followed);
    }

    modifier tokenOwner(uint256 _tokenId) {
        require(msg.sender == ERC721.ownerOf(_tokenId));
        _;
    }
}