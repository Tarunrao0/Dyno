import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useAllowance } from "./use-allowance";
import {
  dynoBuyerAbi,
  dynoBuyerAddress,
  dynoTokenAddress,
} from "../../constants/constants";

export const useBuyEnergy = () => {
  const { checkAllowance } = useAllowance();

  const {
    data: energyhash,
    error: isEnergyPending,
    isPending: energyError,
    writeContract,
  } = useWriteContract();

  const buyEnergy = (
    energy: number,
    ownerAddress: string,
    sellerAddress: string
  ) => {
    checkAllowance(dynoTokenAddress, ownerAddress, sellerAddress, energy);

    writeContract({
      address: dynoBuyerAddress,
      abi: dynoBuyerAbi,
      functionName: "buyEnergy",
      args: [BigInt(energy), sellerAddress as `0x${string}`],
    });
  };
  const { isLoading: energyConfirming, isSuccess: energyConfirmed } =
    useWaitForTransactionReceipt({
      hash: energyhash,
    });

  return {
    buyEnergy,
    energyhash,
    energyError,
    isEnergyPending,
    energyConfirming,
    energyConfirmed,
  };
};
