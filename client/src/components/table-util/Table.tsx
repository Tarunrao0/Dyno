import Link from "next/link";
import TableItem from "./TableItem";

interface Seller {
  sellerName: string;
  walletAddress: string;
  energyType: string;
  slug: string;
}

interface TableProps {
  sellers: Seller[];
}

export default function Table({ sellers }: TableProps) {
  return (
    <div className="relative flex flex-col shadow-lg rounded-lg bg-almond/15 mx-auto max-w-4xl mt-96">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-md px-6 py-3 font-bold text-left text-inkblue">
              Seller
            </th>
            <th className="text-md px-6 py-3 font-bold text-left text-inkblue">
              Wallet Address
            </th>
            <th className="text-md px-6 py-3 font-bold text-left text-inkblue">
              Energy Type
            </th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <TableItem
              key={seller.slug}
              seller={seller.sellerName}
              walletAddress={seller.walletAddress}
              energyType={seller.energyType}
              slug={seller.slug}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
