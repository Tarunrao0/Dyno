import { erc20Abi } from "viem";
import { useWriteContract } from "wagmi";

export const useApprove = () => {
  const { writeContract } = useWriteContract();

  const approveTokens = async (
    tokenAddress: string,
    spenderAddress: string,
    amount: number
  ) => {
    try {
      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [spenderAddress as `0x${string}`, BigInt(amount)],
      });
      console.log("Approval transaction confirmed");
    } catch (error) {
      console.error("Error approving tokens:", error);
    }
  };

  return { approveTokens };
};
