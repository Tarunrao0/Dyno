import { useState } from "react";
import { ethers } from "ethers";

const useWalletConnection = () => {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [connected, setConnection] = useState(false);

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

  return {
    address,
    signer,
    connected,
    connectWallet,
    shortenAddress,
  };
};

export default useWalletConnection;
