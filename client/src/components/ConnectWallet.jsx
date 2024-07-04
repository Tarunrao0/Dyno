import { ethers } from "ethers";
import { useState } from "react";

export default function ConnectWallet() {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState("");
  const [connected, setConnection] = useState(false);

  const connectWallet = async () => {
    //checks if your website has metamask
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return;
    }
    try {
      // recognizes metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // sends request for users account
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
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div>
      <p>Connect to Metamask</p>
      <button onClick={connectWallet}>{connected ? shortenAddress(address) : "Connect"}</button>
    </div>
  );
}
