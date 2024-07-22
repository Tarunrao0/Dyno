import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <nav className="flex items-center justify-between">
        <div className="text-inkblue ml-20 text-3xl font-black mt-9">DYNO</div>
        <div className="flex items-center space-x-4 mr-20 mt-8">
          <Link href="buy-sell" className="px-20">
            <p className="text-inkblue w-full text-2xl font-black mt-3 mr-20">
              Buy/Sell
            </p>
          </Link>
          <Link href="buy-sell">
            <button className="bg-inkblue text-oatmilk px-3 py-2 rounded-xl font-black">
              connect
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
