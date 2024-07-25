import { erc20Abi } from "viem";
import { publicClient } from "./utils/client";
import { useApprove } from "./use-approval";

export const useAllowance = () => {
  const { approveTokens } = useApprove();

  const checkAllowance = async (
    tokenAddress: string,
    ownerAddress: string,
    spenderAddress: string,
    amount: number
  ) => {
    const allowance = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "allowance",
      args: [ownerAddress as `0x${string}`, spenderAddress as `0x${string}`],
    });

    if (allowance > BigInt(amount)) {
      return;
    } else {
      approveTokens(tokenAddress, spenderAddress, amount);
    }
  };

  return { checkAllowance };
};
