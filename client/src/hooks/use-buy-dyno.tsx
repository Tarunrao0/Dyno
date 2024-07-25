import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { dynoBuyerAddress, dynoBuyerAbi } from "../../constants/constants";
import { useAllowance } from "./use-allowance";

export const useBuyDyno = () => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { checkAllowance } = useAllowance();

  const buyDyno = (
    tokenAddress: string,
    ownerAddress: string,
    spenderAddress: string,
    amount: number
  ) => {
    checkAllowance(tokenAddress, ownerAddress, spenderAddress, amount);

    writeContract({
      address: dynoBuyerAddress,
      abi: dynoBuyerAbi,
      functionName: "buyDynoTokens",
      args: [BigInt(amount)],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return { buyDyno, hash, error, isPending, isConfirming, isConfirmed };
};
