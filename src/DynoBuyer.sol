// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {DynoSeller} from "./DynoSeller.sol";
import {DynoToken} from "./DynoToken.sol";
import {MockUSDC} from "./mocks/MockUSDC.sol";
import {IUSDC} from "./interfaces/IUSDC.sol";
import "../lib/solmate/src/utils/FixedPointMathLib.sol";

contract DynoBuyer {
    using FixedPointMathLib for uint256;

    IUSDC public usdc;
    DynoToken public dyno;
    DynoSeller public seller;

    mapping(address => uint256) public buyerBalance;

    constructor(address _usdc, DynoToken _dyno, address payable _seller) {
        usdc = IUSDC(_usdc);
        dyno = _dyno;
        seller = DynoSeller(_seller);
    }

    function buyDynoTokens(uint256 amount) public {
        buyerBalance[msg.sender] += amount;
        require(
            usdc.transferFrom(msg.sender, address(seller), amount),
            "USDC transfer failed"
        );
        require(dyno.transfer(msg.sender, amount), "DynoToken transfer failed");
    }

    //@dev energy = 100kwH
    // 100 * 1e18 / 100e18 => 1 token
    function convertEnergyToTokens(
        uint256 energy
    ) internal pure returns (uint256) {
        uint256 convertedShare = energy.divWadUp(100e18);
        return convertedShare;
    }

    function buyEnergy(uint256 energy, address sellerAddress) public {
        uint256 tokenAmount = convertEnergyToTokens(energy);
        require(tokenAmount <= buyerBalance[msg.sender], "Not enough balance");
        require(seller.rolesOf(sellerAddress) == 2, "Not a valid seller");
        require(
            dyno.transferFrom(msg.sender, sellerAddress, tokenAmount),
            "DynoToken transfer failed"
        );
    }
}
