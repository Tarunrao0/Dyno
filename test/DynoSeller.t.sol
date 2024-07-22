// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console} from "../lib/forge-std/src/Test.sol";
import {MockUSDC} from "../src/mocks/MockUSDC.sol";
import {IUSDC} from "../src/interfaces/IUSDC.sol";
import {DynoSeller} from "../src/DynoSeller.sol";
import {DynoToken} from "../src/DynoToken.sol";
import {DynoBuyer} from "../src/DynoBuyer.sol";

contract DynoSellerTest is Test {
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

    modifier basicSetup() {
        //Step 1: owner makes alice an admin
        vm.startPrank(owner);
        seller.makeAdmin(address(alice));
        vm.stopPrank();

        //Step 1.5: check if alice has the admin role
        vm.startPrank(alice);
        seller.checkRoles(1);
        vm.stopPrank();

        //Step 2: alice makes bob a valid supplier
        vm.startPrank(alice);
        seller.grantRoles(bob, 2);
        vm.stopPrank();

        _;
    }

    function test_non_owner_makeAdmin_reverts() public {
        vm.startPrank(alice);
        vm.expectRevert();
        seller.makeAdmin(address(alice));
        vm.stopPrank();
    }

    //✅
    function test_owner_makeAdmin_passes() public {
        vm.startPrank(owner);
        seller.makeAdmin(address(alice));
        vm.stopPrank();
    }

    //✅
    function test_nonRole_grantRoles_reverts() public {
        vm.startPrank(bob);
        vm.expectRevert();
        seller.grantRoles(alice, 1);
        vm.stopPrank();
    }

    //✅
    function test_grantRoles_works_for_admins() public {
        vm.startPrank(owner);
        seller.makeAdmin(address(alice));
        vm.stopPrank();

        vm.startPrank(alice);
        seller.checkRoles(1);
        vm.stopPrank();

        //Alice is now admin
        vm.startPrank(alice);
        seller.grantRoles(bob, 2);
        vm.stopPrank();
    }

    function test_grantRoles_works_for_owners() public {
        vm.startPrank(owner);
        seller.makeAdmin(address(alice));
        vm.stopPrank();

        vm.startPrank(alice);
        seller.checkRoles(1);
        vm.stopPrank();

        vm.startPrank(owner);
        seller.grantRoles(bob, 2);
        vm.stopPrank();
    }

    //✅
    function test_nonRole_revokeRoles_reverts() public {
        //Alice is made the admin by the owner
        vm.startPrank(owner);
        seller.makeAdmin(address(alice));
        vm.stopPrank();

        //Alice is now admin
        //Bob is granted the supplier role
        vm.startPrank(alice);
        seller.grantRoles(bob, 2);
        vm.stopPrank();

        //Charlie tries to revoke bobs supplier role
        //This should revert unless called by an owner or an admin
        vm.startPrank(charlie);
        vm.expectRevert();
        seller.revokeRoles(bob, 2);
        vm.stopPrank();
    }

    //✅
    function test_revokeRoles_works_for_admins() public {
        //Alice is made the admin by the owner
        vm.startPrank(owner);
        seller.makeAdmin(address(alice));
        vm.stopPrank();

        //Alice is now admin
        //Bob is granted the supplier role
        vm.startPrank(alice);
        seller.grantRoles(bob, 2);
        vm.stopPrank();

        //Alice revokes bobs supplier role
        vm.startPrank(alice);
        seller.revokeRoles(bob, 2);
        vm.stopPrank();
    }

    //✅
    function test_revokeRoles_works_for_owners() public {
        //Alice is made the admin by the owner
        vm.startPrank(owner);
        seller.makeAdmin(address(alice));
        vm.stopPrank();

        //Alice is now admin
        //Bob is granted the supplier role
        vm.startPrank(alice);
        seller.grantRoles(bob, 2);
        vm.stopPrank();

        vm.startPrank(owner);
        seller.revokeRoles(bob, 2);
        vm.stopPrank();
    }

    //✅
    function test_main() public basicSetup {
        //Step 2.5: fund charlie ($10) and pool (10 dyno)
        vm.startPrank(owner);
        usdc.mint(charlie, 10);
        dyno.mint(address(buyer), 10);
        vm.stopPrank();

        //Step 3: charlie buys dyno
        vm.startPrank(charlie);
        usdc.approve(address(buyer), 10);
        buyer.buyDynoTokens(10);
        vm.stopPrank();

        assertEq(usdc.balanceOf(address(charlie)), 0);
        assertEq(dyno.balanceOf(address(charlie)), 10);

        //Step 4: charlie buys energy with his tokens
        vm.startPrank(charlie);
        dyno.approve(address(buyer), 10);

        buyer.buyEnergy(1000, address(bob));
        vm.stopPrank();

        assertEq(dyno.balanceOf(address(charlie)), 0);
        assertEq(dyno.balanceOf(address(bob)), 10);

        vm.startPrank(bob);
        dyno.approve(address(seller), 10);
        seller.swapForUSDC(10);
        vm.stopPrank();

        assertEq(dyno.balanceOf(address(bob)), 0);
        assertEq(usdc.balanceOf(address(bob)), 10);
    }

    function test_rolesOf() public basicSetup {
        assertEq(seller.rolesOf(address(alice)), 1);
        assertEq(seller.rolesOf(address(bob)), 2);
    }

    function test_checkRoles() public basicSetup {
        vm.prank(alice);
        //will revert if not true
        seller.checkRoles(1);
    }

    function test_checkRoles_reverts() public basicSetup {
        vm.prank(charlie);
        vm.expectRevert();
        seller.checkRoles(2);
    }
}
