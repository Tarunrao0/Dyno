"use client";

import React from "react";
import { type BaseError, useAccount } from "wagmi";
import { useBuyDyno } from "@/hooks/use-buy-dyno";
import {
  dynoTokenAddress,
  dynoBuyerAddress,
  mockUsdcAddress,
  dynoSellerAddress,
} from "../../../constants/constants";
import { useSellDyno } from "@/hooks/use-sell-dyno";
import Image from "next/image";
import marketplace from "../../../public/marketplace.png";

export default function BuySell() {
  const { address: ownerAddress } = useAccount();
  const { buyDyno, hash, error, isPending, isConfirming, isConfirmed } =
    useBuyDyno();

  const {
    sellDyno,
    selltxhash,
    selltxerror,
    selltxPending,
    selltxConfirming,
    selltxConfirmed,
  } = useSellDyno();

  async function handleBuy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const buyData = new FormData(e.target as HTMLFormElement);
    const amount = Number(buyData.get("amount"));
    const amountWithPrecision = amount * 10 ** 18;

    try {
      await buyDyno(
        mockUsdcAddress,
        ownerAddress as string,
        dynoBuyerAddress,
        amountWithPrecision
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSell(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sellData = new FormData(e.target as HTMLFormElement);
    const sell_amount = Number(sellData.get("sell_amount"));
    const sellAmountWithPrecision = sell_amount * 10 ** 18;

    try {
      await sellDyno(
        dynoTokenAddress,
        ownerAddress as `0x${string}`,
        dynoSellerAddress,
        sellAmountWithPrecision
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="mt-24 ml-36 text-6xl font-black text-inkblue">
        <h1>Power Up Your Portfolio with Dyno Energy Credits!</h1>
      </div>
      <div className="mt-20 ml-40 text-xl">
        <h3 className="font-merchandise text-3xl text-inkblue">TOKENOMICS: </h3>
        <div className="flex items-start w-full">
          <div className="font-medium text-xl w-2/5">
            <ul className="mt-2">
              <li>
                Dyno Energy Credits are ERC-20 tokens that represent your share
                of sustainable energy.
              </li>
              <li>Each Dyno is valued 1:1 with USDC, ensuring stability.</li>
              <li>One Dyno token equals 100 kWh of energy.</li>
              <li>Dyno tokens can be seamlessly swapped back to USDC.</li>
            </ul>
          </div>
          <div className="ml-72 -mt-20">
            <Image src={marketplace} alt="asterisk" width={250} />
          </div>
        </div>
      </div>
      <div className="w-80 p-3 ml-40 mt-16 flex relative">
        <div className="mt-3">
          <form onSubmit={handleBuy}>
            <label className="font-black text-inkblue">
              Enter amount to buy:{" "}
            </label>
            <div className="flex">
              <input
                className="bg-almond/50 w-80 h-7 rounded-2xl mr-4 text-center font-black"
                name="amount"
                placeholder="DYNO"
              />
              <button
                className=" bg-inkblue font-black px-8 text-oatmilk rounded-2xl transition-transform duration-300 hover:-translate-y-2"
                disabled={isPending}
                type="submit"
              >
                {isPending ? "Confirming..." : "Buy"}
              </button>
            </div>
          </form>
        </div>
        <div className="w-80 p-3 ml-44">
          <form onSubmit={handleSell}>
            <label className="font-black text-inkblue">
              Enter amount to sell:{" "}
            </label>
            <div className="flex">
              <input
                className="bg-almond/50 w-80 h-7 rounded-2xl mr-4 text-center font-black"
                name="sell_amount"
                placeholder="USDC"
              />
              <button
                className=" bg-inkblue font-black px-8 text-oatmilk rounded-2xl transition-transform duration-300 hover:-translate-y-2"
                disabled={selltxPending}
                type="submit"
              >
                {selltxPending ? "Confirming..." : "Sell"}
              </button>
            </div>
          </form>
        </div>
        <div className=" flex absolute left-0 top-0 mt-24 ml-3 font-black">
          <div>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed 🎉.</div>}
            {error && (
              <div>
                Error: {(error as BaseError).shortMessage || error.message}
              </div>
            )}
          </div>
          <div className="ml-96">
            {selltxhash && (
              <div className="ml-24">Transaction Hash: {hash}</div>
            )}
            {selltxConfirming && (
              <div className="ml-24">Waiting for confirmation...</div>
            )}
            {selltxConfirmed && (
              <div className="ml-24">Transaction confirmed 🎉.</div>
            )}
            {selltxerror && (
              <div>
                Error:{" "}
                {(selltxerror as BaseError).shortMessage || selltxerror.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
