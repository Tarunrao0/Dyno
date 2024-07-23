import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { DynoBuyerAddress, DynoBuyerAbi } from "../../constants/constants";

export function buyDyno(amount: number) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  writeContract({
    address: DynoBuyerAddress,
    abi: DynoBuyerAbi,
    functionName: "buyDynoTokens",
    args: [BigInt(amount)],
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
}
