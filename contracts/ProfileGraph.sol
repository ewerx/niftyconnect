// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./ProfileToken.sol";

contract ProfileGraph is ProfileToken {

    // data

    //mapping(uint256 => uint256[]) public _followers;
    //mapping(uint256 => uint256[]) public _following;

    // events

    event Follow(uint256 follower, uint256 followed);
    event UnFollow(uint256 follower, uint256 unfollowed);

    // functions

    function follow(uint256 toFollow, uint256 byFollower) public tokenExists(toFollow) tokenOwner(byFollower) {
        //TODO: check existing?
        //_following[byFollower].push(toFollow);
        //_followers[toFollow].push(byFollower);
        emit Follow(byFollower, toFollow);
    }

    function unfollow(uint256 toUnfollow, uint256 byFollower) public tokenExists(toUnfollow) tokenOwner(byFollower) {
        //_following[byFollower].remove(toUnfollow);
        //_followers[toUnfollow].remove(byFollower);
        emit UnFollow(byFollower, toUnfollow);
    }

    // modifiers

    modifier tokenOwner(uint256 tokenId) {
        require(msg.sender == ERC721.ownerOf(tokenId));
        _;
    }

    modifier tokenExists(uint256 tokenId)  {
        require(_exists(tokenId));
        _;
    }
}