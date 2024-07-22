// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    address public owner;

    constructor(address _owner) ERC20("US DOLLAR COIN", "USDC") {
        owner = _owner;
    }

    function mint(address _account, uint256 _amount) public {
        require(msg.sender == owner, "Unauthorized Access!!");
        _mint(_account, _amount);
    }
}
