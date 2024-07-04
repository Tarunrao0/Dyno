// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {DynoToken} from "./DynoToken.sol";
import {DynoPool} from "./DynoPool.sol";
import {OwnableRoles} from "solady/src/auth/OwnableRoles.sol";
import {IUSDC} from "./interfaces/IUSDC.sol";
import {MockUSDC} from "./mocks/MockUSDC.sol";

contract DynoSeller is OwnableRoles {
    uint256 public constant ADMIN_ROLE = 1 << 0;
    uint256 public constant SUPPLIER_ROLE = 1 << 1;

    DynoToken public dyno;
    DynoPool public pool;
    IUSDC public usdc;

    mapping(address => uint256) public roles;

    event ownerset(address owner);
    event adminset(address admin);
    event role_granted(address user, uint256 role);
    event role_revoked(address user, uint256 role);
    event swap_successful(uint256 amount, address from, address to);

    constructor(
        DynoToken _dyno,
        address _usdc,
        address _owner,
        DynoPool _pool
    ) {
        _setOwner(_owner);
        pool = _pool;
        dyno = _dyno;
        usdc = IUSDC(_usdc);
        // usdc = IUSDC(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    }

    receive() external payable {}

    function _setOwner(address _owner) internal override {
        super._setOwner(_owner);

        emit ownerset(_owner);
    }

    function makeAdmin(address _admin) public onlyOwner {
        grantRoles(_admin, ADMIN_ROLE);
        roles[_admin] = 1;

        emit adminset(_admin);
    }

    function grantRoles(
        address user_,
        uint256 roles_
    ) public payable override onlyOwnerOrRoles(ADMIN_ROLE) {
        _grantRoles(user_, roles_);
        roles[user_] = 2;

        emit role_granted(user_, roles_);
    }

    function revokeRoles(
        address user_,
        uint256 roles_
    ) public payable override onlyOwnerOrRoles(ADMIN_ROLE) {
        _removeRoles(user_, roles_);
        delete roles[user_];

        emit role_revoked(user_, roles_);
    }

    function checkRoles(uint256 _roles) public view {
        _checkRoles(_roles);
    }

    function swapForUSDC(
        uint256 amount
    ) public payable onlyOwnerOrRoles(SUPPLIER_ROLE) {
        require(amount >= dyno.balanceOf(msg.sender), "Not enough balance");
        // Transfer dyno from the user to the contract
        require(
            dyno.transferFrom(msg.sender, address(pool), amount),
            "Dyno transfer failed"
        );
        // Transfer usdc from the contract to the user
        require(
            usdc.transferFrom(address(pool), msg.sender, amount),
            "USDC transfer failed"
        );

        emit swap_successful(amount, msg.sender, address(pool));
    }

    function rolesOf(address user) public view override returns (uint256) {
        return roles[user];
    }
}
