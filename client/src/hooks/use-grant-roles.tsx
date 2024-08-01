import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { dynoSellerAbi, dynoSellerAddress } from "../../constants/constants";

export const useGrantRoles = () => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const grantRole = (userAddress: string) => {
    writeContract({
      address: dynoSellerAddress,
      abi: dynoSellerAbi,
      functionName: "grantRoles",
      args: [userAddress as `0x${string}`, BigInt(2)],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return { grantRole, hash, error, isPending, isConfirming, isConfirmed };
};
