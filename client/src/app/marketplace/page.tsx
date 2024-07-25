"use client";

import React from "react";
import { type BaseError, useAccount } from "wagmi";
import { useBuyDyno } from "@/hooks/use-buy-dyno.tsx";
import {
  dynoTokenAddress,
  dynoBuyerAddress,
  mockUsdcAddress,
  dynoSellerAddress,
  dynoTokenAbi,
} from "../../../constants/constants";
import { useSellDyno } from "@/hooks/use-sell-dyno";

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

    try {
      await buyDyno(
        mockUsdcAddress,
        ownerAddress as string,
        dynoBuyerAddress,
        amount
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSell(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sellData = new FormData(e.target as HTMLFormElement);
    const sell_amount = Number(sellData.get("sell_amount"));

    try {
      await sellDyno(
        dynoTokenAddress,
        ownerAddress as `0x${string}`,
        dynoSellerAddress,
        sell_amount
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
      <div>
        <div className="mt-20 ml-40 text-xl w-2/5">
          <h3 className="font-merchandise text-3xl text-inkblue">
            Getting started :{" "}
          </h3>
          <div className=" font-semibold text-xl">
            <ul className="mt-2">
              <p>
                Dyno Energy Credits are ERC-20 tokens that represent your share
                of sustainable energy.
              </p>
              <p>Each Dyno is valued 1:1 with USDC, ensuring stability.</p>
              <p> One Dyno token equals 100 kWh of energy.</p>
              <p>Dyno tokens can be seamlessly swapped back to USDC.</p>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-80 p-3 ml-40 mt-16">
        <form onSubmit={handleBuy}>
          <label className="font-black text-inkblue">
            Enter Amount to buy:{" "}
          </label>
          <div className="flex">
            <input
              className="bg-almond/50 w-80 h-7 rounded-2xl mr-4 text-center font-black"
              name="amount"
              placeholder="DYNO"
            />
            <button
              className=" bg-inkblue font-black px-8 text-oatmilk rounded-2xl"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Confirming..." : "Buy"}
            </button>
          </div>
        </form>
        <div>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          )}
        </div>
        <div className="w-80 p-3 ml-40 mt-16">
          <form onSubmit={handleSell}>
            <label className="font-black text-inkblue">
              Enter Amount to sell:{" "}
            </label>
            <div className="flex">
              <input
                className="bg-almond/50 w-80 h-7 rounded-2xl mr-4 text-center font-black"
                name="sell_amount"
                placeholder="USDC"
              />
              <button
                className=" bg-inkblue font-black px-8 text-oatmilk rounded-2xl"
                disabled={isPending}
                type="submit"
              >
                {selltxPending ? "Confirming..." : "Sell"}
              </button>
            </div>
          </form>
          <div>
            {selltxhash && <div>Transaction Hash: {hash}</div>}
            {selltxConfirming && <div>Waiting for confirmation...</div>}
            {selltxConfirmed && <div>Transaction confirmed.</div>}
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
