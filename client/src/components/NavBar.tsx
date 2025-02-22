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
        <div className="text-inkblue ml-20 text-5xl font-superWoobly mt-9 transition-transform duration-300 hover:-translate-y-2">
          <Link href="/">DYNO</Link>
        </div>
        <div className="flex items-center space-x-4 mr-20 mt-8">
          <Link href="marketplace" className="px-20">
            <p className="text-inkblue w-full text-xl font-black mt-3  transition-transform duration-300 hover:-translate-y-2">
              Marketplace
            </p>
          </Link>
          <Link href="register" className="px-20">
            <p className="text-inkblue w-full text-xl font-black mt-3 mr-18 transition-transform duration-300 hover:-translate-y-2">
              Register
            </p>
          </Link>
          <Link href="dashboard" className="px-20">
            <p className="text-inkblue w-full text-xl font-black mt-3 mr-20 transition-transform duration-300 hover:-translate-y-2">
              Dashboard
            </p>
          </Link>
          <button
            onClick={handleConnect}
            className="bg-inkblue text-oatmilk px-3 py-2 rounded-xl font-black transition-transform duration-300 hover:-translate-y-2"
          >
            {connected ? shortenAddress(address) : "Connect"}
          </button>
        </div>
      </nav>
    </div>
  );
}
