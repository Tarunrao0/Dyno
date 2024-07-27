import Link from "next/link";

interface TableItemProps {
  seller: string;
  walletAddress: string;
  energyType: string;
  slug: string;
}

export default function TableItem({
  seller,
  walletAddress,
  energyType,
  slug,
}: TableItemProps) {
  return (
    <tr className="hover:bg-gray cursor-pointer">
      <td className="border-b px-6 py-3 ">
        <Link href={`/${slug}`}>{seller}</Link>
      </td>
      <td className="border-b px-6 py-3">
        <Link href={`/${slug}`}>{walletAddress}</Link>
      </td>
      <td className="border-b  px-6 py-3">
        <Link href={`/${slug}`}>{energyType}</Link>
      </td>
    </tr>
  );
}
