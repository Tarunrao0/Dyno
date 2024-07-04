import { ethers } from "ethers";
import {
  dynoBuyerAbi,
  dynoBuyerAddress,
  mockUsdcAbi,
  mockUsdcAddress,
  dynoSellerAddress,
  dynoSellerAbi,
} from "../constant/constant";
import { useState } from "react";
import bg from "../assets/bg.jpeg";

export default function DynoSwap() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const buyTokens = async () => {
    if (!window.ethereum) {
      console.log("Please connect your wallet");
      return;
    }

    setIsLoading(true);
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
      const mockUsdcContract = new ethers.Contract(
        mockUsdcAddress,
        mockUsdcAbi,
        signer
      );

      const parsedAmount = ethers.utils.parseUnits(amount, 6);

      // USDC approval (user -> seller)
      const user_to_seller_allowance = await mockUsdcContract.allowance(
        userAddress,
        dynoSellerAddress
      );
      if (user_to_seller_allowance.lt(parsedAmount)) {
        const user_to_seller_approveTx = await mockUsdcContract.approve(
          dynoSellerAddress,
          parsedAmount
        );
        await user_to_seller_approveTx.wait();
        console.log("USDC approval successful (user -> buyer 💸)");
      }

      const user_to_buyer_allowance = await mockUsdcContract.allowance(
        userAddress,
        dynoBuyerAddress
      );
      if (user_to_buyer_allowance.lt(parsedAmount)) {
        const user_to_buyer_approveTx = await mockUsdcContract.approve(
          dynoBuyerAddress,
          parsedAmount
        );
        await user_to_buyer_approveTx.wait();
        console.log("USDC approval successful (user -> buyer 💸)");
      }
      // Buy Dyno Tokens
      const tx = await buyerContract.buyDynoTokens(parsedAmount, {
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
    } finally {
      setIsLoading(false);
    }
  };

  export default function BuyDyno() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const buyTokens = async () => {
    if (!window.ethereum) {
      console.log("Please connect your wallet");
      return;
    }

    setIsLoading(true);
    setError(null);

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

      const parsedAmount = ethers.utils.parseUnits(amount, 6);

      // USDC approval (user -> buyer)
      const user_to_buyer_allowance = await dynoTokenContract.allowance(
        userAddress,
        dynoBuyerAddress
      );
      if (user_to_buyer_allowance.lt(parsedAmount)) {
        const user_to_buyer_approveTx = await dynoTokenContract.approve(
          dynoBuyerAddress,
          parsedAmount
        );
        await user_to_buyer_approveTx.wait();
        console.log("DYNO approval successful (user -> buyer 💸)");
      }

      // Swap Dyno Tokens
      const tx = await sellerContract.swapForUSDC(parsedAmount, {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Buy Dyno Tokens with USDC</h2>
      <input
        type="number"
        value={amount}
        onChange={handleInputChange}
        placeholder="Enter amount in USDC"
        min="0"
        step="any"
        style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
        disabled={isLoading}
      />
      <button
        onClick={buyTokens}
        disabled={isLoading || !amount}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          outline: "none",
          marginTop: "10px",
        }}
      >
        {isLoading ? "Processing..." : "Buy Tokens"}
      </button>
      {transactionHash && (
        <p style={{ marginTop: "20px" }}>
          Transaction sent:{" "}
          <a
            href={`https://etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            {transactionHash}
          </a>
        </p>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>Error: {error}</p>
      )}
    </div>
  );
}
