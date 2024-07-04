import React from "react";
import classes from "./ConnectWallet.module.css";
import useWalletConnection from "../hooks/useWallet";

export default function ConnectWallet() {
  const { address, connected, connectWallet, shortenAddress } =
    useWalletConnection();

  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <div className={classes.logo}>DYNO</div>
        <a href="#home">Buy Energy</a>
        <a href="#buy">Buy/Sell</a>
        <a href="#about">About Us</a>
      </div>
      <div className={classes["btn-container"]}>
        <button className={classes["btn-36"]} onClick={connectWallet}>
          {connected ? shortenAddress(address) : "Connect"}
        </button>
      </div>
    </div>
  );
}
