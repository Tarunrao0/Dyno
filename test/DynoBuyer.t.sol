// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console} from "../lib/forge-std/src/Test.sol";
import {MockUSDC} from "../src/mocks/MockUSDC.sol";
import {IUSDC} from "../src/interfaces/IUSDC.sol";
import {DynoSeller} from "../src/DynoSeller.sol";
import {DynoToken} from "../src/DynoToken.sol";
import {DynoBuyer} from "../src/DynoBuyer.sol";

contract DynoBuyerTest is Test {
    DynoSeller public seller;
    DynoBuyer public buyer;
    MockUSDC public usdc;
    DynoToken public dyno;

    address owner = makeAddr("owner");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address charlie = makeAddr("charlie");

    function setUp() public {
        // Deploy DynoToken and DynoSeller
        dyno = new DynoToken(owner);
        usdc = new MockUSDC(owner);

        // Deploy DynoSeller
        seller = new DynoSeller(dyno, address(usdc), owner);

        // Deploy DynoBuyer with the address of deployed contracts
        buyer = new DynoBuyer(address(usdc), dyno, payable(address(seller)));
    }

    function test_buyDynoTokens() public {
        vm.startPrank(owner);
        dyno.mint(address(buyer), 10);
        usdc.mint(address(charlie), 10);
        vm.stopPrank();

        assertEq(usdc.balanceOf(charlie), 10);
        assertEq(dyno.balanceOf(charlie), 0);

        vm.startPrank(charlie);
        usdc.approve(address(buyer), 10);
        buyer.buyDynoTokens(10);
        vm.stopPrank();

        assertEq(usdc.balanceOf(charlie), 0);
        assertEq(usdc.balanceOf(address(seller)), 10);
    }

    function test_reverts_no_balance_buyEnergy() public {
        vm.prank(owner);
        dyno.mint(address(charlie), 10);

        vm.prank(owner);
        seller.grantRoles(alice, 2);

        vm.startPrank(charlie);
        dyno.approve(address(buyer), 10);
        vm.expectRevert("Not enough balance");
        buyer.buyEnergy(100, alice);
        vm.stopPrank();
    }

    function test_buyEnergy() public {
        vm.startPrank(owner);
        dyno.mint(address(buyer), 10);
        usdc.mint(address(charlie), 10);
        vm.stopPrank();

        assertEq(usdc.balanceOf(charlie), 10);
        assertEq(dyno.balanceOf(charlie), 0);

        vm.startPrank(charlie);
        usdc.approve(address(buyer), 10);
        buyer.buyDynoTokens(10);
        vm.stopPrank();

        assertEq(usdc.balanceOf(charlie), 0);
        assertEq(usdc.balanceOf(address(seller)), 10);

        vm.prank(owner);
        seller.grantRoles(alice, 2);

        vm.startPrank(charlie);
        dyno.approve(address(buyer), 10);
        buyer.buyEnergy(100, alice);
        vm.stopPrank();
    }

    function test_buyEnergy_reverts_non_valid_seller() public {
        vm.startPrank(owner);
        dyno.mint(address(buyer), 10);
        usdc.mint(address(charlie), 10);
        vm.stopPrank();

        assertEq(usdc.balanceOf(charlie), 10);
        assertEq(dyno.balanceOf(charlie), 0);

        vm.startPrank(charlie);
        usdc.approve(address(buyer), 10);
        buyer.buyDynoTokens(10);
        vm.stopPrank();

        assertEq(usdc.balanceOf(charlie), 0);
        assertEq(usdc.balanceOf(address(seller)), 10);

        vm.startPrank(charlie);
        dyno.approve(address(buyer), 10);
        vm.expectRevert("Not a valid seller");
        buyer.buyEnergy(100, alice);
        vm.stopPrank();
    }
}
