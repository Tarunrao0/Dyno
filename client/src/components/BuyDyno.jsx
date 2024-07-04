import { ethers } from "ethers";
import {
  dynoBuyerAbi,
  dynoBuyerAddress,
  dynoTokenAbi,
  dynoTokenAddress,
  mockUsdcAbi,
  mockUsdcAddress,
  dynoPoolAbi,
  dynoPoolAddress,
} from "../constant/constant";
import { useState } from "react";

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
      const mockUsdcContract = new ethers.Contract(
        mockUsdcAddress,
        mockUsdcAbi,
        signer
      );

      const parsedAmount = ethers.utils.parseUnits(amount, 6);

      // USDC approval (user -> pool)
      const user_to_pool_allowance = await mockUsdcContract.allowance(
        userAddress,
        dynoPoolAddress
      );
      if (user_to_pool_allowance.lt(parsedAmount)) {
        const user_to_pool_approveTx = await mockUsdcContract.approve(
          dynoPoolAddress,
          parsedAmount
        );
        await user_to_pool_approveTx.wait();
        console.log("USDC approval successful (user -> pool 💸)");
      }

      // Dyno approval (pool -> user)
      const pool_to_user_allowance = await dynoTokenContract.allowance(
        dynoPoolAddress,
        userAddress
      );
      if (pool_to_user_allowance.lt(parsedAmount)) {
        const pool_to_user_approveTx = await dynoTokenContract.approve(
          userAddress,
          parsedAmount
        );
        await pool_to_user_approveTx.wait();
        console.log("Dyno approval successful (pool -> user 💸)");
      }

      // USDC approval (user -> buyer)
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

      // Dyno approval (pool -> buyer)
      const pool_to_buyer_allowance = await dynoTokenContract.allowance(
        dynoPoolAddress,
        dynoBuyerAddress
      );
      if (pool_to_buyer_allowance.lt(parsedAmount)) {
        const pool_to_buyer_approveTx = await dynoTokenContract.approve(
          dynoBuyerAddress,
          parsedAmount
        );
        await pool_to_buyer_approveTx.wait();
        console.log("Dyno approval successful (pool -> buyer 💸)");
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

  return (
    <div>
      <h2>Buy Dyno Tokens with USDC</h2>
      <input
        type="number"
        value={amount}
        onChange={handleInputChange}
        placeholder="Enter amount in USDC"
        min="0"
        step="any"
        disabled={isLoading}
      />
      <button onClick={buyTokens} disabled={isLoading || !amount}>
        {isLoading ? "Processing..." : "Buy Tokens"}
      </button>
      {transactionHash && (
        <p>
          Transaction sent:{" "}
          <a
            href={`https://etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {transactionHash}
          </a>
        </p>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
