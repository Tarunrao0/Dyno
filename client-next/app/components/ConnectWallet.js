"use client";

import React, { useState } from "react";
import classes from "./ConnectWallet.module.css";
import Link from "next/link";
import { ethers } from "ethers";
import dynoImage from "../../public/dyno.png"; // Ensure dyno.png is in the correct path
import bgImage from "../../public/bg.jpeg"; // Ensure bg.jpeg is in the correct path

export default function ConnectWallet() {
  const [address, setAddress] = useState("");
  const [connected, setConnection] = useState(false);
  const [hovered, setHovered] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setConnection(true);
      setAddress(address);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const shortenAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <div className={classes.container}>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <img src={dynoImage.src} alt="dyno" />
        </div>
        <Link href="/buy-energy">Buy Energy</Link>
        <Link href="/dyno-swap">Buy/Sell</Link>
        <Link href="/about-us">About Us</Link>
      </nav>
      <div className={classes["btn-container"]}>
        <button
          className={classes["btn-36"]}
          onClick={connectWallet}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {connected ? shortenAddress(address) : hovered ? "Wallet" : "Connect"}
        </button>
      </div>
    </div>
  );
}
