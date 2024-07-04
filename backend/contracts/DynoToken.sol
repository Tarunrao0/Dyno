// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DynoToken is ERC20 {
    address public owner;

    constructor(address _owner) ERC20("DYNO", "DYN") {
        owner = _owner;
    }

    function mint(address user, uint256 amount) public {
        require(msg.sender == owner, "Unauthorized");
        _mint(user, amount);
    }
}
