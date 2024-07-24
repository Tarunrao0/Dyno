"use client";

import { useBuyDyno } from "@/hooks/use-buy-dyno.tsx";
import React from "react";
import { type BaseError } from "wagmi";

export default function BuySell() {
  const { buyDyno, hash, error, isPending, isConfirming, isConfirmed } =
    useBuyDyno();

  async function handleBuy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const buyData = new FormData(e.target as HTMLFormElement);
    const amount = Number(buyData.get("amount"));

    try {
      await buyDyno(amount);
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
      <div>
        <form onSubmit={handleBuy}>
          <label>Enter Amount to buy: </label>
          <input name="amount" />
          <button disabled={isPending} type="submit">
            {isPending ? "Confirming..." : "Buy"}
          </button>
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
      </div>
    </>
  );
}
