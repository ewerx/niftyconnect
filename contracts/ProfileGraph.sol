// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./ProfileToken.sol";

contract ProfileGraph is ProfileToken {

    // data

    mapping(uint256 => mapping(uint256 => bool)) public followings;

    // events

    event Follow(uint256 indexed follower, uint256 indexed followed);
    event Unfollow(uint256 indexed follower, uint256 indexed unfollowed);

    // functions

    function follow(uint256 toFollow, uint256 byFollower) public tokenOwner(byFollower) {
        require(toFollow != byFollower, "self");
        require(followings[byFollower][toFollow] == false, "duplicate");
        followings[byFollower][toFollow] = true;
        emit Follow(byFollower, toFollow);
    }

    function unfollow(uint256 toUnfollow, uint256 byFollower) public tokenOwner(byFollower) {
        require(toUnfollow != byFollower, "self");
        require(followings[byFollower][toUnfollow] == true, "not followed");
        followings[byFollower][toUnfollow] = false;
        emit Unfollow(byFollower, toUnfollow);
    }

    // modifiers

    modifier tokenOwner(uint256 tokenId) {
        // console.log("profile %s owned by %s, sender %s", tokenId, ERC721.ownerOf(tokenId), msg.sender);
        require(msg.sender == ERC721.ownerOf(tokenId), "not owner");
        _;
    }
}