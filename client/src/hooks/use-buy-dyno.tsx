import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { dynoBuyerAddress, dynoBuyerAbi } from "../../constants/constants";


export const useBuyDyno = () => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const buyDyno = (amount: number) => {


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
