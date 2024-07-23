"use client";

import useMetamask from "@/hooks/use-connect";
import Link from "next/link";

export default function NavBar() {
  const { connect, address, connected } = useMetamask();

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const handleConnect = () => {
    connect();
  };

  return (
    <div>
      <nav className="flex items-center justify-between">
        <div className="text-inkblue ml-20 text-5xl font-superWoobly mt-9">
          <Link href="/">DYNO</Link>
        </div>
        <div className="flex items-center space-x-4 mr-20 mt-8">
          <Link href="marketplace" className="px-20">
            <p className="text-inkblue w-full text-xl font-black mt-3 mr-20">
              Marketplace
            </p>
          </Link>
          <button
            onClick={handleConnect}
            className="bg-inkblue text-oatmilk px-3 py-2 rounded-xl font-black"
          >
            {connected ? shortenAddress(address) : "Connect"}
          </button>
        </div>
      </nav>
    </div>
  );
}
