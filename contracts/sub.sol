// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Sub {
    address public owner;
    uint256 public fee;
    mapping(address => uint256) public subscriptions;

    event SubscriptionStarted(address indexed user, uint256 endTime);
    event SubscriptionCancelled(address indexed user);

    constructor(uint256 _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    function startSubscription() public payable {
        require(msg.value == fee, "subscription fee is not correct");
        subscriptions[msg.sender] = block.timestamp + 1 days;

        emit SubscriptionStarted(msg.sender, subscriptions[msg.sender]);
    }


    function isSubscriptionActive(address user) public view returns (bool) {
        return subscriptions[user] > block.timestamp;
    }

    function cancelSubscription() external {
        require(subscriptions[msg.sender] > block.timestamp, "subscription is inactive");
        uint256 t = subscriptions[msg.sender] - block.timestamp;
        uint256 refund = (t * fee) / 1 days;
        payable(msg.sender).transfer(refund);
        subscriptions[msg.sender] = 0;

        emit SubscriptionCancelled(msg.sender);
    }
}
