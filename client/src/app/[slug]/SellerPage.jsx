"use client";
import { useAccount } from "wagmi";
import { useBuyEnergy } from "@/hooks/use-buy-energy";

export default function SellerPage({ sellerData }) {
  const {
    buyEnergy,
    energyhash,
    energyError,
    isEnergyPending,
    energyConfirming,
    energyConfirmed,
  } = useBuyEnergy();

  const { address: ownerAddress } = useAccount();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const energy = Number(formData.get("energy"));

    try {
      buyEnergy(energy, ownerAddress, sellerData.walletAddress);
    } catch (Err) {
      console.error(Err);
    }
  }

  return (
    <>
      <div>
        <h1 className="text-6xl mt-36 ml-32 font-superVibes text-inkblue">
          {sellerData.sellerName}
        </h1>
      </div>
      <div className="ml-36 mt-10 text-xl font-medium">
        <div className="flex">
          <p className="font-bold">email: {sellerData.sellerEmail}</p>
          <p className="ml-20 font-bold"> wallet: {sellerData.walletAddress}</p>
        </div>
        <div className="mt-8 w-2/5">{sellerData.summary}</div>
        <div className="mt-20">
          <form onSubmit={handleSubmit}>
            <label className="text-inkblue font-black">
              Enter the amount of energy you want to recieve:
            </label>
            <div>
              <input
                className="bg-almond/50 w-80 h-7 rounded-2xl mr-4 text-center font-black mt-4"
                name="energy"
                placeholder="ENERGY"
              />
              <button
                className=" bg-inkblue font-black px-8 text-oatmilk rounded-2xl transition-transform duration-300 hover:-translate-y-2"
                type="submit"
                disabled={isEnergyPending}
              >
                {isEnergyPending ? "Confirming..." : "Buy Energy"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {energyhash && <div>Transaction Hash: {energyhash}</div>}
        {energyConfirming && <div>Waiting for confirmation...</div>}
        {energyConfirmed && <div>Transaction confirmed 🎉.</div>}
        {energyError && <div>Error: {energyError.message}</div>}
      </div>
    </>
  );
}
