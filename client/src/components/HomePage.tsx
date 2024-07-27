import SellerTable from "./table-util/SellerTable";
import Image from "next/image";
import homepage from "../../public/homepage.png";

export default function HomePage() {
  return (
    <>
      <div className="flex mt-12">
        <h1 className="w-2/5 mt-52 ml-32 text-6xl font-black text-inkblue">
          Blockchain-Powered Energy for Everyone
        </h1>
        <Image
          className="ml-40 mt-28 object-contain"
          src={homepage}
          alt="energy"
          width={400}
        />
      </div>
      <div>
        <SellerTable />
      </div>
    </>
  );
}
