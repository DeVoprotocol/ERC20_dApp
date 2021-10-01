// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor (string memory name_, string memory symbol_, uint256 currentPrice_) ERC20(name_, symbol_) {
        currentPrice = currentPrice_;
    }

    uint256 public currentPrice;

    function getToken() external payable {
        uint256 remainder = msg.value%currentPrice;
        uint256 amountToMint = msg.value/currentPrice;
        _mint(msg.sender, amountToMint);
        currentPrice = currentPrice+(currentPrice/10);
        payable(msg.sender).transfer(remainder);
    }

    function getCurrentPrice() public view returns(uint256) {
        return currentPrice;
    }
}