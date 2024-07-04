import { ethers } from "ethers";
import { useState } from "react";
import classes from "./ConnectWallet.module.css";
import dynoImage from "../assets/dyno.png"; // Import the image correctly

export default function ConnectWallet() {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState("");
  const [connected, setConnection] = useState(false);
  const [hovered, setHovered] = useState(false); // State to track hover state

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      const address = await signer.getAddress();
      setConnection(true);
      setAddress(address);

      const network = await provider.getNetwork();
      console.log("Connected to network:", network);
      console.log("signer address: ", address);
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
       
      <div className={classes.navbar}>
      <div className={classes.logo}> <img src={dynoImage} alt="dyno" />
      </div>
        <a href="#home">Buy Energy</a>
        <a href="#buy">Buy/Sell</a>
        <a href="#about">About Us</a>
      </div>
      <div className={classes["btn-container"]}>
        <button
          className={classes["btn-36"]}
          onClick={connectWallet}
          onMouseEnter={() => setHovered(true)} // Set hovered state on mouse enter
          onMouseLeave={() => setHovered(false)} // Reset hovered state on mouse leave
        >
          {connected ? shortenAddress(address) : hovered ? "Wallet" : "Connect"}
        </button>
      </div>
    </div>
  );
}
