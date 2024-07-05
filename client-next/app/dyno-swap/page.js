"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import styles from "./page.module.css"; // Adjust path if necessary
import dynoImage from "../../public/dyno.png";
import bgImage from "../../public/bg.jpeg";

import {
  dynoBuyerAbi,
  dynoBuyerAddress,
  dynoTokenAbi,
  dynoTokenAddress,
  mockUsdcAbi,
  mockUsdcAddress,
  dynoSellerAbi,
  dynoSellerAddress,
} from "../constants/constant";

export default function DynoSwap() {
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [buyIsLoading, setBuyIsLoading] = useState(false);
  const [sellIsLoading, setSellIsLoading] = useState(false);
  const [buyTransactionHash, setBuyTransactionHash] = useState(null);
  const [sellTransactionHash, setSellTransactionHash] = useState(null);
  const [buyError, setBuyError] = useState(null);
  const [sellError, setSellError] = useState(null);

  const handleBuyInputChange = (e) => {
    setBuyAmount(e.target.value);
  };

  const handleSellInputChange = (e) => {
    setSellAmount(e.target.value);
  };

  const buyTokens = async () => {
    if (!window.ethereum) {
      console.log("Please connect your wallet");
      return;
    }

    setBuyIsLoading(true);
    setBuyError(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      const buyerContract = new ethers.Contract(
        dynoBuyerAddress,
        dynoBuyerAbi,
        signer
      );
      const mockUsdcContract = new ethers.Contract(
        mockUsdcAddress,
        mockUsdcAbi,
        signer
      );

      const parsedAmount = ethers.utils.parseUnits(buyAmount, 6);

      const userToSellerAllowance = await mockUsdcContract.allowance(
        userAddress,
        dynoSellerAddress
      );
      if (userToSellerAllowance.lt(parsedAmount)) {
        const userToSellerApproveTx = await mockUsdcContract.approve(
          dynoSellerAddress,
          parsedAmount
        );
        await userToSellerApproveTx.wait();
        console.log("USDC approval successful (user -> seller 💸)");
      }

      const userToBuyerAllowance = await mockUsdcContract.allowance(
        userAddress,
        dynoBuyerAddress
      );
      if (userToBuyerAllowance.lt(parsedAmount)) {
        const userToBuyerApproveTx = await mockUsdcContract.approve(
          dynoBuyerAddress,
          parsedAmount
        );
        await userToBuyerApproveTx.wait();
        console.log("USDC approval successful (user -> buyer 💸)");
      }

      const tx = await buyerContract.buyDynoTokens(parsedAmount, {
        gasLimit: ethers.BigNumber.from("300000"),
        gasPrice: await provider.getGasPrice(),
      });

      setBuyTransactionHash(tx.hash);
      console.log("Buy transaction sent:", tx.hash);

      await tx.wait();
      console.log("Buy transaction mined:", tx.hash);
    } catch (error) {
      console.error("Error buying tokens:", error);
      setBuyError(error.message);
    } finally {
      setBuyIsLoading(false);
    }
  };

  const sellTokens = async () => {
    if (!window.ethereum) {
      console.log("Please connect your wallet");
      return;
    }

    setSellIsLoading(true);
    setSellError(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      const sellerContract = new ethers.Contract(
        dynoSellerAddress,
        dynoSellerAbi,
        signer
      );
      const dynoTokenContract = new ethers.Contract(
        dynoTokenAddress,
        dynoTokenAbi,
        signer
      );

      const parsedAmount = ethers.utils.parseUnits(sellAmount, 6);

      const userToSellerAllowance = await dynoTokenContract.allowance(
        userAddress,
        dynoSellerAddress
      );
      if (userToSellerAllowance.lt(parsedAmount)) {
        const userToSellerApproveTx = await dynoTokenContract.approve(
          dynoSellerAddress,
          parsedAmount
        );
        await userToSellerApproveTx.wait();
        console.log("DYNO approval successful (user -> seller 💸)");
      }

      const tx = await sellerContract.swapForUSDC(parsedAmount, {
        gasLimit: ethers.BigNumber.from("300000"),
        gasPrice: await provider.getGasPrice(),
      });

      setSellTransactionHash(tx.hash);
      console.log("Sell transaction sent:", tx.hash);

      await tx.wait();
      console.log("Sell transaction mined:", tx.hash);
    } catch (error) {
      console.error("Error selling tokens:", error);
      setSellError(error.message);
    } finally {
      setSellIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div
          onClick={() => (window.location.href = "/")}
          className={styles.logo}
        >
          <img src={dynoImage.src} alt="dyno" />
        </div>
        <Link href="/buy-energy">Buy Energy</Link>
        <Link href="/dyno-swap">Buy/Sell</Link>
        <Link href="/about-us">About Us</Link>
      </nav>
      <h2 className={styles.sectionTitle}>Buy or Sell Dyno Tokens</h2>
      <div className={styles.contentWrapper}>
        <div className={styles.buyContainer}>
          <h3 className={styles.sectionTitle}>Buy Dyno Tokens</h3>
          <input
            type="number"
            value={buyAmount}
            onChange={handleBuyInputChange}
            placeholder="Enter amount in USDC"
            min="0"
            step="any"
            className={styles.input}
            disabled={buyIsLoading || sellIsLoading}
          />
          <button
            onClick={buyTokens}
            disabled={buyIsLoading || !buyAmount || sellIsLoading}
            className={`${styles.button} ${styles.buyButton}`}
          >
            {buyIsLoading ? "Processing..." : "Buy Tokens"}
          </button>
          {buyTransactionHash && (
            <p className={styles.transactionInfo}>
              Buy transaction sent:{" "}
              <a
                href={`https://etherscan.io/tx/${buyTransactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.transactionLink}
              >
                {buyTransactionHash}
              </a>
            </p>
          )}
          {buyError && <p className={styles.errorMessage}>Error: {buyError}</p>}
        </div>
        <div className={styles.sellContainer}>
          <h3 className={styles.sectionTitle}>Sell Dyno Tokens</h3>
          <input
            type="number"
            value={sellAmount}
            onChange={handleSellInputChange}
            placeholder="Enter amount in Dyno Tokens"
            min="0"
            step="any"
            className={styles.input}
            disabled={sellIsLoading || buyIsLoading}
          />
          <button
            onClick={sellTokens}
            disabled={sellIsLoading || !sellAmount || buyIsLoading}
            className={`${styles.button} ${styles.sellButton}`}
          >
            {sellIsLoading ? "Processing..." : "Sell Tokens"}
          </button>
          {sellTransactionHash && (
            <p className={styles.transactionInfo}>
              Sell transaction sent:{" "}
              <a
                href={`https://etherscan.io/tx/${sellTransactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.transactionLink}
              >
                {sellTransactionHash}
              </a>
            </p>
          )}
          {sellError && (
            <p className={styles.errorMessage}>Error: {sellError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
