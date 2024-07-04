// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {OwnableRoles} from "solady/src/auth/OwnableRoles.sol";
import {DynoToken} from "./DynoToken.sol";
import {IUSDC} from "./interfaces/IUSDC.sol";
import {MockUSDC} from "./mocks/MockUSDC.sol";

contract DynoPool is OwnableRoles {
    DynoToken public dyno;
    IUSDC public usdc;

    uint256 public balance;

    receive() external payable {}

    constructor(DynoToken _dyno, address _usdc, address _owner) {
        _setOwner(_owner);
        dyno = _dyno;
        usdc = IUSDC(_usdc);
        // usdc = IUSDC(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    }

    function _setOwner(address _owner) internal override {
        super._setOwner(_owner);
    }

    function retrieveUSDC(address owner) public onlyOwner {
        usdc.transfer(owner, usdc.balanceOf(address(this)));
    }

    function retrieveDYNO(address owner) public onlyOwner {
        dyno.transfer(owner, dyno.balanceOf(address(this)));
    }

    function totalSupplyDYNO() public view returns (uint256) {
        return dyno.balanceOf(address(this));
    }

    function totalSupplyUSDC() public view returns (uint256) {
        return usdc.balanceOf(address(this));
    }
}
