// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IUSDC {
    function transfer(address dst, uint wad) external returns (bool);

    function transferFrom(
        address src,
        address dst,
        uint wad
    ) external returns (bool);

    function balanceOf(address guy) external view returns (uint);
}
