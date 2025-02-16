// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Sub {
    address public owner;
    uint256 public fee;
    mapping(address => uint256) public subscriptions;

    constructor(uint256 _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    function startSubscription() public payable {
        require(msg.value == fee, "subscription fee is not correct");
        subscriptions[msg.sender] = block.timestamp + 1 days;
    }
}