import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAllowance } from "./use-allowance";
import { dynoSellerAbi, dynoSellerAddress } from "../../constants/constants";

export const useSellDyno = () => {
  const { checkAllowance } = useAllowance();
  const {
    data: selltxhash,
    error: selltxerror,
    isPending: selltxPending,
    writeContract,
  } = useWriteContract();

  const sellDyno = (
    tokenAddress: string,
    ownerAddress: string,
    spenderAddress: string,
    amount: number
  ) => {
    checkAllowance(tokenAddress, ownerAddress, spenderAddress, amount);

    writeContract({
      address: dynoSellerAddress,
      abi: dynoSellerAbi,
      functionName: "swapForUSDC",
      args: [BigInt(amount)],
    });
  };

  const { isLoading: selltxConfirming, isSuccess: selltxConfirmed } =
    useWaitForTransactionReceipt({
      hash: selltxhash,
    });

  return {
    sellDyno,
    selltxhash,
    selltxerror,
    selltxPending,
    selltxConfirming,
    selltxConfirmed,
  };
};
