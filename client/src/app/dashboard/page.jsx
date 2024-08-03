"use client";

import { useState, useEffect } from "react";
import { useGrantRoles } from "@/hooks/use-grant-roles";

export default function AdminPanel() {
  const [pendingSellers, setPendingSellers] = useState([]);
  const { grantRole } = useGrantRoles();

  useEffect(() => {
    async function fetchPendingSellers() {
      try {
        const response = await fetch("/api/sellers/pending");
        const data = await response.json();
        setPendingSellers(data);
      } catch (error) {
        console.error("Error fetching pending sellers:", error);
      }
    }

    fetchPendingSellers();
  }, []);

  const handleApprove = async (seller) => {
    try {
      await grantRole(seller.walletAddress);
      console.log(`Role granted to ${seller.walletAddress}`);

      await fetch("/api/sellers/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: seller.id }),
      });

      setPendingSellers((prev) => prev.filter((s) => s.id !== seller.id));
    } catch (error) {
      console.error("Error approving seller:", error);
    }
  };

  return (
    <div>
      <h1 className="font-black text-5xl mt-32 mb-4 text-inkblue">
        Admin Approval
      </h1>
      <div className="relative flex flex-col shadow-lg rounded-lg bg-almond/15 mx-auto mb-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-md px-6 py-3 font-bold text-left text-inkblue">
                Seller
              </th>
              <th className="text-md px-6 py-3 font-bold text-left text-inkblue">
                Email
              </th>
              <th className="text-md px-6 py-3 font-bold text-left text-inkblue">
                Wallet
              </th>
              <th className="text-md px-6 py-3 font-bold text-left text-inkblue">
                Energy Type
              </th>
              <th className="text-md px-6 py-3 font-bold text-left text-inkblue">
                Approval
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingSellers.map((seller) => (
              <tr className="hover:bg-gray cursor-pointer">
                <td className="border-b px-6 py-3 ">{seller.sellerName}</td>
                <td className="border-b px-6 py-3 ">{seller.sellerEmail}</td>
                <td className="border-b px-6 py-3 ">{seller.walletAddress}</td>
                <td className="border-b px-6 py-3 ">{seller.energyType}</td>
                <td className="border-b px-6 py-3 ">
                  <button
                    className=" bg-inkblue font-black px-4 text-oatmilk rounded-md"
                    onClick={() => handleApprove(seller)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
