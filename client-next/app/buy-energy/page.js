"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import bg from "../../public/bg.jpeg";

import {
  dynoTokenAbi,
  dynoTokenAddress,
  dynoBuyerAbi,
  dynoBuyerAddress,
} from "../constants/constant";

const navbarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "90px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
};

const linkStyle = {
  margin: "0 10px",
  color: "black",
  textDecoration: "none",
  fontWeight: "bold",
  position: "relative",
  transition: "color 0.3s",
};

const logoStyle = {
  width: "150px",
  height: "auto",
  cursor: "pointer", // Ensure cursor changes to pointer on hover
};

const BuyEnergy = () => {
  const [energy, setEnergy] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [transaction, setTransactionHash] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setEnergy(e.target.value);
  };

  const handleSellerAddress = (e) => {
    setSellerAddress(e.target.value);
  };

  const buyEnergy = async () => {
    if (!window.ethereum) {
      console.log("Please connect your wallet");
      return;
    }

    setError(null);

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

      const dynoTokenContract = new ethers.Contract(
        dynoTokenAddress,
        dynoTokenAbi,
        signer
      );

      const user_to_seller_allowance = await dynoTokenContract.allowance(
        userAddress,
        sellerAddress
      );
      if (user_to_seller_allowance.lt((energy * 1e18) / 100e18)) {
        const user_to_seller_approveTx = await dynoTokenContract.approve(
          sellerAddress,
          (energy * 1e18) / 100e18
        );
        await user_to_seller_approveTx.wait();
        console.log("DYNO approval successful (user -> seller 💸)");
      }

      const tx = await buyerContract.buyEnergy(energy, sellerAddress, {
        gasLimit: ethers.BigNumber.from("300000"), // Adjust gas limit
        gasPrice: await provider.getGasPrice(), // Get current gas price
      });

      setTransactionHash(tx.hash);
      console.log("Transaction sent:", tx.hash);

      await tx.wait();
      console.log("Transaction mined:", tx.hash);
    } catch (error) {
      console.error("Error buying tokens:", error);
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "0px",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <nav style={navbarStyle}>
        <div onClick={() => (window.location.href = "/")} style={logoStyle}>
          <img
            src="/dyno.png"
            alt="Dyno"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <Link href="/buy-energy" style={linkStyle}>
          Buy Energy
        </Link>
        <Link href="/dyno-swap" style={linkStyle}>
          Buy/Sell
        </Link>
        <Link href="/about-us" style={linkStyle}>
          About Us
        </Link>
      </nav>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 90px)",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "300px",
          }}
        >
          <h2 style={{ color: "black" }}>Buy Energy</h2>
          <input
            type="number"
            placeholder="Enter energy amount"
            value={energy}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Enter seller address"
            value={sellerAddress}
            onChange={handleSellerAddress}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={buyEnergy}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Buy
          </button>
          {transaction && <p>Transaction Hash: {transaction}</p>}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default BuyEnergy;
